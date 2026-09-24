import { z } from "zod";
import { config as loadDotenv } from "dotenv";
loadDotenv();
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().int().positive().default(3001),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
    SUPABASE_URL: z.string().url().default("https://placeholder.supabase.co"),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).default("placeholder-key"),
    WORKER_API_KEY: z.string().min(1).default("placeholder-worker-secret-key-32chars"),
    SPORTYBET_API_BASE: z.string().url().default("https://www.sportybet.com/api"),
    BET9JA_API_BASE: z.string().url().default("https://sports.bet9ja.com/api"),
    XBET_API_BASE: z.string().url().default("https://1xbet.com/api"),
    POCKETFI_WEBHOOK_SIGNING_KEY: z.string().min(1).default("placeholder-signing-key"),
    BOOKMAKER_REQUEST_TIMEOUT_MS: z.coerce.number().int().positive().default(15000),
    BOOKMAKER_RETRY_MAX_ATTEMPTS: z.coerce.number().int().min(1).max(5).default(3),
});
export const config = envSchema.parse(process.env);
