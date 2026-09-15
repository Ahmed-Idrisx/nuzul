"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type AuthFlow = "register" | "reset" | null;

interface AuthContextValue {
  email: string | null;
  otp: string | null;
  flow: AuthFlow;

  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  setFlow: (flow: AuthFlow) => void;

  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [flow, setFlow] = useState<AuthFlow>(null);

  const clearAuth = () => {
    setEmail(null);
    setOtp(null);
    setFlow(null);
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        otp,
        flow,
        setEmail,
        setOtp,
        setFlow,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
