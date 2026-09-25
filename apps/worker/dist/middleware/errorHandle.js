"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_js_1 = require("../infra/logger.js");
function errorHandler(err, req, res, _next) {
    logger_js_1.logger.error({ path: req.path, method: req.method, error: err.message, stack: err.stack }, "Unhandled error in request");
    res.status(500).json({
        error: "Internal server error",
        // Don't leak stack traces to clients
    });
}
