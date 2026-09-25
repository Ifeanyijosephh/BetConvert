"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const shared_1 = require("@betconvert/shared");
const pipeline_1 = require("../engine/pipeline");
exports.convertRouter = (0, express_1.Router)();
exports.convertRouter.post("/", auth_1.requireAuth, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized access" });
            return;
        }
        // Zod Validation from @betconvert/shared
        const parsed = shared_1.convertRequestSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: "Invalid request payload", details: parsed.error.issues });
            return;
        }
        // Pass to Engine Pipeline
        const result = await (0, pipeline_1.processConversion)(userId, parsed.data);
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
