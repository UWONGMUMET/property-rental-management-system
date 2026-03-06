import { prisma } from "../../config/prisma.js";

export const paymentRepository = {
    create: (data) =>
        prisma.payment.create({
            data
        }),
    
    findByBookingId: (bookingId) =>
        prisma.payment.findUnique({
            where: {
                bookingId
            }
        }),
    
        findById: (id) =>
        prisma.payment.findUnique({
            where: {
                id
            },
            include: {
                booking: true
            }
        }),
}