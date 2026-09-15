"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiSend } from "react-icons/fi";

import MainButton from "@/components/shared/MainButton";
import FormInput from "@/components/shared/FormInput";

import AuthHeader from "./AuthHeader";
import { RegisterFormData, registerSchema } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { ApiError } from "@/lib/api-client";

export function RegisterForm() {
  const router = useRouter();

  const { mutateAsync: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      toast.success(res.message);

      reset();

      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-lg px-4">
      <AuthHeader title="Welcome Back!" />

      <div className="mb-6 flex w-full justify-center">
        <div className="flex w-full max-w-sm gap-2 rounded-xl bg-blue-100 p-2 text-xs sm:text-base">
          <Link
            href="/login"
            className="flex-1 rounded-xl bg-primary py-3 text-center font-medium text-white"
          >
            Login
          </Link>

          <button
            type="button"
            className="flex-1 rounded-xl bg-primary-dark py-3 font-medium text-white"
          >
            Create New Account
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="First Name"
            type="text"
            name="firstName"
            register={register}
            error={errors.firstName}
          />

          <FormInput
            label="Last Name"
            type="text"
            name="lastName"
            register={register}
            error={errors.lastName}
          />
        </div>

        <FormInput
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
        />

        <FormInput
          label="Phone Number"
          type="tel"
          name="phone"
          register={register}
          error={errors.phone}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
        />

        <FormInput
          label="Confirmation Password"
          type="password"
          name="passwordConfirmation"
          register={register}
          error={errors.passwordConfirmation}
        />

        <MainButton
          type="submit"
          fullWidth
          isLoading={isPending}
          loadingText="Create Account..."
          icon={<FiSend size={18} />}
        >
          Create Account
        </MainButton>
      </form>
    </div>
  );
}
