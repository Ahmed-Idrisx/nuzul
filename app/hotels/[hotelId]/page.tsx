import type { Metadata } from "next";

import HotelDetailsPage from "@/features/hotels/components/HotelDetailsPage";

export const metadata: Metadata = {
  title: "Hotel details | Nuzul",
};

export default async function HotelRoute({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = await params;

  return <HotelDetailsPage hotelId={hotelId} />;
}
