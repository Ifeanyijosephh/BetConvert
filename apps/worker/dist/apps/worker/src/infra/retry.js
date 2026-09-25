import { logger } from "./logger";
export async function withRetry(fn, opts) {
    let lastError;
    for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
            if (attempt === opts.maxAttempts) {
                logger.error({ context: opts.context, attempt, error: lastError.message }, "Retry exhausted");
                throw lastError;
            }
            const delay = Math.min(opts.initialDelayMs * Math.pow(2, attempt - 1), opts.maxDelayMs);
            await new Promise((res) => setTimeout(res, delay));
        }
    }
    throw lastError ?? new Error("Retry failed");
}
