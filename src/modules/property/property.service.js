import { propertyRepository } from "./property.repository.js";
import { AppError } from "../../utils/AppError.js";

export const createPropertyService = async ({ userId, data }) => {
    return propertyRepository.create({
        ...data,
        ownerId: userId
    });
};

export const getPropertyByIdService = async (id) => {
    const property = await propertyRepository.findById(id);

    if (!property) {
        throw new AppError({
            message: "Property not found",
            statusCode: 404,
            code: "PROPERTY_NOT_FOUND"
        });
    }

    return property;
};

export const listPropertyService = async (query) => {
    const { city, minPrice, maxPrice, page, limit } = query;

    const skip = (page - 1) * limit;

    const where = {
        city: city || undefined,
        price: {
            gte: minPrice ?? undefined,
            lte: maxPrice ?? undefined,
        }
    };

    return propertyRepository.list(where, skip, limit);
};

export const updatePropertyService = async ({ userId, propertyId, data }) => {
    const property = await propertyRepository.findById(propertyId);

    if (!property) {
        throw new AppError({
            message: "Property not found",
            statusCode: 404,
            code: "PROPERTY_NOT_FOUND"
        });
    }

    if (property.ownerId !== userId) {
        throw new AppError({
            message: "Forbidden",
            statusCode: 403,
            code: "FORBIDDEN"
        });
    }

    const updateData = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.price !== undefined) updateData.price = data.price;

    return propertyRepository.update(propertyId, updateData);
};

export const deletePropertyService = async ({ userId, propertyId }) => {
    const property = await propertyRepository.findById(propertyId);

    if (!property) {
        throw new AppError({
            message: "Property not found",
            statusCode: 404,
            code: "PROPERTY_NOT_FOUND"
        });
    }

    if (property.ownerId !== userId) {
        throw new AppError({
            message: "You are not authorized to delete this property",
            statusCode: 401,
            code: "UNAUTHORIZED"
        });
    }

    return propertyRepository.delete(propertyId);
};