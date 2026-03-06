import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPayment, getPaymentById } from "./payment.controller.js";
import { createPaymentSchema } from "./payment.validation.js";


const router = express.Router();

router.post("/", authMiddleware, validate(createPaymentSchema), createPayment);
router.get("/:id", authMiddleware, getPaymentById);

export default router;