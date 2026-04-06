import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";

import {
  createPropertyImage,
  getPropertyImages,
  deletePropertyImage
} from "./propertyImage.controller.js";

import { createPropertyImageSchema } from "./propertyImage.validation.js";

const router = express.Router();

router.post(
  "/properties/:propertyId/images",
  authMiddleware,
  validate(createPropertyImageSchema, "body"),
  createPropertyImage
);

router.get(
  "/properties/:propertyId/images",
  getPropertyImages
);

router.delete(
  "/property-images/:id",
  authMiddleware,
  deletePropertyImage
);

export default router;