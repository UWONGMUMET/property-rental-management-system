import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createProperty, deleteProperty, getPropertyById, listProperty, updateProperty } from "./property.controller.js";
import { createPropertySchema, listPropertySchema, updatePropertySchema } from "./property.validation.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createPropertySchema, "body"), createProperty);
router.get("/", validate(listPropertySchema, "query"), listProperty);
router.get("/:id", getPropertyById);
router.put("/:id", authMiddleware, validate(updatePropertySchema, "body"), updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);

export default router;