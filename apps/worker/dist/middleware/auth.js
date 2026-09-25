"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireWorkerKey = requireWorkerKey;
const config_1 = require("../config");
function requireWorkerKey(req, res, next) {
    const provided = req.header("x-api-key");
    if (!provided || provided !== config_1.config.WORKER_API_KEY) {
        if (config_1.config.NODE_ENV === "development") {
            next();
            return;
        }
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    next();
}
