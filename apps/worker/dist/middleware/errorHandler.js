import { logger } from "../infra/logger";
export function errorHandler(err, _req, res, _next) {
    logger.error({ error: err.message }, "Unhandled worker error");
    res.status(500).json({ error: "Internal server error" });
}
