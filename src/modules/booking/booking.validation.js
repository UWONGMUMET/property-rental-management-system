import { z } from "zod";

export const createBookingSchema = z.object({
    propertyId: z.uuid({
        message: "Property ID must be a valid UUID",
        required_error: "Property ID is required",
        invalid_type_error: "Property ID must be a string"
    }),

    startDate: z.coerce.date({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a string"
    }),

    endDate: z.coerce.date({
        required_error: "End date is required",
        invalid_type_error: "End date must be a string"
    }),
}).refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"]
});

export const listBookingSchema = z.object({
    status: z.enum([
        "PENDING", 
        "CONFIRMED", 
        "CANCELLED",
        "COMPLETED"
    ]).optional(),

    propertyId: z.uuid().optional(),
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(10),
});