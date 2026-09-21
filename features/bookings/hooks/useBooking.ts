"use client";

import { useMutation } from "@tanstack/react-query";

import { bookingApi } from "../api/booking.api";

import type {
  CheckAvailabilityPayload,
  CreateBookingPayload,
} from "../types/booking.types";

export function useCheckAvailability() {
  return useMutation({
    mutationFn: (payload: CheckAvailabilityPayload) =>
      bookingApi.checkAvailability(payload),
  });
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      bookingApi.createBooking(payload),
  });
}
