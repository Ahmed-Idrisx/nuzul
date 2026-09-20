import { z } from "zod";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => file.type.startsWith("image/"),
    "Only image files are allowed",
  )
  .refine((file) => file.size <= MAX_IMAGE_SIZE, "Image must be less than 2MB");
export const createRoomSchema = z.object({
  roomType: z
    .string()
    .trim()
    .min(2, "Room type must be at least 2 characters")
    .max(100, "Room type must be less than 100 characters"),

  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description must be less than 200 characters"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be less than 2000 characters"),

  amenities: z
    .array(z.string().trim().min(1))
    .min(1, "Please add at least one amenity"),

  pricePerNight: z
    .number({ message: "Price per night is required" })
    .positive("Price per night must be greater than 0")
    .multipleOf(0.01),

  maxGuests: z
    .number({ message: "Maximum guests is required" })
    .int("Maximum guests must be a whole number")
    .min(1, "Maximum guests must be at least 1")
    .max(20, "Maximum guests cannot exceed 20"),

  images: z
    .array(imageSchema)
    .min(1, "Please add at least one room image")
    .max(4, "You can upload up to 4 images"),
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;
