import { z } from "zod";

export const createReviewSchema = z.object({
    propertyId: z.uuid({
        message: "Invalid property ID"
    }),

    rating: z.number({
        required_error: "Rating is required"
    }).min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),

    comment: z.string().optional()
});