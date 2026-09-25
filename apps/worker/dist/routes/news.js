"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsRouter = void 0;
const express_1 = require("express");
const sportsrc_1 = require("../services/sportsrc");
exports.newsRouter = (0, express_1.Router)();
/**
 * GET /api/news
 * Query: category?, q?, limit?
 * Proxies sportsrc.org → BetForge NewsArticle[]
 */
exports.newsRouter.get("/", async (req, res) => {
    try {
        const category = typeof req.query.category === "string" ? req.query.category : "football";
        const q = typeof req.query.q === "string" ? req.query.q : undefined;
        const limitRaw = typeof req.query.limit === "string" ? parseInt(req.query.limit, 10) : 12;
        const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 30) : 12;
        const articles = await (0, sportsrc_1.fetchSportsrcNews)({ category, q, limit });
        res.status(200).json({
            success: true,
            source: "sportsrc.org",
            count: articles.length,
            data: articles,
        });
    }
    catch (err) {
        res.status(502).json({
            success: false,
            error: err?.message || "Failed to fetch news from sportsrc.org",
            data: [],
        });
    }
});
