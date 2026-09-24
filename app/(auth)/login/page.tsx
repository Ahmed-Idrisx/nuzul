import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Nuzul account and manage your stays.",
};

export default function Login() {
  return <LoginForm />;
}
