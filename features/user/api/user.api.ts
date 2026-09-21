import { apiRequest } from "@/lib/api-client";

import type {
  StoreRecentSearchedCityPayload,
  StoreRecentSearchedCityResponse,
  User,
} from "../types/user.types";

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

  storeRecentSearchedCity: (payload: StoreRecentSearchedCityPayload) =>
    apiRequest<StoreRecentSearchedCityResponse>("/user/store-recent-search", {
      method: "POST",
      body: payload,
    }),
};
