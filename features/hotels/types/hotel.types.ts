export interface Hotel {
  id: string;
  name: string;
  image: string;
  country: string;
  city: string;
  shortDescription: string;
}

export interface HotelRoom {
  id: string;
  roomType: string;
  shortDescription: string;
  description: string;
  amenities: string[];
  pricePerNight: string;
  maxGuests: number;
  images: string[];
  isAvailable: boolean;
}

export interface HotelDetails extends Hotel {
  address: string;
  contact: string;
  description: string;
  facilities: string[];
  rooms: HotelRoom[];
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
