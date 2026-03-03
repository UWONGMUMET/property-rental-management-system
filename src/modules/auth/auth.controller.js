import { loginSchema, refreshTokenSchema, registerSchema } from "./auth.validation.js"
import { loginService, logoutService, refreshTokenService, registerService } from "./auth.service.js"
import { success } from "../../utils/response.js";

export const register = async (req, res, next) => {
    try {
        const data = registerSchema.parse(req.body);
        const result = await registerService(data);

        return success(res, result, "User registered successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const data = loginSchema.parse(req.body);
        const result = await loginService(data);

        return success(res, result, "User logged in successfully", 200);
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const data = refreshTokenSchema.parse(req.body);
        const result = await refreshTokenService(data);

        return success(res, result, "Token refreshed successfully", 200);
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const data = refreshTokenSchema.parse(req.body);
        const result = await logoutService(data);

        return success(res, result, "User logged out successfully", 200);
    } catch (error) {
        next(error);
    }
}