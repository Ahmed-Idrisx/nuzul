"use client";
import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";
import { makeQueryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <AuthProvider>
        <AppProvider>
          {children}
          <Toaster position="top-right" />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
