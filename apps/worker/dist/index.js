"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const convert_1 = require("./routes/convert");
const news_1 = require("./routes/news");
const scores_1 = require("./routes/scores");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", service: "BetForge Engine" });
});
app.use("/api/convert", convert_1.convertRouter);
app.use("/api/news", news_1.newsRouter);
app.use("/api/scores", scores_1.scoresRouter);
app.listen(PORT, () => {
    console.log(`⚡ BetForge Engine running on port ${PORT}`);
});
