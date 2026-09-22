"use client";

import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/ui/Spinner";
import { useAppContext } from "@/context/AppContext";

const statusClasses = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-rose-100 text-rose-700",
} as const;

const paymentLabelMap = {
  CARD: "Card",
  PAY_AT_HOTEL: "Pay at Hotel",
} as const;

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatCurrency = (value: string) => `$${Number(value || 0).toFixed(2)}`;

export default function MyBookingsPage() {
  const { user, isLoading } = useAppContext();
  const bookings = user?.bookings ?? [];

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-5 py-24">
        <Spinner />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-5 pb-20 pt-28 text-center">
        <div className="rounded-2xl border border-border bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-bold text-text">My Bookings</h1>
          <p className="mt-3 text-text-muted">
            Please sign in to view and manage your reservations.
          </p>
          <Link
            href="/login"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-5 pb-24 pt-28 sm:px-8 lg:px-14 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Reservations
            </p>
            <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
              My Bookings
            </h1>
          </div>

          <Link
            href="/hotels"
            className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            Explore more stays
          </Link>
        </div>

        {bookings.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-border bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-text">
              No bookings yet
            </h2>
            <p className="mt-3 text-text-muted">
              Your upcoming stays will appear here after you make a reservation.
            </p>
            <Link
              href="/hotels"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Browse hotels
            </Link>
          </section>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => {
              const hotelName = booking.hotel?.name || "Hotel reservation";
              const hotelCountry = booking.hotel?.country || "—";
              const hotelCity = booking.hotel?.city || "—";
              const hotelAddress =
                booking.hotel?.address || "Address not available";
              const roomType = booking.room?.roomType || "Room";
              const roomImage =
                booking.hotel?.image || booking.room?.images?.[0] || null;
              const isUnpaid =
                !booking.isPaid && booking.status !== "CANCELLED";

              return (
                <div
                  key={booking.id}
                  className="overflow-hidden rounded-2xl border border-border bg-cream-bg shadow-sm"
                >
                  <div className="grid gap-4 p-4 md:grid-cols-[250px_1fr] md:p-5">
                    <div className="relative h-40 overflow-hidden rounded-xl bg-primary/10 md:h-full md:min-h-47.5">
                      {roomImage ? (
                        <Image
                          src={roomImage}
                          alt={`${hotelName} ${roomType}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 180px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-primary/60">
                          <span className="text-sm font-medium">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                            Hotel
                          </p>
                          <h2 className="mt-1 text-2xl font-semibold text-text">
                            {hotelName}
                          </h2>
                          <p className="mt-1 text-sm text-text-muted">
                            {hotelCountry}, {hotelCity}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex w-fit items-center rounded-full px-3 py-2 text-xs font-semibold ${statusClasses[booking.status]}`}
                          >
                            {booking.status}
                          </span>

                          {isUnpaid && (
                            <Link
                              href={`/payment?bookingId=${booking.id}`}
                              className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
                            >
                              Unpaid • Pay now
                            </Link>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                            Room type
                          </p>
                          <p className="mt-2 text-sm font-semibold text-text">
                            {roomType}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                            Check in
                          </p>
                          <p className="mt-2 text-sm font-semibold text-text">
                            {formatDate(booking.checkInDate)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                            Check out
                          </p>
                          <p className="mt-2 text-sm font-semibold text-text">
                            {formatDate(booking.checkOutDate)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                            Total
                          </p>
                          <p className="mt-2 text-sm font-semibold text-text">
                            {formatCurrency(booking.totalPrice)}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-border bg-gray-50 px-4 py-4 text-sm text-text-muted sm:px-5">
                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                          <div>
                            <span className="font-semibold text-text">
                              Country:
                            </span>{" "}
                            {hotelCountry}
                          </div>
                          <div>
                            <span className="font-semibold text-text">
                              City:
                            </span>{" "}
                            {hotelCity}
                          </div>
                          <div>
                            <span className="font-semibold text-text">
                              Address:
                            </span>{" "}
                            {hotelAddress}
                          </div>
                          <div>
                            <span className="font-semibold text-text">
                              Guests:
                            </span>{" "}
                            {booking.guests}
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-wrap items-center gap-4">
                            <span>
                              <span className="font-semibold text-text">
                                Room ID:
                              </span>{" "}
                              {booking.roomId}
                            </span>
                            <span>
                              <span className="font-semibold text-text">
                                Payment:
                              </span>{" "}
                              {paymentLabelMap[booking.paymentMethod] ?? "—"}
                            </span>
                            <span>
                              <span className="font-semibold text-text">
                                Paid:
                              </span>{" "}
                              {booking.isPaid ? "Yes" : "No"}
                            </span>
                          </div>

                          <Link
                            href={`/hotels/${booking.hotel?.id}`}
                            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-3 py-2 font-semibold text-white transition-colors hover:bg-amber-500/70"
                          >
                            View Hotel
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
