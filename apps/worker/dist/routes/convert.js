import { Router } from "express";
import { z } from "zod";
import { runConversion } from "../engine/pipeline";
export const convertRouter = Router();
const convertRequestSchema = z.object({
    userId: z.string().uuid().optional(),
    sourceBookmaker: z.enum(["sportybet", "bet9ja", "xbet"]),
    sourceCode: z.string().min(3).max(50),
    destBookmaker: z.enum(["sportybet", "bet9ja", "xbet"]),
});
convertRouter.post("/", async (req, res, next) => {
    try {
        const parsed = convertRequestSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
            return;
        }
        const result = await runConversion(parsed.data);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
