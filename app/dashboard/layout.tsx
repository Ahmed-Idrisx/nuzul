import type { Metadata } from "next";
import DashboardLayout from "@/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "Nuzul | Dashboard",
  description:
    "Nuzul is your platform for booking unique homes and local experiences. Discover the perfect getaway and create unforgettable memories with Nuzul.",
};
export default function RootAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
