"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import MainButton from "@/components/shared/MainButton";
import FormInput from "@/components/shared/FormInput";
import { assets } from "@/assets";
import {
  createRoomSchema,
  type CreateRoomFormData,
} from "@/features/rooms/schemas/room.schema";
import { useCreateRoom } from "@/features/rooms/hooks/useRoom";
import Image from "next/image";
import { amenitiesOptions, roomTypeOptions } from "@/constant/site";
import { compressImage } from "@/lib/compress-image";
import { FiX } from "react-icons/fi";
import FormTextArea from "@/components/shared/FormTextArea";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const IMAGE_SLOTS = 4;

export default function AddRoom() {
  const createRoom = useCreateRoom();
  const [imageSlots, setImageSlots] = useState<(File | null)[]>(
    Array(IMAGE_SLOTS).fill(null),
  );
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    Array(IMAGE_SLOTS).fill(null),
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      roomType: "",
      shortDescription: "",
      description: "",
      amenities: [],
      images: [],
    },
  });

  const selectedAmenities = watch("amenities") ?? [];
  const selectedRoomType = watch("roomType");

  useEffect(() => {
    const compacted = imageSlots.filter((file): file is File => Boolean(file));
    setValue("images", compacted, {
      shouldValidate: isSubmitted,
      shouldDirty: true,
    });
  }, [imageSlots, isSubmitted, setValue]);

  const handleImageChange = async (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      event.target.value = "";
      return;
    }

    try {
      const compressedFile = await compressImage(file);

      if (compressedFile.size > MAX_IMAGE_SIZE) {
        toast.error("Image must be less than 2MB after compression.");
        return;
      }

      setImageSlots((current) => {
        const updated = [...current];
        updated[index] = compressedFile;
        return updated;
      });

      setImagePreviews((current) => {
        const updated = [...current];
        if (updated[index]) URL.revokeObjectURL(updated[index] as string);
        updated[index] = URL.createObjectURL(compressedFile);
        return updated;
      });
    } catch {
      toast.error("Failed to process image. Please try another image.");
    } finally {
      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImageSlots((current) => {
      const updated = [...current];
      updated[index] = null;
      return updated;
    });
    setImagePreviews((current) => {
      const updated = [...current];
      if (updated[index]) URL.revokeObjectURL(updated[index] as string);
      updated[index] = null;
      return updated;
    });
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  const handleAmenityChange = (amenity: string) => {
    const currentAmenities = selectedAmenities ?? [];
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((item) => item !== amenity)
      : [...currentAmenities, amenity];

    setValue("amenities", updatedAmenities, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = (data: CreateRoomFormData) => {
    const formData = new FormData();
    formData.append("roomType", data.roomType);
    formData.append("shortDescription", data.shortDescription);
    formData.append("description", data.description);
    formData.append("amenities", JSON.stringify(data.amenities));
    formData.append("pricePerNight", String(data.pricePerNight));
    formData.append("maxGuests", String(data.maxGuests));
    data.images.forEach((image) => formData.append("images", image));

    createRoom.mutate(formData, {
      onSuccess: (response) => {
        toast.success(response.message);
        reset();
        setImageSlots(Array(IMAGE_SLOTS).fill(null));
        setImagePreviews(Array(IMAGE_SLOTS).fill(null));
      },
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-3xl flex-col gap-5"
    >
      <div className="space-y-3">
        <h1 className="text-xl font-bold text-primary-dark sm:text-4xl">
          Add Room
        </h1>
        <p className="text-text-muted max-w-3xl">
          Add room details, amenities, pricing, and images.
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-text-muted sm:text-lg">
          Room Images
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative h-28">
              <label
                htmlFor={`roomImage${index}`}
                className="group relative flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-primary"
              >
                <Image
                  src={preview ?? assets.uploadArea}
                  alt={
                    preview ? `Room image ${index + 1}` : "Upload room image"
                  }
                  fill
                  unoptimized={Boolean(preview)}
                  className="object-cover"
                />
                <input
                  id={`roomImage${index}`}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => handleImageChange(index, event)}
                />
              </label>
              {preview && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 rounded-full p-2 bg-red-500 text-xs text-white"
                  aria-label="Remove image"
                >
                  <FiX size={22} />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.images && (
          <p className="mt-1 text-xs font-medium text-red-500">
            {errors.images.message}
          </p>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-text-muted sm:text-lg">
          Room Type
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {roomTypeOptions.map((roomType) => {
            const isSelected = selectedRoomType === roomType;
            return (
              <label
                key={roomType}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm ${isSelected ? "border-primary bg-primary/5 text-primary-dark" : "border-gray-200 text-text"}`}
              >
                <input
                  type="radio"
                  value={roomType}
                  {...register("roomType")}
                  className="h-4 w-4 accent-primary"
                />
                {roomType}
              </label>
            );
          })}
        </div>
        {errors.roomType && (
          <p className="mt-1 text-xs font-medium text-red-500">
            {errors.roomType.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label="Price Per Night"
          name="pricePerNight"
          type="number"
          min="1"
          placeholder="Enter price"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          error={errors.pricePerNight}
        />
        <FormInput
          label="Maximum Guests"
          name="maxGuests"
          type="number"
          min="1"
          placeholder="Enter maximum guests"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          error={errors.maxGuests}
        />
      </div>

      <FormTextArea
        label="Short Description"
        name="shortDescription"
        rows={2}
        placeholder="Write a short description about the room"
        register={register}
        error={errors.shortDescription}
      />
      <FormTextArea
        label="Room Description"
        name="description"
        rows={4}
        placeholder="Tell guests more about this room"
        register={register}
        error={errors.description}
      />
      <div>
        <p className="mb-2 text-sm font-semibold text-text-muted sm:text-lg">
          Amenities
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {amenitiesOptions.map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm ${isSelected ? "border-primary bg-primary/5 text-primary-dark" : "border-gray-200 text-text"}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAmenityChange(amenity)}
                  className="h-4 w-4 accent-primary"
                />
                {amenity}
              </label>
            );
          })}
        </div>
        {errors.amenities && (
          <p className="mt-1 text-xs font-medium text-red-500">
            {errors.amenities.message}
          </p>
        )}
      </div>

      <MainButton
        type="submit"
        form={undefined}
        isLoading={createRoom.isPending}
        loadingText="Creating Room..."
      >
        Add Room
      </MainButton>
    </form>
  );
}
