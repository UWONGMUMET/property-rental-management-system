import { paymentRepository } from "./payment.repository.js";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const createPaymentService = async ({ userId, bookingId }) => {
    return await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.findUnique({
            where: {
                id: bookingId
            }
        });

        if (!booking) {
            throw new AppError({
                message: "Booking not found",
                statusCode: 404,
                code: "BOOKING_NOT_FOUND"
            });
        }

        if (booking.userId !== userId) {
            throw new AppError({
                message: "Forbidden",
                statusCode: 403,
                code: "FORBIDDEN"
            });
        }

        let payment;
        try {
            payment = await tx.payment.create({
                data: {
                    bookingId,
                    amount: booking.totalPrice,
                    status: "PAID"
                }
            });
        } catch (error) {
            throw new AppError({
                message: "Payment already exists",
                statusCode: 400,
                code: "PAYMENT_ALREADY_EXISTS"
            });
        }

        await tx.booking.update({
            where: {
                id: bookingId
            },
            data: {
                status: "COMPLETED"
            }
        });

        return payment;
    });
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