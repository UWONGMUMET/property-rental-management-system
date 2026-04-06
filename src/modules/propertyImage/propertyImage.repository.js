import { prisma } from "../../config/prisma.js";

export const propertyImageRepository = {

  create: (data) =>
    prisma.propertyImage.create({
      data
    }),

  findPropertyById: (id) =>
    prisma.property.findUnique({
      where: { id }
    }),

  findImagesByPropertyId: (propertyId) =>
    prisma.propertyImage.findMany({
      where: { propertyId },
      orderBy: {
        createdAt: "desc"
      }
    }),

  findImageById: (id) =>
    prisma.propertyImage.findUnique({
      where: { id }
    }),

  delete: (id) =>
    prisma.propertyImage.delete({
      where: { id }
    })
};