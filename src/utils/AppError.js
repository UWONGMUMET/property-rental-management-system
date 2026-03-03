export class AppError extends Error {
    constructor({
        message = "Internal Server Error",
        statusCode = 500,
        code = "INTERNAL_SERVER_ERROR",
        details = null
    }) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;

        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
    toJSON() {
        return {
            success: false,
            status: this.status,
            message: this.message,
            code: this.code,
            details: this.details,
            timestamp: new Date().toISOString(),
        }
    };
};