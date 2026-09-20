"use client";
import { Booking } from "@/features/user/types/user.types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDataPoint {
  date: string;
  bookings: number;
}

export default function BookingsAreaChart({
  bookings,
}: {
  bookings: Booking[];
}) {
  const bookingsPerDay = bookings.reduce<Record<string, number>>(
    (acc, booking) => {
      const date = new Date(booking.createdAt).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {},
  );

  const chartData: ChartDataPoint[] = Object.entries(bookingsPerDay).map(
    ([date, count]) => ({
      date,
      bookings: count,
    }),
  );

  return (
    <div className="w-full max-w-4xl h-75 text-xs">
      <h3 className="text-lg font-medium text-slate-800 mb-4 pt-2 text-right">
        <span className="text-slate-500">Bookings /</span> Day
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0891b2" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" />
          <YAxis
            allowDecimals={false}
            stroke="#64748b"
            label={{
              value: "Bookings",
              angle: -90,
              position: "insideLeft",
              fill: "#64748b",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              color: "#1e293b",
            }}
            labelStyle={{ color: "#1e293b" }}
          />
          <Area
            type="monotone"
            dataKey="bookings"
            stroke="#0891b2"
            fill="url(#bookingsFill)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
