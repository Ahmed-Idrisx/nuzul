import type { Metadata } from "next";

import HotelsPage from "@/features/hotels/components/HotelsPage";

export const metadata: Metadata = {
  title: "Hotels | Nuzul",
  description: "Discover carefully chosen hotels and find your next Nuzul.",
};

export default async function HotelsRoute({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string | string[] }>;
}) {
  const params = await searchParams;
  const destination = Array.isArray(params.destination)
    ? params.destination[0]
    : params.destination;

  return <HotelsPage destination={destination ?? ""} />;
}
