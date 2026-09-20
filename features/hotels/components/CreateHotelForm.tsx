"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MainButton from "@/components/shared/MainButton";
import {
  createHotelSchema,
  type CreateHotelFormData,
} from "../schemas/hotel.schema";
import { useCreateHotel } from "../hooks/useHotel";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets";
import { FiUpload, FiX } from "react-icons/fi";
import FormInput from "@/components/shared/FormInput";
import { facilitiesOptions } from "@/constant/site";
import FormTextArea from "@/components/shared/FormTextArea";

export default function CreateHotelForm() {
  const { setShowHotelReg } = useAppContext();
  const createHotel = useCreateHotel();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateHotelFormData>({
    resolver: zodResolver(createHotelSchema),
    defaultValues: {
      name: "",
      country: "",
      city: "",
      address: "",
      contact: "",
      shortDescription: "",
      description: "",
      facilities: [],
    },
  });

  const selectedFacilities = watch("facilities");

  // Image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setValue("image", file, { shouldValidate: true, shouldDirty: true });
    setImagePreview(URL.createObjectURL(file));
  };
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Facilities
  const handleFacilityChange = (facility: string) => {
    const currentFacilities = selectedFacilities ?? [];

    const updatedFacilities = currentFacilities.includes(facility)
      ? currentFacilities.filter((item) => item !== facility)
      : [...currentFacilities, facility];

    setValue("facilities", updatedFacilities, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Submit
  const onSubmit = (data: CreateHotelFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("contact", data.contact);
    formData.append("shortDescription", data.shortDescription);
    formData.append("description", data.description);

    formData.append("facilities", JSON.stringify(data.facilities));

    formData.append("image", data.image);

    createHotel.mutate(formData, {
      onSuccess: (response) => {
        toast.success(response.message);

        setShowHotelReg(false);
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl max-md:mx-2 max-h-[90vh]"
      >
        {/* Scrollable form content */}
        <div className="relative flex w-full flex-col overflow-y-auto scrollbar-none p-6 sm:p-8 md:w-1/2 lg:p-10">
          <button
            type="button"
            onClick={() => setShowHotelReg(false)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-text-muted transition-colors hover:bg-gray-100"
          >
            <FiX className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">
              Register Your Hotel
            </h2>

            <p className="text-sm leading-6 text-text-muted max-w-80">
              Add your hotel information and let guests discover your property
              on Nuzul.
            </p>
          </div>

          {/* Hotel image upload */}
          <div className="my-6 flex flex-col items-center">
            <label htmlFor="hotelImage" className="group cursor-pointer">
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors group-hover:border-primary">
                <Image
                  src={imagePreview || assets.uploadArea}
                  alt="Hotel image"
                  fill
                  className="object-cover"
                />
                {imagePreview && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <FiUpload className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              <p className="mt-2 block text-center text-xs font-medium md:text-sm text-text-muted">
                {imagePreview ? "Change Image" : "Upload Hotel Image"}
              </p>
            </label>
            <input
              id="hotelImage"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            {errors.image && (
              <p className="mt-1 text-xs font-medium text-red-500">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Hotel Name */}
          <div className="mb-4">
            <FormInput
              label="Hotel Name"
              name="name"
              type="text"
              placeholder="Enter your hotel name"
              register={register}
              error={errors.name}
            />
          </div>
          {/* Country + City */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="Country"
              name="country"
              type="text"
              placeholder="Enter country"
              register={register}
              error={errors.country}
            />

            <FormInput
              label="City"
              name="city"
              type="text"
              placeholder="Enter city"
              register={register}
              error={errors.city}
            />
          </div>

          {/* Hotel Phone */}
          <div className="mt-4">
            <FormInput
              label="Contact"
              name="contact"
              type="text"
              placeholder="Enter hotel contact number"
              register={register}
              error={errors.contact}
            />
          </div>

          {/* Hotel Address */}
          <div className="mt-4">
            <FormTextArea
              label="Address"
              name="address"
              rows={2}
              placeholder="Enter your hotel address"
              register={register}
              error={errors.address}
            />
          </div>
          {/* Short Description */}
          <div className="mt-4">
            <FormTextArea
              label="Short Description"
              name="shortDescription"
              rows={2}
              placeholder="Write a short description about your hotel"
              register={register}
              error={errors.shortDescription}
            />
          </div>
          {/* Description */}
          <div className="mt-4">
            <FormTextArea
              label="Hotel Description"
              name="description"
              rows={4}
              placeholder="Tell guests more about your hotel..."
              register={register}
              error={errors.description}
            />
          </div>

          {/* Facilities */}
          <div className="mt-5">
            <p className="text-text-muted text-sm font-semibold sm:text-lg">
              Hotel Facilities
            </p>

            <p className="mt-1 text-xs text-text-muted">
              Select the facilities available at your hotel.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {facilitiesOptions.map((facility) => {
                const isSelected = selectedFacilities?.includes(facility);

                return (
                  <label
                    key={facility}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary-dark"
                        : "border-gray-200 text-text hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleFacilityChange(facility)}
                      className="h-4 w-4 cursor-pointer accent-primary"
                    />

                    <span>{facility}</span>
                  </label>
                );
              })}
            </div>

            {errors.facilities && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.facilities.message}
              </p>
            )}
          </div>
          {/* Submit */}
          <MainButton
            type="submit"
            fullWidth
            isLoading={createHotel.isPending}
            loadingText="Creating Hotel..."
            className="mt-7"
          >
            {createHotel.isPending ? "Creating..." : "Register"}
          </MainButton>
        </div>

        {/* Fixed decorative image - never scrolls */}
        <div className="relative w-1/2 hidden md:block">
          <Image
            src={assets.hotelReg}
            alt="Register your hotel"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay */}

          <div className="absolute inset-0 bg-black/20" />
          {/* Text */}

          <div className="absolute bottom-10 left-8 right-8 text-white">
            <h3 className="text-3xl font-bold">Welcome to Nuzul</h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/90">
              List your hotel, showcase your rooms, and help travelers find
              their perfect stay.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
