"use client";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* only in development */}
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </QueryClientProvider>
  );
}
