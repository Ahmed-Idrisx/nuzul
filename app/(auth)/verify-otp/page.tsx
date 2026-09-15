import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";
import { Suspense } from "react";

const VerifyOtp = () => {
  return (
    <Suspense fallback={null}>
      <VerifyOtpForm />
    </Suspense>
  );
};

export default VerifyOtp;
