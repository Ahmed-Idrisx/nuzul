"use client";

import { useState } from "react";
import Image from "next/image";
import { FiEye, FiUsers, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import MainButton from "@/components/shared/MainButton";
import { useAppContext } from "@/context/AppContext";
import { useToggleRoomAvailability } from "@/features/rooms/hooks/useRoom";
import { HotelRoom } from "@/features/rooms/types/room.types";
import { formatCurrency } from "@/utils/formatCurrency";

export default function ManageRoomsPage() {
  const { user } = useAppContext();
  const toggleAvailability = useToggleRoomAvailability();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const rooms = user?.hotel?.rooms ?? [];

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId) ?? null;

  const handleAvailabilityChange = (room: HotelRoom) => {
    const toastId = "room-availability";
    toast.loading("Updating room availability...", { id: toastId });

    toggleAvailability.mutate(room.id, {
      onSuccess: (response) => {
        toast.success(response.message, { id: toastId });
      },
      onError: (error) => {
        toast.error(error.message, { id: toastId });
      },
    });
  };

  return (
    <div className="relative">
      <div className="space-y-3 mb-10">
        <h1 className="text-xl font-bold text-primary-dark sm:text-4xl">
          Manage Room
        </h1>
        <p className="text-text-muted max-w-3xl">
          View your rooms and keep their availability up to date.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
          <h2 className="font-semibold text-text">All Rooms</h2>
          <span className="text-text-muted">
            {rooms.length} {rooms.length > 1 ? "Rooms" : "Room"}
          </span>
        </div>

        {rooms.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-text-muted">
            No rooms have been added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 text-left">
              <thead className="bg-gray-50 text-text">
                <tr>
                  <th className="px-4 py-3 font-semibold sm:px-6">Sr. No.</th>
                  <th className="px-4 py-3 font-semibold">Room Type</th>
                  <th className="px-4 py-3 font-semibold">Short Description</th>
                  <th className="px-4 py-3 font-semibold">Price / Night</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, index) => (
                  <tr
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className="cursor-pointer border-t border-gray-100  text-text-muted transition-colors hover:bg-primary/5"
                  >
                    <td className="p-4 font-semibold sm:px-6">{index + 1}</td>
                    <td className="p-4 whitespace-nowrap font-semibold">
                      {room.roomType}
                    </td>
                    <td className="p-4 max-w-50 truncate">
                      {room.shortDescription}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {formatCurrency(room.pricePerNight)}
                    </td>
                    <td
                      className="p-4"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedRoomId(room.id)}
                          aria-label={`View ${room.roomType} details`}
                          className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10"
                        >
                          <FiEye size={18} />
                        </button>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={room.isAvailable}
                            disabled={toggleAvailability.isPending}
                            onChange={() => handleAvailabilityChange(room)}
                            aria-label={`Toggle ${room.roomType} availability`}
                          />
                          <span className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-primary peer-disabled:opacity-50" />
                          <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedRoomId(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl space-y-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-primary-dark">
                Room Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedRoomId(null)}
                aria-label="Close room details"
                className="rounded-lg p-2 text-text-muted hover:bg-gray-100 hover:text-text"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {selectedRoom.images.length ? (
                selectedRoom.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative h-32 overflow-hidden rounded-xl bg-gray-100"
                  >
                    <Image
                      src={image}
                      alt={`${selectedRoom.roomType} image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-full py-8 text-center text-text-muted">
                  No images available.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-primary/10 p-4">
                <p className="text-sm text-text-muted">Room Type</p>
                <p className="mt-1 font-semibold text-text">
                  {selectedRoom.roomType}
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 p-4">
                <p className="text-sm text-text-muted">Price per night</p>
                <p className="mt-1 font-semibold text-text">
                  {formatCurrency(selectedRoom.pricePerNight)}
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 p-4">
                <p className="text-sm text-text-muted">Maximum guests</p>
                <p className="mt-1 flex items-center gap-2 font-semibold text-text">
                  <FiUsers /> {selectedRoom.maxGuests}
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 p-4">
                <p className="text-sm text-text-muted">Availability</p>
                <p
                  className={`mt-1 font-semibold ${selectedRoom.isAvailable ? "text-green-600" : "text-red-500"}`}
                >
                  {selectedRoom.isAvailable ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text">Short Description</h3>
                <p className="mt-1 leading-6 text-text-muted">
                  {selectedRoom.shortDescription}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text">Description</h3>
                <p className="mt-1 leading-6 text-text-muted">
                  {selectedRoom.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text">Amenities</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedRoom.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-primary/10 px-3 py-1 text-primary-dark"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <MainButton type="button" onClick={() => setSelectedRoomId(null)}>
                Close
              </MainButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
