import { z } from "zod";

export const createPropertySchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    })
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),

    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string"
    })
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters"),

    city: z.string({
        required_error: "City is required",
        invalid_type_error: "City must be a string"
    })
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be at most 100 characters"),

    address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string"
    })
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must be at most 255 characters"),

    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    })
    .positive("Price must be a positive number")
}).strict();

export const listPropertySchema = z.object({
    city: z.string().optional(),

    minPrice: z.coerce.number().optional(),

    maxPrice: z.coerce.number().optional(),

    page: z.coerce.number().optional().default(1),

    limit: z.coerce.number().optional().default(10),
});

export const updatePropertySchema = createPropertySchema.partial();