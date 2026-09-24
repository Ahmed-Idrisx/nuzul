"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import MainButton from "@/components/shared/MainButton";
import AuthHeader from "./AuthHeader";
import FormInput from "@/components/shared/FormInput";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../schemas/auth.schema";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { ApiError } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { setEmail, setFlow } = useAuth();

  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const res = await forgotPassword({ email: data.email });

      toast.success(res.message);

      setEmail(data.email);
      setFlow("reset");

      reset();

      router.push("/verify-otp");
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
        title="Forgot your password?"
        description="Enter your email and we'll send you a code to reset your password"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormInput
          label="Email address"
          type="email"
          name="email"
          register={register}
          error={errors.email}
        />

        {/* Submit */}
        <MainButton
          type="submit"
          fullWidth
          isLoading={isPending}
          loadingText="Sending..."
          icon={<FiSend size={18} />}
        >
          Send code
        </MainButton>

        <p className="text-center text-sm text-text">
          Back to{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
