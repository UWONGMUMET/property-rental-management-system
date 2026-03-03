import { logger } from "../config/logger.js";
import { AppError } from "../utils/AppError.js";
import { config } from "../config/config.js";

export const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof AppError)) {
        error = new AppError({
            message: "Internal server error",
            statusCode: 500,
            code: "INTERNAL_SERVER_ERROR"
        });
    }
    logger.error({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        method: req.method,
        path: req.originalUrl,
        stack: config.nodeEnv === "development" ? err.stack : undefined,
    });

    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        code: error.code,
        details: error.details,
        ...(config.nodeEnv === "development" && { stack: err.stack }),
        timestamp: new Date().toISOString(),
    });

}