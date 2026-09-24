import type { Metadata } from "next";

import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your Nuzul account and start planning your next stay.",
};

export default function Register() {
  return <RegisterForm />;
}
