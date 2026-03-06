import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createBookingSchema, listBookingSchema } from "./booking.validation.js";
import { createBooking, getBookingById, listBookings } from "./booking.controller.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createBookingSchema, "body"), createBooking);
router.get("/:id", authMiddleware, getBookingById);
router.get("/", authMiddleware, validate(listBookingSchema, "query"), listBookings);

export default router;