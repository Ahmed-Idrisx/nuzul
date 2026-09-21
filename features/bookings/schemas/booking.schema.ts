import { z } from "zod";

const bookingPayloadSchema = z
  .object({
    roomId: z.string().trim().min(1, "Room is required"),

    checkInDate: z.string().min(1, "Check-in date is required"),

    checkOutDate: z.string().min(1, "Check-out date is required"),

    guests: z
      .number({ message: "Number of guests is required" })
      .int("Number of guests must be a whole number")
      .min(1, "At least one guest is required"),
  })
  .superRefine((data, context) => {
    const checkInDate = new Date(data.checkInDate);
    const checkOutDate = new Date(data.checkOutDate);

    if (Number.isNaN(checkInDate.getTime())) {
      context.addIssue({
        code: "custom",
        path: ["checkInDate"],
        message: "Please provide a valid check-in date",
      });
    }

    if (Number.isNaN(checkOutDate.getTime())) {
      context.addIssue({
        code: "custom",
        path: ["checkOutDate"],
        message: "Please provide a valid check-out date",
      });
    }

    if (
      !Number.isNaN(checkInDate.getTime()) &&
      !Number.isNaN(checkOutDate.getTime()) &&
      checkOutDate <= checkInDate
    ) {
      context.addIssue({
        code: "custom",
        path: ["checkOutDate"],
        message: "Check-out date must be after check-in date",
      });
    }
  });

export const checkAvailabilitySchema = bookingPayloadSchema;
export const createBookingSchema = bookingPayloadSchema;

export type CheckAvailabilityFormData = z.infer<typeof checkAvailabilitySchema>;
export type CreateBookingFormData = z.infer<typeof createBookingSchema>;

export const heroSearchSchema = z.object({
  destination: z.string().trim().min(1, "Choose a destination"),
  checkInDate: z.string().optional(),
  checkOutDate: z.string().optional(),
  guests: z.number().int().min(1).max(20),
});
export type HeroSearchFormData = z.infer<typeof heroSearchSchema>;
