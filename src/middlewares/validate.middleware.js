import { AppError } from "../utils/AppError.js";

export const validate = (schema, source = "body") => (req, res, next) => {
    try {
        const parsed = schema.parse(req[source]);
        if (source === "query") {
            req.validatedQuery = parsed;
        } else if (source === "body") {
            req.body = parsed;
        } else if (source === "params") {
            req.validatedParams = parsed;
        }

        next();
    } catch (error) {
        console.log("VALIDATION ERROR RAW:", error);
        
        next(
            new AppError({
                message: "Validation error",
                statusCode: 400,
                code: "VALIDATION_ERROR",
                details: error.issues || error.message || null
            })
        );
    }
};