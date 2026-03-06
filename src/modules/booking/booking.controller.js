import { success } from "../../utils/response.js";
import { createBookingService, getBookingByIdService, listBookingService } from "./booking.service.js";
import { createBookingSchema } from "./booking.validation.js"

export const createBooking = async (req, res, next) => {
    try {
        const data = createBookingSchema.parse(req.body);
        const booking = await createBookingService({
            userId: req.user.id,
            data: data
    })

        return success(res, booking, "Booking created successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const getBookingById = async (req, res, next) => {
    try {
        const booking = await getBookingByIdService(req.params.id);
        return success(res, booking, "Success", 200);
    } catch (err) {
        next(err);
    }
};

export const listBookings = async (req, res, next) => {
    try {
        const bookings = await listBookingService(req.validatedQuery);
        return success(res, bookings, "Success", 200);
    } catch (err) {
        next(err);
    }
};