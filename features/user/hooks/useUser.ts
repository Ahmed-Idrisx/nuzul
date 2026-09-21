"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

import type { StoreRecentSearchedCityPayload, User } from "../types/user.types";

export function useUser(enabled: boolean) {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.getUser().then((res) => res.data[0]),
    enabled: enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormData) => userApi.updateUser(payload),

    onSuccess: (res) => {
      queryClient.setQueryData(["user"], res.data[0]);
    },
  });
}

export function useStoreRecentSearchedCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StoreRecentSearchedCityPayload) =>
      userApi.storeRecentSearchedCity(payload),

    onSuccess: (res) => {
      const recentSearchedCities = res.data[0]?.recentSearchedCities;

      if (recentSearchedCities) {
        queryClient.setQueryData<User>(["user"], (currentUser) =>
          currentUser ? { ...currentUser, recentSearchedCities } : currentUser,
        );
      }
    },
  });
}
