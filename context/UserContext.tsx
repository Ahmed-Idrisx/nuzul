"use client";

import { useLogout } from "@/features/auth/hooks/useAuth";
import { useUser } from "@/features/user/hooks/useUser";
import { User } from "@/features/user/types/user.types";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface UserContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  showHotelReg: boolean;
  setShowHotelReg: Dispatch<SetStateAction<boolean>>;
  searchedCities: string[];
  setSearchedCities: Dispatch<SetStateAction<string[]>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState<string[]>([]);

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
        showHotelReg,
        setShowHotelReg,
        searchedCities,
        setSearchedCities,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useAppContext(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within a <UserProvider>");
  }
  return ctx;
}
