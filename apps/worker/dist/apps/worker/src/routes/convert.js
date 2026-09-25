import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { convertRequestSchema } from "@betconvert/shared";
import { processConversion } from "../engine/pipeline";
export const convertRouter = Router();
convertRouter.post("/", requireAuth, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized access" });
            return;
        }
        // Zod Validation from @betconvert/shared
        const parsed = convertRequestSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: "Invalid request payload", details: parsed.error.issues });
            return;
        }
        // Pass to Engine Pipeline
        const result = await processConversion(userId, parsed.data);
        res.status(200).json({
            success: true,
            message: "Conversion successful",
            data: result
        });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});
