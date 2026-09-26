"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "../types/auth.types";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),

    onSuccess: () => {
      // Refetch the full user (with bookings, hotel, rooms) from /user/me.
      // The login response only contains partial user data, so we must
      // invalidate instead of using setQueryData.
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authApi.verifyOtp(payload),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authApi.forgotPassword(payload),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authApi.resetPassword(payload),
  });
}
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
