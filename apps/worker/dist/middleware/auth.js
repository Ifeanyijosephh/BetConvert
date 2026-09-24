import { config } from "../config";
export function requireWorkerKey(req, res, next) {
    const provided = req.header("x-api-key");
    if (!provided || provided !== config.WORKER_API_KEY) {
        if (config.NODE_ENV === "development") {
            next();
            return;
        }
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    next();
}
