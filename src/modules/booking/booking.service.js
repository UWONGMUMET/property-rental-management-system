import { bookingRepository } from "./booking.repository.js";
import { AppError } from "../../utils/AppError.js";
import { prisma } from "../../config/prisma.js";

export const createBookingService = async ({ userId, data }) => {
    return await prisma.$transaction(async (tx) => {
        const property = await tx.property.findUnique({
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

        const overlappingBooking = await tx.booking.findFirst({
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

        if (overlappingBooking) {
            throw new AppError({
                message: "Property is already booked for the selected dates",
                statusCode: 400,
                code: "BOOKING_CONFLICT"
            });
        }

        const days = Math.ceil((new Date(data.endDate) - new Date(data.startDate)) / (1000 * 60 * 60 * 24));
        if (days <= 0) {
            throw new AppError({
                message: "End date must be after start date",
                statusCode: 400,
                code: "INVALID_DATES"
            });
        }

        const pricePerNight = Number(property.price);
        const totalPrice = days * pricePerNight;

        return await tx.booking.create({
            data: {
                userId,
                propertyId: data.propertyId,
                startDate: data.startDate,
                endDate: data.endDate,
                totalPrice
            }
        });
    })
}

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