"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoresRouter = void 0;
const express_1 = require("express");
const livescores_1 = require("../services/livescores");
exports.scoresRouter = (0, express_1.Router)();
exports.scoresRouter.get("/", async (_req, res) => {
    try {
        const matches = await (0, livescores_1.fetchLiveScores)();
        res.status(200).json({
            success: true,
            count: matches.length,
            data: matches,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err?.message || "Failed to fetch live scores",
            data: [],
        });
    }
});
