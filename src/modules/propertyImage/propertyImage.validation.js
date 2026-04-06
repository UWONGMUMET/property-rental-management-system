import { z } from "zod";

export const createPropertyImageSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Invalid URL"),
});

export const propertyImageIdSchema = z.object({
  id: z.uuid({
    message: "Invalid property image ID"
  })
});