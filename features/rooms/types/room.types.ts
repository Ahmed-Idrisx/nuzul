export interface HotelRoom {
  id: string;
  hotelId: string;
  roomType: string;
  shortDescription: string;
  description: string;
  amenities: string[];
  pricePerNight: string;
  maxGuests: number;
  images: string[];
  isAvailable: boolean;
}

export interface CreateRoomPayload {
  roomType: string;
  shortDescription: string;
  description: string;
  amenities: string[];
  pricePerNight: string;
  maxGuests: number;
  images: File[];
}

export interface RoomAvailability {
  id: string;
  isAvailable: boolean;
}
