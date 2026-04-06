import { success } from "../../utils/response.js";
import { createReviewService, deleteReviewService, getReviewsService } from "./review.service.js";

export const createReview = async (req, res, next) => {
    try {
        const review = await createReviewService({
            userId: req.user.id,
            data: req.body
        });

        return success(res, review, "Review created successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await getReviewsService(req.params.propertyId);

        return success(res, reviews, "Reviews fetched successfully", 200);
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        await deleteReviewService({
            userId: req.user.id,
            reviewId: req.params.id
        });

        return success(res, null, "Review deleted successfully", 200);
    } catch (error) {
        next(error);
    }
};