import { prisma } from "../../config/prisma.js";

export const reviewRepository = {
    create: (data) =>
        prisma.review.create({
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                property: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        }),
    findByPropertyId: (propertyId) => 
        prisma.review.findMany({
            where: {
                propertyId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        }),
    
    findExisting: (userId, propertyId) =>
        prisma.review.findUnique({
            where: {
                userId_propertyId: {
                    userId,
                    propertyId
                }
            }
        }),

    findById: (id) =>
        prisma.review.findUnique({
            where: {
                id
            }
        }),
    
    delete: (id) => 
        prisma.review.delete({
            where: { id }
        })
};