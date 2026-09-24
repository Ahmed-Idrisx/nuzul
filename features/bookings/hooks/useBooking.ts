"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bookingApi } from "../api/booking.api";

import type {
  CheckAvailabilityPayload,
  CreateBookingPayload,
  UpdateBookingStatusPayload,
} from "../types/booking.types";
import type { User } from "@/features/user/types/user.types";

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

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: UpdateBookingStatusPayload;
    }) => bookingApi.updateStatus(bookingId, payload),
    onSuccess: (response, variables) => {
      const updatedBooking = response.data[0];

      queryClient.setQueryData<User>(["user"], (currentUser) =>
        currentUser
          ? {
              ...currentUser,
              bookings: currentUser.bookings.map((booking) =>
                booking.id === variables.bookingId
                  ? {
                      ...booking,
                      ...updatedBooking,
                      status: variables.payload.status,
                    }
                  : booking,
              ),
            }
          : currentUser,
      );
    },
  });
}
