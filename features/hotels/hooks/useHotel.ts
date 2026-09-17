"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { hotelApi } from "../api/hotel.api";

export function useHotels() {
  return useQuery({
    queryKey: ["hotels"],
    queryFn: () => hotelApi.getHotels().then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useHotel(hotelId: string) {
  return useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => hotelApi.getHotelById(hotelId).then((res) => res.data[0]),
    enabled: !!hotelId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useCreateHotel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormData) => hotelApi.createHotel(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
    },
  });
}
