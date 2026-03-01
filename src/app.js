import express from "express";
import { config } from "./config/config.js";
import { success } from "./utils/response.js";

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

app.listen(config.port, () => {
    console.log([
        "Server running",
        `Environment: ${config.nodeEnv}`,
        `Port: ${config.port}`,
        `Started at: ${new Date().toISOString()}`
    ].join("\n"));
});

export default app;