import type { Metadata } from "next";

import RoomDetailsPage from "@/features/rooms/components/RoomDetailsPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hotelId: string; roomId: string }>;
}): Promise<Metadata> {
  const { roomId } = await params;

  return {
    title: `Room ${roomId} | Nuzul`,
    description: "Explore room details, amenities, and booking information on Nuzul.",
  };
}

export default async function RoomRoute({
  params,
}: {
  params: Promise<{ hotelId: string; roomId: string }>;
}) {
  const { hotelId, roomId } = await params;

  return <RoomDetailsPage hotelId={hotelId} roomId={roomId} />;
}