import { Router } from "express";

export const webhookRouter = Router();

webhookRouter.post("/pocketfi", (_req, res) => {
  res.json({ received: true });
});
