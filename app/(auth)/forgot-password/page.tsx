import type { Metadata } from "next";

import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your password safely and quickly on Nuzul.",
};

const forgotPassword = () => {
  return <ForgotPasswordForm />;
};

export default forgotPassword;
