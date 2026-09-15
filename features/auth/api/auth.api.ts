import { apiRequest } from "@/lib/api-client";

import type {
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "../types/auth.types";

export const authApi = {
  login: (payload: LoginPayload) =>
    apiRequest<LoginResponseData>("/auth/login", {
      method: "POST",
      body: payload,
    }),

  register: (payload: RegisterPayload) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: payload,
    }),

  verifyOtp: (payload: VerifyOtpPayload) =>
    apiRequest("/auth/verify-otp", {
      method: "POST",
      body: payload,
    }),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiRequest("/auth/forgot-password", {
      method: "POST",
      body: payload,
    }),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiRequest("/auth/reset-password", {
      method: "POST",
      body: payload,
    }),
  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),
};
