"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiCalendar, FiMapPin, FiSearch, FiUsers } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { assets } from "@/assets";
import { useStoreRecentSearchedCity } from "@/features/user/hooks/useUser";
import {
  HeroSearchFormData,
  heroSearchSchema,
} from "@/features/bookings/schemas/booking.schema";
import { cities } from "@/constant/site";

export default function Hero() {
  const router = useRouter();
  const storeRecentSearch = useStoreRecentSearchedCity();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeroSearchFormData>({
    resolver: zodResolver(heroSearchSchema),
    defaultValues: {
      destination: "",
      checkInDate: "",
      checkOutDate: "",
      guests: 1,
    },
  });

  const onSearch = (data: HeroSearchFormData) => {
    const searchParams = new URLSearchParams({
      destination: data.destination,
    });
    storeRecentSearch.mutate({ city: data.destination });
    router.push(`/hotels?${searchParams.toString()}`);
  };

  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden px-5 py-16 pt-20 sm:px-8 lg:px-14 xl:px-24">
      <Image
        src={assets.hero}
        alt="A welcoming hotel room"
        fill
        priority
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,25,27,.86),rgba(9,25,27,.52),rgba(9,25,27,.2))]" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
            Book. Host. Explore.
          </p>
          <h1 className="font-playfair max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
            Find your Nuzul away from home.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-xl md:text-2xl">
            Nuzul connects you with unique stays and local experiences around
            the world, book with confidence, wherever the road takes you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSearch)}
          className="mt-10 grid gap-3 rounded-3xl border border-white/30 bg-white/95 p-3 shadow-2xl backdrop-blur-md sm:p-4 lg:grid-cols-[1.4fr_1fr_1fr_.7fr_auto] lg:items-end lg:rounded-2xl"
        >
          <div className="min-w-0">
            <label
              htmlFor="destination"
              className="mb-2 flex items-center gap-2 px-1 font-semibold uppercase tracking-wide text-text-muted"
            >
              <FiMapPin className="text-primary" aria-hidden="true" />{" "}
              Destination
            </label>
            <input
              id="destination"
              type="text"
              list="destinations"
              placeholder="Where are you going?"
              {...register("destination")}
              className="h-12 w-full rounded-xl border border-border bg-white px-4 text-text outline-none transition placeholder:text-text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
            <datalist id="destinations">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
            {errors.destination && (
              <p className="mt-1 px-1 text-xs text-red-600">
                {errors.destination.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="checkIn"
              className="mb-2 flex items-center gap-2 px-1 font-semibold uppercase tracking-wide text-text-muted"
            >
              <FiCalendar className="text-primary" aria-hidden="true" /> Check
              in
            </label>
            <input
              id="checkIn"
              type="date"
              {...register("checkInDate")}
              className="h-12 w-full rounded-xl border border-border bg-white px-4 text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div>
            <label
              htmlFor="checkOut"
              className="mb-2 flex items-center gap-2 px-1 font-semibold uppercase tracking-wide text-text-muted"
            >
              <FiCalendar className="text-primary" aria-hidden="true" /> Check
              out
            </label>
            <input
              id="checkOut"
              type="date"
              {...register("checkOutDate")}
              className="h-12 w-full rounded-xl border border-border bg-white px-4 text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div>
            <label
              htmlFor="guests"
              className="mb-2 flex items-center gap-2 px-1 font-semibold uppercase tracking-wide text-text-muted"
            >
              <FiUsers className="text-primary" aria-hidden="true" /> Guests
            </label>
            <input
              id="guests"
              type="number"
              min={1}
              max={20}
              {...register("guests", { valueAsNumber: true })}
              className="h-12 w-full rounded-xl border border-border bg-white px-4 text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/25 active:scale-[.98] lg:min-w-32"
          >
            <FiSearch aria-hidden="true" /> Search
          </button>
        </form>
      </div>
    </main>
  );
}
