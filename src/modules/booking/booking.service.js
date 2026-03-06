import { bookingRepository } from "./booking.repository.js";
import { AppError } from "../../utils/AppError.js";
import { prisma } from "../../config/prisma.js";

export const createBookingService = async ({ userId, data }) => {
    const property = await prisma.property.findUnique({
        where: {
            id: data.propertyId
        }
    });

    if (!property) {
        throw new AppError({
            message: "Property not found",
            statusCode: 404,
            code: "PROPERTY_NOT_FOUND"
        });
    }

    const overlappingBookings = await prisma.booking.findFirst({
        where: {
            propertyId: data.propertyId,
            status: {
                in: ["PENDING", "CONFIRMED"]
            },
            startDate: {
                lte: data.endDate
            },
            endDate: {
                gte: data.startDate
            }
        }
    });

    if (overlappingBookings) {
        throw new AppError({
            message: "Property is already booked for this period",
            statusCode: 400,
            code: "PROPERTY_ALREADY_BOOKED"
        });
    }

    const days = (data.endDate - data.startDate) / (1000 * 60 * 60 * 24);
    const pricePerNight = Number(property.price);
    const totalPrice = days * pricePerNight;

    return bookingRepository.create({
        userId,
        propertyId: data.propertyId,
        startDate: data.startDate,
        endDate: data.endDate,
        totalPrice
    });
};

export const getBookingByIdService = async (id) => {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
        throw new AppError({
            message: "Booking not found",
            statusCode: 404,
            code: "BOOKING_NOT_FOUND"
        });
    }
    return booking;
};

export const listBookingService = async (query) => {
    const { status, propertyId, page, limit } = query;

    const where = {
        status: status || undefined,
        propertyId: propertyId || undefined
    };

    const skip = (page - 1) * limit;

    const bookings = await bookingRepository.findMany({
        where,
        skip,
        take: limit
    });
    const count = await bookingRepository.count(where);

    return {
        data: bookings,
        meta: {
            page,
            limit,
            total: count,
            totalPage: Math.ceil(count / limit)
        }
    };
};