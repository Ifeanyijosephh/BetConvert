"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const registry_1 = require("../adapters/registry");
exports.healthRouter = (0, express_1.Router)();
exports.healthRouter.get("/", (_req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        bookmakers: (0, registry_1.listAdapters)(),
    });
});
