import express from "express";
import helmet from "helmet";
import { config } from "./config";
import { logger } from "./infra/logger";
import { requireWorkerKey } from "./middleware/auth";
import { errorHandler } from "./middleware/errorHandler";
import { convertRouter } from "./routes/convert";
import { healthRouter } from "./routes/health";
import { webhookRouter } from "./routes/webhook";

const app = express();

app.use(helmet());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/webhook", webhookRouter);

app.use(requireWorkerKey);
app.use("/convert", convertRouter);

app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`BetConvert worker listening on port ${config.PORT}`);
});
