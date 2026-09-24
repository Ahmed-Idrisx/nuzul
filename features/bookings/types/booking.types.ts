import type { Booking } from "@/features/user/types/user.types";
import type { BookingStatus } from "@/features/user/types/user.types";

export interface BookingPayload {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

export type CheckAvailabilityPayload = BookingPayload;
export type CreateBookingPayload = BookingPayload;

export interface UpdateBookingStatusPayload {
  status: BookingStatus;
}

export type { Booking };
