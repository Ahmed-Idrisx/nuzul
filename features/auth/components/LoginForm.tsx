"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import MainButton from "@/components/shared/MainButton";
import AuthHeader from "./AuthHeader";
import { LoginFormData, loginSchema } from "../schemas/auth.schema";
import FormInput from "@/components/shared/FormInput";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { ApiError } from "@/lib/api-client";
// import { useAuth } from "@/context/AuthContext";

export function LoginForm() {
  const router = useRouter();
  // const { refreshAuth } = useAuth();

  const { mutateAsync: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login({ email: data.email, password: data.password });
      // refreshAuth();
      toast.success(res.message);
      reset();
      router.push("/");
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
          <button
            type="button"
            className="flex-1 rounded-xl bg-primary-dark py-3 font-medium text-white"
          >
            Login
          </button>

          <Link
            href="/register"
            className="flex-1 rounded-xl bg-primary py-3 text-center font-medium text-white"
          >
            Create New Account
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" {...register("rememberMe")} />
            Remember Me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Forget Password
          </Link>
        </div>

        {/* Submit */}
        <MainButton
          type="submit"
          fullWidth
          isLoading={isPending}
          loadingText="Loading..."
          icon={<FiSend size={18} />}
        >
          Login
        </MainButton>
      </form>
    </div>
  );
}
