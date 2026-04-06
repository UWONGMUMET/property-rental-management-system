import express from "express";
import { config } from "./config/config.js";

import { success } from "./utils/response.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

import authRoutes from "./modules/auth/auth.routes.js";
import propertyRoutes from "./modules/property/property.routes.js";
import bookingRoutes from "./modules/booking/booking.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js";
import propertyImageRoutes from "./modules/propertyImage/propertyImage.routes.js";
import reviewRoutes from "./modules/review/review.routes.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
    return success(
        res,
        {
            uptime: process.uptime(),
            timestamp: new Date(),
            environment: config.nodeEnv
        },
        "Server is running",
        200
    )
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/property-images", propertyImageRoutes);
app.use("/api/v1/reviews", reviewRoutes);

app.use(notFoundMiddleware);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log([
        "Server running",
        `Environment: ${config.nodeEnv}`,
        `Port: ${config.port}`,
        `Started at: ${new Date().toISOString()}`
    ].join("\n"));
});

export default app;