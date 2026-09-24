import type { Metadata } from "next";

import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Set a new password for your Nuzul account.",
};

const ResetPassword = () => {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword;
