"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { roomApi } from "../api/room.api";
import { User } from "@/features/user/types/user.types";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormData) => roomApi.createRoom(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}

export function useToggleRoomAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: string) => roomApi.toggleAvailability(roomId),

    onMutate: async (roomId) => {
      // Stop any refetch from overwriting our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["user"],
      });

      // Save current user in case we need to rollback
      const previousUser = queryClient.getQueryData<User>(["user"]);

      // Optimistically update the room
      queryClient.setQueryData<User>(["user"], (currentUser) => {
        if (!currentUser?.hotel) {
          return currentUser;
        }

        return {
          ...currentUser,
          hotel: {
            ...currentUser.hotel,
            rooms: currentUser.hotel.rooms.map((room) =>
              room.id === roomId
                ? {
                    ...room,
                    isAvailable: !room.isAvailable,
                  }
                : room,
            ),
          },
        };
      });

      return { previousUser };
    },

    onError: (_error, _roomId, context) => {
      // Rollback optimistic update
      if (context?.previousUser) {
        queryClient.setQueryData(["user"], context.previousUser);
      }
    },

    onSettled: () => {
      // Make sure frontend eventually matches backend
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}
