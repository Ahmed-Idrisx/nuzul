"use client";

import { useLogout } from "@/features/auth/hooks/useAuth";
import { useUser } from "@/features/user/hooks/useUser";
import { User } from "@/features/user/types/user.types";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";

interface UserContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { data: user, isLoading } = useUser(true);

  const logoutMutation = useLogout();

  const logout = async () => {
    await logoutMutation.mutateAsync();
    router.push("/login");
  };

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within a <UserProvider>");
  }
  return ctx;
}
