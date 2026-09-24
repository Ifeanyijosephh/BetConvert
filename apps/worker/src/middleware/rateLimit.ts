import { Request, Response, NextFunction } from "express";

export function rateLimitPerUser(_req: Request, _res: Response, next: NextFunction): void {
  next();
}
