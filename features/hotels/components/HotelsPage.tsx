"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiImage, FiMapPin } from "react-icons/fi";

import Spinner from "@/components/ui/Spinner";

import { useHotels } from "../hooks/useHotel";

function HotelImage({ image, name }: { image: string | null; name: string }) {
  return (
    <div className="relative overflow-hidden bg-primary/10 aspect-4/3">
      {image ? (
        <Image
          src={image}
          alt={`${name} hotel`}
          fill
          sizes={"(min-width: 768px) 50vw, 100vw"}
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-primary/60">
          <FiImage className="h-10 w-10" aria-hidden="true" />
          <span className="sr-only">No image available for {name}</span>
        </div>
      )}
    </div>
  );
}

function HotelDetails({
  hotel,
}: {
  hotel: {
    name: string;
    city: string;
    country: string;
    shortDescription: string;
  };
}) {
  return (
    <div className="flex flex-col justify-center px-4 py-6 md:px-8 md:py-0">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        <FiMapPin aria-hidden="true" />
        {hotel.city}, {hotel.country}
      </p>
      <h2 className="font-playfair text-3xl font-bold leading-tight text-text sm:text-4xl">
        {hotel.name}
      </h2>
      <p className="mt-4 text-lg max-w-xl leading-7 text-text-muted">
        {hotel.shortDescription}
      </p>
      <span className="group mt-7 inline-flex w-fit items-center gap-3 border-b border-primary pb-2 text-sm font-semibold text-text transition-colors group-hover:text-primary">
        Explore hotel
        <FiArrowUpRight
          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}

export default function HotelsPage({ destination }: { destination: string }) {
  const { data: hotels, isLoading, isError } = useHotels();
  const normalizedDestination = destination.trim().toLowerCase();
  const filteredHotels = normalizedDestination
    ? (hotels ?? []).filter((hotel) =>
        [hotel.city, hotel.country].some((value) =>
          value.toLowerCase().includes(normalizedDestination),
        ),
      )
    : (hotels ?? []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-5 py-24 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Something went wrong
          </p>
          <h1 className="font-playfair mt-3 text-4xl font-bold text-text">
            We could not load the hotels.
          </h1>
          <p className="mt-4 text-text-muted">Please try again in a moment.</p>
        </div>
      </main>
    );
  }

  if (!filteredHotels.length) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-5 py-24 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Nuzul stays
          </p>
          <h1 className="font-playfair mt-3 text-4xl font-bold text-text">
            {normalizedDestination
              ? `No stays found in ${destination}.`
              : "New stays are on their way."}
          </h1>
          <p className="mt-4 text-text-muted">
            {normalizedDestination
              ? "Try another city or explore the full Nuzul collection."
              : "There are no hotels to show right now. Check back soon for a new place to stay."}
          </p>
        </div>
      </main>
    );
  }
  return (
    <main className="px-5 pb-24 pt-28 sm:px-8 lg:px-14 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="pb-14 lg:pb-20">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            The Nuzul collection
          </p>
          <h1 className="font-playfair text-5xl font-bold leading-[1.05] text-text sm:text-6xl lg:text-7xl">
            Places worth staying for.
          </h1>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl leading-7 text-text-muted sm:text-xl">
              Thoughtfully chosen hotels for slow mornings, easy arrivals, and
              memorable nights away from home.
            </p>
            <p className="shrink-0 font-medium text-text-muted">
              {filteredHotels.length}{" "}
              {filteredHotels.length === 1 ? "hotel" : "hotels"}
            </p>
          </div>
        </div>

        <section className="space-y-16 lg:space-y-24">
          {filteredHotels.map((hotel, index) => (
            <Link
              href={`/hotels/${hotel.id}`}
              key={hotel.id}
              className={`group grid overflow-hidden bg-cream-bg border-y rounded-2xl border-border/80 md:grid-cols-2 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <HotelImage image={hotel.image || null} name={hotel.name} />
              <HotelDetails hotel={hotel} />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
