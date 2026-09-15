"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

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
