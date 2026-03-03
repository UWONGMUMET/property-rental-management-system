import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string" 
    })
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),

    email: z.email({
        required_error: "Email is required",
        invalid_type_error: "Invalid email"
    })
    .max(255, "Email must be at most 255 characters"),

    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 255 characters"),
}).strict();

export const loginSchema = z.object({
    email: z.email({
        required_error: "Email is required",
        invalid_type_error: "Invalid email"
    }),

    password: z.string({
        required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
}).strict();

export const refreshTokenSchema = z.object({
    refreshToken: z.string({
        required_error: "Refresh token is required",
    }).
    min(10, "Refresh token must be at least 10 characters"),
}).strict();