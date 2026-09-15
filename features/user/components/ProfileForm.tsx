"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail, FiPhone, FiSend, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

import MainButton from "@/components/shared/MainButton";
import FormInput from "@/components/shared/FormInput";

import { useUpdateUser } from "@/features/user/hooks/useUser";
import {
  type UpdateUserFormData,
  updateUserSchema,
} from "@/features/user/schemas/user.schema";
import type { User } from "@/features/user/types/user.types";
import ProfileAvatar from "./ProfileAvatar";

interface ProfileFormProps {
  initialUser: User;
}

export default function ProfileForm({ initialUser }: ProfileFormProps) {
  const updateUserMutation = useUpdateUser();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initialUser.image,
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: initialUser.firstName,
      lastName: initialUser.lastName,
      phone: initialUser.phone,
      image: undefined,
    },
  });

  useEffect(() => {
    reset({
      firstName: initialUser.firstName,
      lastName: initialUser.lastName,
      phone: initialUser.phone,
      image: undefined,
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAvatarPreview(initialUser.image);
  }, [initialUser, reset]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setValue("image", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setAvatarPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      const formData = new FormData();

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phone", data.phone);

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await updateUserMutation.mutateAsync(formData);

      toast.success(res.message);

      reset({
        firstName: res.data[0].firstName,
        lastName: res.data[0].lastName,
        phone: res.data[0].phone,
        image: undefined,
      });

      setAvatarPreview(res.data[0].image);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update your information. Please try again.",
      );
    }
  };

  const imageSrc = avatarPreview;

  return (
    <>
      <ProfileAvatar
        imageSrc={imageSrc}
        firstName={initialUser.firstName}
        lastName={initialUser.lastName}
        fileInputRef={fileInputRef}
        onChange={handleAvatarChange}
      />
      <div className="flex justify-center bg-neutral-100 px-5 pb-20 pt-10">
        <div className="w-full max-w-180">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-10">
            <h2 className="mb-8 text-center text-xl font-bold text-primary">
              General Information
            </h2>

            <form
              id="profile-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormInput
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  register={register}
                  error={errors.firstName}
                  icon={<FiUser />}
                />

                <FormInput
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  register={register}
                  error={errors.lastName}
                  icon={<FiUser />}
                />
              </div>

              <FormInput<{ email: string }>
                label="Email address"
                type="email"
                name="email"
                value={initialUser.email}
                disabled
                icon={<FiMail />}
              />

              <FormInput
                label="Phone number"
                type="tel"
                name="phone"
                placeholder="0100000000"
                register={register}
                error={errors.phone}
                icon={<FiPhone />}
              />

              <MainButton
                form="profile-form"
                type="submit"
                fullWidth
                isLoading={updateUserMutation.isPending}
                loadingText="Updating..."
                icon={<FiSend size={18} />}
              >
                Update information
              </MainButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
