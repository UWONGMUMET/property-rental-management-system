import express from "express";
import { login, logout, refreshToken, register } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, refreshTokenSchema, registerSchema } from "./auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema, "body"), register);
router.post("/login", validate(loginSchema, "body"), login);
router.post("/refresh", validate(refreshTokenSchema, "body"), refreshToken);
router.post("/logout", validate(refreshTokenSchema, "body"), logout);

export default router;