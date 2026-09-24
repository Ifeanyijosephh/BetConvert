import { Router } from "express";
import { listAdapters } from "../adapters/registry";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    bookmakers: listAdapters(),
  });
});
