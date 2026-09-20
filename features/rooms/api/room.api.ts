import { apiRequest } from "@/lib/api-client";

import type { HotelRoom, RoomAvailability } from "../types/room.types";

export const roomApi = {
  createRoom: (payload: FormData) =>
    apiRequest<HotelRoom>("/rooms/create-room", {
      method: "POST",
      body: payload,
    }),

  toggleAvailability: (roomId: string) =>
    apiRequest<RoomAvailability>("/rooms/toggle-availability", {
      method: "POST",
      body: { roomId },
    }),
};
