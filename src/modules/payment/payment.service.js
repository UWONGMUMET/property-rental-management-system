import { paymentRepository } from "./payment.repository.js";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";


export const createPaymentService = async ({ userId, bookingId }) => {
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        }
    });

    if (!booking) {
        throw new AppError({
            message: 'Booking not found',
            statusCode: 404,
            code: "BOOKING_NOT_FOUND"
        });
    }

    if (booking.userId !== userId) {
        throw new AppError({
            message: 'You are not authorized to create a payment for this booking',
            statusCode: 401,
            code: "UNAUTHORIZED"
        });
    }

    const existingPayment = await paymentRepository.findByBookingId(bookingId);

    if (existingPayment) {
        throw new AppError({
            message: 'Payment already exists for this booking',
            statusCode: 400,
            code: "PAYMENT_ALREADY_EXISTS"
        });
    }

    const payment = await paymentRepository.create({
        bookingId,
        amount: booking.totalPrice,
        status: "PAID"
    })

    await prisma.booking.update({
        where: {
            id: bookingId
        },
        data: {
            status: "CONFIRMED"
        }
    })

    return payment;
};

export const getPaymentByIdService = async (id) => {
    const payment = await paymentRepository.findById(id);

    if (!payment) {
        throw new AppError({
            message: 'Payment not found',
            statusCode: 404,
            code: "PAYMENT_NOT_FOUND"
        });
    }

    return payment;
}