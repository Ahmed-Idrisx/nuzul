import { z } from "zod";

// Login
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please provide a valid email"),

  password: z.string().min(1, "Password is required"),

  rememberMe: z.boolean().optional(),
});

// Register
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(10, "First name must be less than 10 characters"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(10, "Last name must be less than 10 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email"),

    phone: z
      .string()
      .trim()
      .length(11, "Phone number must be 11 digits")
      .regex(/^01[012]\d{8}$/, "Phone number must start with 010, 011, or 012"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters"),

    passwordConfirmation: z
      .string()
      .min(1, "confirmation password is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "The passwords do not match",
    path: ["passwordConfirmation"],
  });

// Forgot Password
export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please provide a valid email"),
});

// OTP
export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

// Reset Password
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters"),

    passwordConfirmation: z
      .string()
      .min(1, "confirmation password is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "The passwords do not match",
    path: ["passwordConfirmation"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
export type verifyOtpData = z.infer<typeof verifyOtpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
