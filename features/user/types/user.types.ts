export interface Booking {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: string;
  guests: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  paymentMethod: "PAY_AT_HOTEL" | "CARD";
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  facilities: string[];
  image: string | null;
  imageId: string | null;
  address: string;
  country: string;
  city: string;
  contact: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string | null;
  role: "USER" | "HOTEL_OWNER";
  isVerified: boolean;
  recentSearchedCities: string[];
  hotel: Hotel | null;
  bookings: Booking[];
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: File;
}
