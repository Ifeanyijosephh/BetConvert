import { Router, Request, Response } from "express";
import { fetchSportsrcNews } from "../services/sportsrc";

export const newsRouter = Router();

/**
 * GET /api/news
 * Query: category?, q?, limit?
 * Proxies sportsrc.org → BetForge NewsArticle[]
 */
newsRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const category = typeof req.query.category === "string" ? req.query.category : "football";
    const q = typeof req.query.q === "string" ? req.query.q : undefined;
    const limitRaw = typeof req.query.limit === "string" ? parseInt(req.query.limit, 10) : 12;
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 30) : 12;

    const articles = await fetchSportsrcNews({ category, q, limit });

    res.status(200).json({
      success: true,
      source: "sportsrc.org",
      count: articles.length,
      data: articles,
    });
  } catch (err: any) {
    res.status(502).json({
      success: false,
      error: err?.message || "Failed to fetch news from sportsrc.org",
      data: [],
    });
  }
});
