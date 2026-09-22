import MyBookingsPage from "@/features/bookings/components/MyBookingsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings | Nuzul",
  description:
    "Review your Nuzul hotel reservations, stay details, check-in dates, and payment status in one place.",
};

export default function MyBookings() {
  return <MyBookingsPage />;
}
