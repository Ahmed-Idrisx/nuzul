"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiImage,
  FiMapPin,
  FiPhone,
  FiSearch,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import Spinner from "@/components/ui/Spinner";
import { useAppContext } from "@/context/AppContext";
import {
  useCheckAvailability,
  useCreateBooking,
} from "@/features/bookings/hooks/useBooking";
import {
  checkAvailabilitySchema,
  type CheckAvailabilityFormData,
} from "@/features/bookings/schemas/booking.schema";
import { useHotel } from "@/features/hotels/hooks/useHotel";

export default function RoomDetailsPage({
  hotelId,
  roomId,
}: {
  hotelId: string;
  roomId: string;
}) {
  const { data: hotel, isLoading, isError } = useHotel(hotelId);
  const { user } = useAppContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  const checkAvailability = useCheckAvailability();
  const createBooking = useCreateBooking();
  const room = hotel?.rooms.find((item) => item.id === roomId);
  const [selectedImage, setSelectedImage] = useState({ roomId, index: 0 });
  const [isAvailableForStay, setIsAvailableForStay] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingStatus, setBookingStatus] = useState<
    "success" | "error" | null
  >(null);
  const selectedImageIndex =
    selectedImage.roomId === roomId ? selectedImage.index : 0;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CheckAvailabilityFormData>({
    resolver: zodResolver(checkAvailabilitySchema),
    defaultValues: { roomId, guests: 1, checkInDate: "", checkOutDate: "" },
  });
  const resetAvailability = () => {
    setIsAvailableForStay(false);
    setBookingMessage("");
    setBookingStatus(null);
  };

  if (isLoading) return <Spinner />;

  if (isError || !hotel || !room) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-5 py-24 text-center">
        <div>
          <h1 className="font-playfair text-4xl font-bold text-text">
            Room not found
          </h1>
          <Link
            href={`/hotels/${hotelId}`}
            className="mt-7 inline-flex items-center gap-2 font-semibold text-primary"
          >
            <FiArrowLeft aria-hidden="true" /> Back to hotel
          </Link>
        </div>
      </main>
    );
  }

  const roomImages = room.images.slice(0, 4);

  const onBookingSubmit = async (data: CheckAvailabilityFormData) => {
    if (data.guests > room.maxGuests) {
      setError("guests", {
        type: "validate",
        message: `This room accommodates up to ${room.maxGuests} guests`,
      });
      return;
    }

    setBookingMessage("");
    setBookingStatus(null);

    try {
      if (!isAvailableForStay) {
        const response = await checkAvailability.mutateAsync(data);
        setIsAvailableForStay(true);
        setBookingMessage(response.message);
        setBookingStatus(response.status);
        toast[response.status === "success" ? "success" : "error"](
          response.message,
        );
        return;
      }

      if (!user) {
        router.push("/login");
        return;
      }

      const response = await createBooking.mutateAsync(data);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setBookingMessage(response.message);
      setBookingStatus(response.status);
      toast[response.status === "success" ? "success" : "error"](
        response.message,
      );

      if (response.status === "success") {
        window.setTimeout(() => router.push("/my-bookings"), 500);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to complete your request";
      setBookingMessage(message);
      setBookingStatus("error");
      toast.error(message);
      setIsAvailableForStay(false);
    }
  };

  const bookingIsPending =
    checkAvailability.isPending || createBooking.isPending;

  return (
    <main className="px-5 pb-24 pt-28 sm:px-8 lg:px-14 xl:px-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/hotels/${hotelId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary"
        >
          <FiArrowLeft aria-hidden="true" /> Back to {hotel.name}
        </Link>

        <section className="mt-8 overflow-hidden rounded-xl bg-cream-bg shadow-sm sm:rounded-2xl">
          <div className="p-7 sm:p-10">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <FiMapPin aria-hidden="true" /> {hotel.city}, {hotel.country}
            </p>
            <h2 className="font-playfair mt-3 text-3xl font-bold text-text sm:text-4xl">
              {hotel.name}
            </h2>
          </div>

          <div className="p-3 sm:p-5">
            <div className="relative aspect-16/8 overflow-hidden bg-primary/10 rounded-xl sm:rounded-2xl">
              {roomImages[selectedImageIndex] ? (
                <Image
                  src={roomImages[selectedImageIndex]}
                  alt={`${room.roomType} at ${hotel.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className="object-cover transition-opacity duration-300 rounded-xl sm:rounded-2xl"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-primary/60">
                  <FiImage className="h-12 w-12" aria-hidden="true" />
                </div>
              )}
            </div>

            {roomImages.length > 1 && (
              <div
                className="mt-3 grid grid-cols-4 gap-3"
                aria-label="Room images"
              >
                {roomImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage({ roomId, index })}
                    aria-label={`View room image ${index + 1}`}
                    aria-pressed={selectedImageIndex === index}
                    className={`group relative aspect-4/3 rounded-xl overflow-hidden bg-primary/10 outline-none transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:rounded-2xl ${selectedImageIndex === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"}`}
                  >
                    <Image
                      src={image}
                      alt={`${room.roomType} view ${index + 1}`}
                      fill
                      sizes="(min-width: 640px) 240px, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-7 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-2 text-primary">
                <FiUsers aria-hidden="true" /> Up to {room.maxGuests} guests
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${room.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
              >
                {room.isAvailable
                  ? "Available to book"
                  : "Currently unavailable"}
              </span>
            </div>
            <h1 className="font-playfair mt-4 text-4xl font-bold text-text sm:text-5xl">
              {room.roomType}
            </h1>
            <p className="mt-2.5 text-lg leading-8 text-text sm:mt-5">
              {room.shortDescription}
            </p>
            <p className="mt-2 max-w-3xl leading-7 text-text-muted sm:mt-5">
              {room.description}
            </p>
            <div className="mt-4 grid gap-6 border-y border-border py-3.5 sm:grid-cols-2 sm:mt-8 sm:py-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Nightly rate
                </p>
                <p className="mt-2 text-2xl font-semibold text-text">
                  ${room.pricePerNight}
                  <span className="ml-1 text-sm font-normal text-text-muted">
                    per night
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Room status
                </p>
                <p className="mt-2 text-sm font-semibold text-text">
                  {room.isAvailable
                    ? "Ready for your stay"
                    : "Not available right now"}
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-8" aria-labelledby="amenities-heading">
              <h2
                id="amenities-heading"
                className="font-playfair text-2xl font-bold text-text"
              >
                Room amenities
              </h2>
              {room.amenities.length > 0 ? (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {room.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-3 text-sm text-text-muted"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FiCheck aria-hidden="true" />
                      </span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-text-muted">
                  Amenity details will be available soon.
                </p>
              )}
            </div>

            <form
              onSubmit={handleSubmit(onBookingSubmit)}
              className="mt-8 border-t border-border pt-7"
              aria-labelledby="booking-heading"
            >
              <h2
                id="booking-heading"
                className="font-playfair text-2xl font-bold text-text"
              >
                Plan your stay
              </h2>
              <input type="hidden" {...register("roomId")} />
              <div className="mt-5 grid items-start gap-4 md:grid-cols-4">
                <div>
                  <label
                    htmlFor="room-check-in"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-text"
                  >
                    <FiCalendar className="text-primary" aria-hidden="true" />{" "}
                    Check in
                  </label>
                  <input
                    id="room-check-in"
                    type="date"
                    {...register("checkInDate", {
                      onChange: resetAvailability,
                    })}
                    className="h-12 w-full rounded-xl border border-border bg-white px-3 text-text outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                  <p className="mt-1 min-h-4 text-xs text-red-600">
                    {errors.checkInDate?.message ?? " "}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="room-check-out"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-text"
                  >
                    <FiCalendar className="text-primary" aria-hidden="true" />{" "}
                    Check out
                  </label>
                  <input
                    id="room-check-out"
                    type="date"
                    {...register("checkOutDate", {
                      onChange: resetAvailability,
                    })}
                    className="h-12 w-full rounded-xl border border-border bg-white px-3 text-text outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                  <p className="mt-1 min-h-4 text-xs text-red-600">
                    {errors.checkOutDate?.message ?? " "}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="room-guests"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-text"
                  >
                    <FiUsers className="text-primary" aria-hidden="true" />{" "}
                    Guests
                  </label>
                  <input
                    id="room-guests"
                    type="number"
                    min={1}
                    {...register("guests", {
                      valueAsNumber: true,
                      onChange: resetAvailability,
                    })}
                    className="h-12 w-full rounded-xl border border-border bg-white px-3 text-text outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                  <p className="mt-1 min-h-4 text-xs text-red-600">
                    {errors.guests?.message ?? " "}
                  </p>
                </div>
                <div className="pt-3 md:pt-7">
                  <button
                    type="submit"
                    disabled={bookingIsPending || !room.isAvailable}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-white transition hover:bg-primary-dark active:scale-98 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isAvailableForStay ? (
                      <FiCheck aria-hidden="true" />
                    ) : (
                      <FiSearch aria-hidden="true" />
                    )}
                    {bookingIsPending
                      ? "Checking..."
                      : isAvailableForStay
                        ? "Book now"
                        : "Check availability"}
                  </button>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p
                  className={`text-sm sm:text-lg ${bookingStatus === "success" ? "text-green-700" : bookingStatus === "error" ? "text-red-600" : "text-text-muted"}`}
                  role="status"
                >
                  {bookingMessage}
                </p>
              </div>
              {!room.isAvailable && (
                <p className="mt-3 text-sm text-text-muted">
                  This room is currently unavailable for booking.
                </p>
              )}
            </form>
          </div>
        </section>
        <section className="mt-8 grid overflow-hidden rounded-xl bg-cream-bg shadow-sm sm:rounded-2xl lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative min-h-64 bg-primary/10 lg:min-h-80">
            {hotel.image ? (
              <Image
                src={hotel.image}
                alt={`${hotel.name} hotel`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-primary/60">
                <FiImage className="h-12 w-12" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="p-7 sm:p-10">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <FiMapPin aria-hidden="true" /> {hotel.city}, {hotel.country}
            </p>
            <h2 className="font-playfair mt-3 text-3xl font-bold text-text sm:text-4xl">
              {hotel.name}
            </h2>
            <p className="mt-3 leading-7 text-text">{hotel.shortDescription}</p>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              {hotel.description}
            </p>
            <div className="mt-5 grid gap-3 border-t border-border pt-5 text-sm text-text-muted">
              <p className="flex items-start gap-3">
                <FiMapPin
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {hotel.address}, {hotel.city}, {hotel.country}
              </p>
              <p className="flex items-center gap-3">
                <FiPhone className="shrink-0 text-primary" aria-hidden="true" />
                <a href={`tel:${hotel.contact}`} className="hover:text-primary">
                  {hotel.contact}
                </a>
              </p>
            </div>
            <div className="mt-5 border-t border-border pt-5">
              <p className="flex items-center gap-2 font-semibold text-text">
                <FiShield className="text-primary" aria-hidden="true" /> Hotel
                facilities
              </p>
              {hotel.facilities.length > 0 ? (
                <ul className="mt-4 grid gap-2 text-sm text-text-muted sm:grid-cols-2">
                  {hotel.facilities.map((facility) => (
                    <li key={facility} className="flex items-center gap-2">
                      <FiCheck className="text-primary" aria-hidden="true" />
                      {facility}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-text-muted">
                  Facility details will be available soon.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
