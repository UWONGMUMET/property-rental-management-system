import { prisma } from "../../config/prisma.js";

export const propertyRepository = {
    create: (data) =>
        prisma.property.create({
            data
        }),
    findById: (id) =>
        prisma.property.findUnique({
            where: {
                id
            },
        }),
    list: (where, skip, take) =>
        prisma.property.findMany({
            where,
            skip,
            take,
            orderBy: {
                createdAt: "desc"
            },
        }),
    update: (id, data) => 
        prisma.property.update({
            where: {
                id
            },
            data
        }),
    delete: (id) =>
        prisma.property.delete({
            where: {
                id
            }
        }),
};