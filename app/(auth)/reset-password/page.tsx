import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { Suspense } from "react";

const ResetPassword = () => {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword;
