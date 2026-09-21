"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiChevronDown,
  FiImage,
  FiMapPin,
  FiPhone,
  FiShield,
} from "react-icons/fi";

import Spinner from "@/components/ui/Spinner";

import { useHotel } from "../hooks/useHotel";

interface FilterOption {
  label: string;
  value: string;
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);
  const dropdownId = label.toLowerCase().replaceAll(" ", "-");

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative text-sm font-semibold text-text">
      <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-text-muted">
        {label}
      </span>
      <button
        type="button"
        id={dropdownId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-border bg-white px-3 text-left font-normal text-text outline-none transition hover:border-primary focus:border-primary focus:ring-4 focus:ring-primary/10"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <FiChevronDown
          className={`shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-labelledby={dropdownId}
          className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-border bg-white p-1 shadow-xl"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${option.value === value ? "bg-primary/10 font-semibold text-primary" : "text-text-muted hover:bg-primary/5 hover:text-text"}`}
            >
              {option.label}
              {option.value === value && <FiCheck aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HotelDetailsPage({ hotelId }: { hotelId: string }) {
  const { data: hotel, isLoading, isError } = useHotel(hotelId);
  const [roomTypeFilter, setRoomTypeFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  if (isLoading) return <Spinner />;

  if (isError || !hotel) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-5 py-24 text-center">
        <div>
          <h1 className="font-playfair text-4xl font-bold text-text">
            Hotel not found
          </h1>
          <p className="mt-4 text-text-muted">
            This hotel may no longer be available.
          </p>
          <Link
            href="/hotels"
            className="mt-7 inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-dark"
          >
            <FiArrowLeft aria-hidden="true" /> Back to hotels
          </Link>
        </div>
      </main>
    );
  }

  const roomTypes = [
    "All",
    ...Array.from(new Set(hotel.rooms.map((room) => room.roomType))),
  ];
  const filteredRooms = hotel.rooms
    .filter((room) => {
      const price = Number(room.pricePerNight);
      const matchesRoomType =
        roomTypeFilter === "All" || room.roomType === roomTypeFilter;
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-100" && price < 100) ||
        (priceRange === "100-200" && price >= 100 && price <= 200) ||
        (priceRange === "over-200" && price > 200);

      return matchesRoomType && matchesPrice;
    })
    .sort((firstRoom, secondRoom) => {
      if (sortBy === "price-low") {
        return (
          Number(firstRoom.pricePerNight) - Number(secondRoom.pricePerNight)
        );
      }

      if (sortBy === "price-high") {
        return (
          Number(secondRoom.pricePerNight) - Number(firstRoom.pricePerNight)
        );
      }

      return 0;
    });

  return (
    <main className="px-5 pb-24 pt-28 sm:px-8 lg:px-14 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/hotels"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-text-muted transition-colors hover:text-primary"
        >
          <FiArrowLeft aria-hidden="true" /> Back to hotels
        </Link>

        <section className="grid rounded-2xl overflow-hidden bg-cream-bg shadow-sm lg:grid-cols-2">
          <div className="relative min-h-72 bg-primary/10 lg:aspect-auto lg:min-h-145">
            {hotel.image ? (
              <Image
                src={hotel.image}
                alt={`${hotel.name} hotel`}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-primary/60">
                <FiImage className="h-12 w-12" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <FiMapPin aria-hidden="true" /> {hotel.city}, {hotel.country}
            </p>
            <h1 className="font-playfair mt-2 text-4xl font-bold leading-tight text-text sm:text-5xl sm:mt-4">
              {hotel.name}
            </h1>
            <p className="mt-2.5 leading-8 text-text sm:text-lg sm:mt-5">
              {hotel.shortDescription}
            </p>
            <p className="mt-2 text-sm leading-7 text-text-muted sm:text-base sm:mt-4">
              {hotel.description}
            </p>
            <div className="mt-3.5 grid gap-3 border-t border-border pt-6 text-sm text-text-muted sm:mt-7">
              <p className="flex items-start gap-3">
                <FiMapPin
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>
                  {hotel.address}, {hotel.city}, {hotel.country}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <FiPhone className="shrink-0 text-primary" aria-hidden="true" />
                <a
                  href={`tel:${hotel.contact}`}
                  className="transition-colors hover:text-primary"
                >
                  {hotel.contact}
                </a>
              </p>
            </div>
          </div>
        </section>

        <section
          className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]"
          aria-labelledby="hotel-overview-heading"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              A considered stay
            </p>
            <h2
              id="hotel-overview-heading"
              className="font-playfair mt-2 text-3xl font-bold text-text sm:text-4xl"
            >
              Everything you need, close at hand.
            </h2>
          </div>
          <div className="bg-cream-bg rounded-2xl p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <FiShield className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="font-semibold text-text">Hotel facilities</h3>
            </div>
            {hotel.facilities.length > 0 ? (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {hotel.facilities.map((facility) => (
                  <li
                    key={facility}
                    className="flex items-center gap-3 text-sm text-text-muted"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <FiCheck aria-hidden="true" />
                    </span>
                    {facility}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-text-muted">
                Facility details will be available soon.
              </p>
            )}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="rooms-heading">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Stay your way
              </p>
              <h2
                id="rooms-heading"
                className="font-playfair mt-2 text-3xl font-bold text-text sm:text-4xl"
              >
                Available rooms
              </h2>
            </div>
            <span className="text-sm text-text-muted">
              {filteredRooms.length}{" "}
              {filteredRooms.length === 1 ? "room" : "rooms"}
            </span>
          </div>

          {hotel.rooms.length > 0 && (
            <div className="mt-6 grid gap-4 rounded-t-2xl border border-border bg-cream-bg p-5 sm:p-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:items-end">
              <FilterDropdown
                label="Popular filters (room type)"
                value={roomTypeFilter}
                options={roomTypes.map((roomType) => ({
                  value: roomType,
                  label: roomType === "All" ? "All room types" : roomType,
                }))}
                onChange={setRoomTypeFilter}
              />
              <FilterDropdown
                label="Price range"
                value={priceRange}
                options={[
                  { value: "all", label: "All prices" },
                  { value: "under-100", label: "Under $100" },
                  { value: "100-200", label: "$100 - $200" },
                  { value: "over-200", label: "Over $200" },
                ]}
                onChange={setPriceRange}
              />
              <FilterDropdown
                label="Sort by"
                value={sortBy}
                options={[
                  { value: "recommended", label: "Recommended" },
                  { value: "price-low", label: "Price: low to high" },
                  { value: "price-high", label: "Price: high to low" },
                ]}
                onChange={setSortBy}
              />
            </div>
          )}

          {filteredRooms.length > 0 ? (
            <div className="divide-y divide-border">
              {filteredRooms.map((room) => (
                <Link
                  href={`/hotels/${hotel.id}/${room.id}`}
                  key={room.id}
                  className="bg-cream-bg group grid gap-5 px-4 py-7 transition-colors hover:bg-primary/5 sm:grid-cols-[12rem_1fr_auto] sm:items-center"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-primary/10">
                    {room.images[0] ? (
                      <Image
                        src={room.images[0]}
                        alt={`${room.roomType} at ${hotel.name}`}
                        fill
                        sizes="192px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-primary/60">
                        <FiImage aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-text group-hover:text-primary">
                      {room.roomType}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      {room.shortDescription}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-text-muted">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                        Up to {room.maxGuests} guests
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 ${room.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {room.isAvailable
                          ? "Available"
                          : "Currently unavailable"}
                      </span>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
                      {room.amenities.slice(0, 3).map((amenity) => (
                        <li key={amenity} className="flex items-center gap-1">
                          <FiCheck
                            className="text-primary"
                            aria-hidden="true"
                          />{" "}
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-semibold text-text">
                      ${room.pricePerNight}
                    </p>
                    <p className="text-xs text-text-muted">per night</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-primary">
                      View room
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-text-muted">
              No rooms match the selected filters.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
