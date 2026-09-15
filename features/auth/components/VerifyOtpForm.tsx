"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import MainButton from "@/components/shared/MainButton";
import AuthHeader from "./AuthHeader";
import { verifyOtpData, verifyOtpSchema } from "../schemas/auth.schema";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useVerifyOtp } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { ApiError } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";

export default function VerifyOtpForm() {
  console.log("VerifyOtpForm rendered");
  const router = useRouter();
  const { email, flow, setOtp, clearAuth } = useAuth();
  console.log("AUTH:", { email, flow });

  const { mutateAsync: verifyOtp, isPending } = useVerifyOtp();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<verifyOtpData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: verifyOtpData) => {
    if (!email) {
      toast.error("Email address is missing");

      if (flow === "reset") {
        router.replace("/forgot-password");
      } else {
        router.replace("/register");
      }

      return;
    }
    try {
      // Forgot password flow
      // OTP will be verified later by the reset-password request.
      if (flow === "reset") {
        setOtp(data.otp);

        reset();

        router.push("/reset-password");

        return;
      }
      // Register flow
      const res = await verifyOtp({ email, otp: data.otp });

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
        title="Verify your email"
        description="Enter the 6-digit code sent to your email"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-center">
          <input
            {...register("otp")}
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="000000"
            className="w-48 rounded-xl border border-zinc-300 px-4 py-4 text-center text-2xl tracking-[0.5rem] outline-none focus:border-blue-600 focus:bg-blue-50"
          />
        </div>

        {errors.otp && (
          <p className="text-center text-sm font-medium text-red-500">
            {errors.otp.message}
          </p>
        )}

        {/* Submit */}
        <MainButton
          type="submit"
          fullWidth
          isLoading={isPending}
          loadingText="Verifying..."
          icon={<FiSend size={18} />}
        >
          {flow === "reset" ? "Verify and continue" : "Verify account"}
        </MainButton>

        <p className="text-center text-sm text-zinc-500">
          Didn&apos;t receive the code?
          <Link
            href="/forgot-password"
            className="ml-1 font-semibold text-primary hover:underline"
          >
            Send again
          </Link>
        </p>
      </form>
    </div>
  );
}
