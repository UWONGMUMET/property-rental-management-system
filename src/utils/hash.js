import bcrypt from "bcrypt";
import { AppError } from "./AppError.js";
import { config } from "../config/config.js";

export const hashPassword = async (password) => {
    if (!password) {
        throw new AppError({
            message: "Password is required",
            statusCode: 400,
            code: "MISSING_PASSWORD"
        });
    }

    return bcrypt.hash(password, config.saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
    if (!password || !hashedPassword) {
        throw new AppError({
            message: "Password and hashed password are required",
            statusCode: 400,
            code: "MISSING_PASSWORD"
        });
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
        throw new AppError({
            message: "Password does not match",
            statusCode: 401,
            code: "PASSWORD_MISMATCH"
        });
    }

    return isMatch;
}