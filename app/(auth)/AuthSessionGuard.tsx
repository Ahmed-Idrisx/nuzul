"use client";

import { useAppContext } from "@/context/AppContext";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function AuthSessionGuard({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAppContext();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  if (isLoading || user) {
    return <Spinner />;
  }

  return children;
}
