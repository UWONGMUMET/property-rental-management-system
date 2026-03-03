import { AppError } from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
    try {
        const validated = schema.parse(req.body);
        req.body = validated;
        next();
    } catch (error) {
        next(
            new AppError({
                message: "Validation error",
                statusCode: 400,
                code: "VALIDATION_ERROR",
                details: error.errors
            })
        )
    }
}