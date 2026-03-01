export const success = (res, data = null, message = "OK", statusCode = 200, meta = null) => {
    const response = {
        success: true,
        message,
        timestamp: new Date().toISOString(),
    };

    if (data !== null) {
        response.data = data;
    }
    if (meta !== null) {
        response.meta = meta;
    }
    return res.status(statusCode).json(response);
}