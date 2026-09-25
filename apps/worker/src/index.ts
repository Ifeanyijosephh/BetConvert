import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { convertRouter } from "./routes/convert";
import { newsRouter } from "./routes/news";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "BetForge Engine" });
});

app.use("/api/convert", convertRouter);
app.use("/api/news", newsRouter);

app.listen(PORT, () => {
  console.log(`⚡ BetForge Engine running on port ${PORT}`);
});
