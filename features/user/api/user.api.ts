import { apiRequest } from "@/lib/api-client";

import type { User } from "../types/user.types";

export const userApi = {
  getUser: () =>
    apiRequest<User>("/user/me", {
      method: "GET",
    }),

  updateUser: (payload: FormData) =>
    apiRequest<User>("/user/me", {
      method: "POST",
      body: payload,
    }),
};
