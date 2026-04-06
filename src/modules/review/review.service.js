import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { reviewRepository } from "./review.repository.js";

export const createReviewService = async ({ userId, data }) => {
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

    const hasBooked = await prisma.booking.findFirst({
        where: {
            userId,
            propertyId: data.propertyId,
            status: "COMPLETED"
        }
    });

    if (!hasBooked) {
        throw new AppError({
            message: "You can only review properties you have booked",
            statusCode: 403,
            code: "FORBIDDEN"
        });
    };

    const existing = await reviewRepository.findExisting(userId, data.propertyId);

    if (existing) {
        throw new AppError({
            message: "You have already reviewed this property",
            statusCode: 400,
            code: "REVIEW_ALREADY_EXISTS"
        });
    }

    return reviewRepository.create({
        userId,
        propertyId: data.propertyId,
        rating: data.rating,
        comment: data.comment
    });
};

export const getReviewsService = async (propertyId) => {
    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    });

    if (!property) {
        throw new AppError({
            message: "Property not found",
            statusCode: 404,
            code: "PROPERTY_NOT_FOUND"
        });
    }

    return reviewRepository.findByPropertyId(propertyId);
};

export const deleteReviewService = async ({ userId, reviewId }) => {
    const review = await reviewRepository.findById(reviewId);

    if (!review) {
        throw new AppError({
            message: "Review not found",
            statusCode: 404,
            code: "REVIEW_NOT_FOUND"
        });
    }

    if (review.userId !== userId) {
        throw new AppError({
            message: "You can only delete your own reviews",
            statusCode: 403,
            code: "FORBIDDEN"
        });
    }

    return reviewRepository.delete(reviewId);
}