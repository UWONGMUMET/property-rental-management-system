import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createReviewSchema } from "./review.validation.js";
import { createReview, deleteReview, getReviews } from "./review.controller.js";

const router = express.Router();
router.post("/", authMiddleware, validate(createReviewSchema, "body"), createReview);
router.get("/property/:propertyId", getReviews);
router.delete("/:id", authMiddleware, deleteReview);

export default router;