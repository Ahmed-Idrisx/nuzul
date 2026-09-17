import { z } from "zod";

export const createHotelSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Hotel name must be at least 2 characters")
    .max(100, "Hotel name must be less than 100 characters"),

  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be less than 50 characters"),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),

  contact: z
    .string()
    .trim()
    .min(7, "Contact number is required")
    .max(20, "Contact number must be less than 20 characters"),

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

  facilities: z
    .array(z.string().trim().min(1))
    .min(1, "Please add at least one facility"),

  image: z.instanceof(File, {
    message: "Hotel image is required",
  }),
});

export type CreateHotelFormData = z.infer<typeof createHotelSchema>;
