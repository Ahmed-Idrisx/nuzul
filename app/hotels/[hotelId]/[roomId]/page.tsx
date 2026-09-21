import RoomDetailsPage from "@/features/rooms/components/RoomDetailsPage";

export default async function RoomRoute({
  params,
}: {
  params: Promise<{ hotelId: string; roomId: string }>;
}) {
  const { hotelId, roomId } = await params;

  return <RoomDetailsPage hotelId={hotelId} roomId={roomId} />;
}