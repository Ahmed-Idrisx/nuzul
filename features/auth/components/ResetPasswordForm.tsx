"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import MainButton from "@/components/shared/MainButton";

import AuthHeader from "./AuthHeader";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../schemas/auth.schema";
import FormInput from "@/components/shared/FormInput";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useResetPassword } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { ApiError } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";

export function ResetPasswordForm() {
  const router = useRouter();
  const { email, otp, flow, clearAuth } = useAuth();

  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!email || !otp || flow !== "reset") {
      toast.error("Reset information is missing");
      router.replace("/forgot-password");
      return;
    }
    try {
      const res = await resetPassword({
        email,
        otp,
        newPassword: data.password,
      });
      toast.success(res.message);
      reset();
      clearAuth();
      router.push("/login");
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
      <AuthHeader
        title="Create a new password"
        description="Your new password must be at least 8 characters"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="New password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
        />

        <FormInput
          label="Confirm new password"
          type="password"
          name="passwordConfirmation"
          register={register}
          error={errors.passwordConfirmation}
        />

        {/* Submit */}
        <MainButton
          type="submit"
          fullWidth
          isLoading={isPending}
          loadingText="Resetting..."
          icon={<FiSend size={18} />}
        >
          Reset password
        </MainButton>
      </form>
    </div>
  );
}
