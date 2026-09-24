"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiImage, FiMapPin } from "react-icons/fi";

import { useAppContext } from "@/context/AppContext";
import { useHotels } from "@/features/hotels/hooks/useHotel";
import Spinner from "@/components/ui/Spinner";

export default function RecommendedHotels() {
  const { searchedCities } = useAppContext();
  const { data: hotels, isLoading, isError } = useHotels();

  const searchedCityNames = new Set(
    searchedCities.map((city) => city.trim().toLowerCase()),
  );
  const recommendedHotels = (hotels ?? [])
    .filter((hotel) => searchedCityNames.has(hotel.city.trim().toLowerCase()))
    .slice(0, 4);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || recommendedHotels.length === 0) {
    return null;
  }

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-14 lg:py-24 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:text-base">
              Based on your searches
            </span>
            <h2 className="mt-3 text-3xl font-playfair font-bold leading-tight text-text sm:text-4xl lg:text-[56px]">
              Recommended hotels
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-text-muted">
              Discover stays in the places you have been exploring.
            </p>
          </div>
          <Link
            href="/hotels"
            className="inline-flex w-fit items-center gap-2 border-b border-primary pb-2 text-sm font-semibold text-text transition hover:text-primary"
          >
            View all hotels
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {recommendedHotels.map((hotel) => (
            <Link
              href={`/hotels/${hotel.id}`}
              key={hotel.id}
              className="group grid overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:grid-cols-[minmax(120px,.85fr)_1.15fr]"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-primary/10 md:aspect-auto md:min-h-full">
                {hotel.image ? (
                  <Image
                    src={hotel.image}
                    alt={`${hotel.name} hotel`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-primary/60">
                    <FiImage className="h-10 w-10" aria-hidden="true" />
                    <span className="sr-only">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-playfair text-2xl font-bold text-text">
                  {hotel.name}
                </h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-text-muted">
                  <FiMapPin
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {hotel.city}, {hotel.country}
                </p>
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-text-muted">
                  {hotel.shortDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Explore hotel
                  <FiArrowUpRight aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
