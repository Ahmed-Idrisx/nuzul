import { apiRequest } from "@/lib/api-client";

import type {
  Booking,
  CheckAvailabilityPayload,
  CreateBookingPayload,
  UpdateBookingStatusPayload,
} from "../types/booking.types";

export const bookingApi = {
  checkAvailability: (payload: CheckAvailabilityPayload) =>
    apiRequest<Booking>("/booking/check-availability", {
      method: "POST",
      body: payload,
    }),

  createBooking: (payload: CreateBookingPayload) =>
    apiRequest<Booking>("/booking/book", {
      method: "POST",
      body: payload,
    }),

  updateStatus: (bookingId: string, payload: UpdateBookingStatusPayload) =>
    apiRequest<Booking>(`/booking/${bookingId}/status`, {
      method: "POST",
      body: payload,
    }),
};
