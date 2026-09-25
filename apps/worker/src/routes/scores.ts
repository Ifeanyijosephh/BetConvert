import { Router, Request, Response } from "express";
import { fetchLiveScores } from "../services/livescores";

export const scoresRouter = Router();

scoresRouter.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const matches = await fetchLiveScores();
    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err?.message || "Failed to fetch live scores",
      data: [],
    });
  }
});
