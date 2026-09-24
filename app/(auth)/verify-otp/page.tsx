import type { Metadata } from "next";

import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify OTP",
  description: "Verify your one-time code to complete your Nuzul account flow.",
};

const VerifyOtp = () => {
  return (
    <Suspense fallback={null}>
      <VerifyOtpForm />
    </Suspense>
  );
};

export default VerifyOtp;
