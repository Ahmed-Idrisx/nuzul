import DashboardOverview from "@/features/dashboard/components/DashboardOverview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Nuzul",
  description:
    "Manage your hotel rooms, bookings, and revenue from your Nuzul dashboard.",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
