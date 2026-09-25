"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = require("../infra/logger");
function errorHandler(err, _req, res, _next) {
    logger_1.logger.error({ error: err.message }, "Unhandled worker error");
    res.status(500).json({ error: "Internal server error" });
}
