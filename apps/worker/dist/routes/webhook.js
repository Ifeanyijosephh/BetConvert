"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRouter = void 0;
const express_1 = require("express");
exports.webhookRouter = (0, express_1.Router)();
exports.webhookRouter.post("/pocketfi", (_req, res) => {
    res.json({ received: true });
});
