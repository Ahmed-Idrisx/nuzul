"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "@/context/AppContext";
import { Booking, BookingStatus } from "@/features/user/types/user.types";
import { useUpdateBookingStatus } from "@/features/bookings/hooks/useBooking";
import { FiCheck, FiChevronDown, FiX } from "react-icons/fi";
import Image from "next/image";
import MainButton from "@/components/shared/MainButton";
import toast from "react-hot-toast";

const bookingStatuses: BookingStatus[] = ["PENDING", "PAID", "CANCELLED"];

const statusClasses: Record<BookingStatus, string> = {
  PENDING: "border-amber-200 bg-amber-100 text-amber-700",
  PAID: "border-emerald-200 bg-emerald-100 text-emerald-700",
  CANCELLED: "border-rose-200 bg-rose-100 text-rose-700",
};

function StatusDropdown({
  status,
  disabled,
  label,
  onChange,
}: {
  status: BookingStatus;
  disabled: boolean;
  label: string;
  onChange: (status: BookingStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();

    setMenuPosition({
      top: buttonRect.bottom + 8,
      left: Math.max(8, buttonRect.right - 144),
    });
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        if (menuRef.current?.contains(event.target as Node)) return;
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={toggleDropdown}
        className={`inline-flex cursor-pointer min-w-28 items-center justify-between gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold outline-none transition focus:ring-2 focus:ring-primary/30 disabled:cursor-wait disabled:opacity-60 ${statusClasses[status]}`}
      >
        {status}
        <FiChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            aria-label={label}
            style={{ top: menuPosition.top, left: menuPosition.left }}
            className="fixed z-100 min-w-36 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
          >
            {bookingStatuses.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === status}
                onClick={() => {
                  setIsOpen(false);
                  if (option !== status) onChange(option);
                }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-xs font-semibold ${statusClasses[option]}`}
              >
                {option}
                {option === status && <FiCheck size={14} />}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

export default function HotelBookings() {
  const { user } = useAppContext();
  const bookings = user?.bookings ?? [];
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const updateBookingStatus = useUpdateBookingStatus();

  const rooms = user?.hotel?.rooms ?? [];
  const roomOf = (roomId: string) => rooms.find((room) => room.id === roomId);
  const roomTypeOf = (roomId: string) => roomOf(roomId)?.roomType ?? "—";

  const selectedRoom = selectedBooking ? roomOf(selectedBooking.roomId) : null;

  const handleStatusChange = async (
    booking: Booking,
    selectedStatus: BookingStatus,
  ) => {
    if (user?.role !== "HOTEL_OWNER" || selectedStatus === booking.status) {
      return;
    }

    const toastId = `booking-status-${booking.id}`;
    toast.loading("Updating booking status...", { id: toastId });

    try {
      const response = await updateBookingStatus.mutateAsync({
        bookingId: booking.id,
        payload: { status: selectedStatus },
      });

      setSelectedBooking((currentBooking) =>
        currentBooking?.id === booking.id
          ? { ...currentBooking, status: selectedStatus }
          : currentBooking,
      );
      toast.success(response.message || "Booking status updated successfully", {
        id: toastId,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update the booking status",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <div className="space-y-3 mb-10">
        <h1 className="text-xl font-bold text-primary-dark sm:text-4xl">
          Hotel Bookings
        </h1>
        <p className="text-text-muted max-w-3xl">
          Monitor your room listings, track bookings and analyze revenue—all in
          one place. Stay updated with real-time insights to ensure smooth
          operations.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
          <h2 className="font-semibold text-text">All Bookings</h2>
          <span className="text-text-muted">
            {bookings.length} {bookings.length > 1 ? "Bookings" : "Booking"}
          </span>
        </div>

        {bookings.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-text-muted">
            No bookings found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 text-left">
              <thead className="bg-gray-50 text-text">
                <tr>
                  <th className="px-4 py-3 font-semibold sm:px-6">Sr. No.</th>
                  <th className="px-4 py-3 font-semibold">Room Type</th>
                  <th className="px-4 py-3 font-semibold">Check In</th>
                  <th className="px-4 py-3 font-semibold">Check Out</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className="cursor-pointer border-t border-gray-100  text-text-muted transition-colors hover:bg-primary/5"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <td className="p-4 font-semibold sm:px-6">{index + 1}</td>
                    <td className="p-4 whitespace-nowrap font-semibold">
                      {roomTypeOf(booking.roomId)}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      ${booking.totalPrice}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {booking.paymentMethod === "CARD"
                        ? "card"
                        : booking.paymentMethod === "PAY_AT_HOTEL"
                          ? "Pay at Hotel"
                          : "-"}
                    </td>
                    <td
                      className="p-4 whitespace-nowrap"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <StatusDropdown
                        status={booking.status}
                        disabled={
                          user?.role !== "HOTEL_OWNER" ||
                          updateBookingStatus.isPending
                        }
                        label={`Change status for booking ${booking.id}`}
                        onChange={(status) =>
                          void handleStatusChange(booking, status)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => {
            setSelectedBooking(null);
          }}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl space-y-3 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-primary-dark">
                Booking Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                aria-label="Close room details"
                className="rounded-lg p-2 text-text-muted hover:bg-gray-100 hover:text-text"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Customer Details */}
            <div className="text-text-muted space-y-1">
              <h3 className="text-xl font-semibold mb-2 text-text">
                Customer Details
              </h3>
              <p>
                <span className="text-text font-semibold">Name: </span>
                {selectedBooking.user?.firstName}{" "}
                {selectedBooking.user?.lastName}
              </p>
              <p>
                <span className="text-text font-semibold">Email: </span>
                {selectedBooking.user?.email}
              </p>
              <p>
                <span className="text-text font-semibold">Phone: </span>
                {selectedBooking.user?.phone}
              </p>
            </div>

            {/* Room Details */}
            <div className="text-text-muted">
              <h3 className="text-xl font-semibold mb-2 text-text">
                Room Details
              </h3>
              <div className="flex items-center gap-4 border border-gray-200 shadow rounded-xl p-2 bg-gray-100">
                {selectedRoom?.images?.[0] && (
                  <Image
                    src={selectedRoom.images[0]}
                    alt={selectedRoom.roomType}
                    width={64}
                    height={64}
                    className="w-30 h-30 object-cover rounded"
                  />
                )}
                <div className="flex-1 text-text-muted space-y-3">
                  <p>
                    <span className="text-text font-semibold">Room Type: </span>
                    {roomTypeOf(selectedBooking.roomId)}
                  </p>
                  <p>
                    <span className="text-text font-semibold">Guests: </span>
                    {selectedBooking.guests}
                  </p>
                  <p>
                    <span className="text-text font-semibold">
                      Price/night:{" "}
                    </span>
                    ${selectedRoom?.pricePerNight}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="text-text-muted space-y-1">
              <h3 className="text-xl font-semibold mb-2 text-text">
                Booking Details
              </h3>
              <p>
                <span className="text-text font-semibold">Check In: </span>
                {new Date(selectedBooking.checkInDate).toLocaleDateString()}
              </p>
              <p>
                <span className="text-text font-semibold">Check Out: </span>
                {new Date(selectedBooking.checkOutDate).toLocaleDateString()}
              </p>
              <p>
                <span className="text-text font-semibold">Total: </span> $
                {selectedBooking.totalPrice}
              </p>
              <p>
                <span className="text-text font-semibold">
                  Payment Method:{" "}
                </span>
                {selectedBooking.paymentMethod === "CARD"
                  ? "card"
                  : selectedBooking.paymentMethod === "PAY_AT_HOTEL"
                    ? "Pay at Hotel"
                    : "-"}
              </p>
              <p>
                <span className="text-text font-semibold">Paid: </span>
                {selectedBooking.isPaid ? "Yes" : "No"}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-text font-semibold">Status: </span>
                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${statusClasses[selectedBooking.status]}`}
                >
                  {selectedBooking.status}
                </span>
              </div>
              <p>
                <span className="text-text font-semibold">Booked On: </span>
                {new Date(selectedBooking.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end">
              <MainButton
                type="button"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </MainButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
