import { prisma } from "../../config/prisma.js";

export const bookingRepository = {
    create: (data) => 
        prisma.booking.create({
            data
        }),
    findById: (id) => 
        prisma.booking.findUnique({
            where: {
                id
            },
            include: {
                property: true
            }
        }),
    findMany: ({ where, skip, take }) => 
        prisma.booking.findMany({
            where,
            skip,
            take,
            include: {
                property: true
            },
            orderBy: {
                createdAt: "desc"
            }
        }),

    count: (where) => 
        prisma.booking.count({
            where
        }),
};