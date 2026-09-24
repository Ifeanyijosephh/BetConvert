import { Request, Response, NextFunction } from "express";
import { logger } from "../infra/logger";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  logger.error({ error: err.message }, "Unhandled worker error");
  res.status(500).json({ error: "Internal server error" });
}
