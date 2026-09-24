import { HotelRoom } from "@/features/rooms/types/room.types";
import type { BookingStatus } from "@/features/user/types/user.types";

export interface Hotel {
  id: string;
  name: string;
  image: string;
  imageId: string;
  country: string;
  city: string;
  shortDescription: string;
}

export interface HotelDetails extends Hotel {
  address: string;
  contact: string;
  description: string;
  facilities: string[];
  ownerId: string;
  rooms: HotelRoom[];
}

export interface Booking {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: string;
  guests: number;
  status: BookingStatus;
  paymentMethod: "PAY_AT_HOTEL" | "CARD";
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface RegisterHotelPayload {
  name: string;
  country: string;
  city: string;
  address: string;
  contact: string;
  shortDescription: string;
  description: string;
  facilities: string[];
  image: File;
}
