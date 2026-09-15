export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string | null;
  role: "USER" | "HOTEL_OWNER";
  isVerified: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: User;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}
