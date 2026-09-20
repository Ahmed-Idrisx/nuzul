"use client";
import Spinner from "@/components/ui/Spinner";
import { useAppContext } from "@/context/AppContext";
import BookingsAreaChart from "@/features/dashboard/components/BookingsAreaChart";
import { FaBed, FaDollarSign, FaClipboardList } from "react-icons/fa";

export default function AdminDashboard() {
  const { user, isLoading } = useAppContext();

  if (isLoading)
    return (
      <p className="text-slate-500">
        <Spinner />
      </p>
    );

  const rooms = user?.hotel?.rooms ?? [];
  const bookings = user?.bookings ?? [];

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + Number(booking.totalPrice),
    0,
  );

  const dashboardCardsData = [
    {
      title: "Total Rooms",
      value: String(rooms.length),
      icon: FaBed,
    },
    {
      title: "Total Revenue",
      value: "$" + totalRevenue.toFixed(2),
      icon: FaDollarSign,
    },
    {
      title: "Total Bookings",
      value: String(bookings.length),
      icon: FaClipboardList,
    },
  ];

  return (
    <div className="text-text-muted">
      <div className="space-y-3 mb-10">
        <h1 className="text-xl font-bold text-primary-dark sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="text-text-muted max-w-3xl">
          Monitor your room listings, track bookings and analyze revenue—all in
          one place. Stay updated with real-time insights to ensure smooth
          operations.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-5 my-10">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-11 border border-border p-3 px-6 rounded-lg"
          >
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-text-muted">{card.title}</p>
              <p className="text-2xl font-medium text-text">{card.value}</p>
            </div>
            <card.icon
              size={22}
              className="w-11 h-11 p-2.5 text-primary bg-gray-100 rounded-full"
            />
          </div>
        ))}
      </div>

      {/* Area Chart */}
      <BookingsAreaChart bookings={bookings} />
    </div>
  );
}
