import { apiRequest } from "@/lib/api-client";

import type { Hotel, HotelDetails } from "../types/hotel.types";

export const hotelApi = {
  getHotels: () =>
    apiRequest<Hotel>("/hotels", {
      method: "GET",
    }),

  getHotelById: (hotelId: string) =>
    apiRequest<HotelDetails>(`/hotels/${hotelId}`, {
      method: "GET",
    }),

  createHotel: (payload: FormData) =>
    apiRequest<unknown>("/hotels", {
      method: "POST",
      body: payload,
    }),
};
