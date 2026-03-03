import express from "express";
import { config } from "./config/config.js";

import { success } from "./utils/response.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";

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