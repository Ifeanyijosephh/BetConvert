import { logger } from "../infra/logger.js";
export function errorHandler(err, req, res, _next) {
    logger.error({ path: req.path, method: req.method, error: err.message, stack: err.stack }, "Unhandled error in request");
    res.status(500).json({
        error: "Internal server error",
        // Don't leak stack traces to clients
    });
}
