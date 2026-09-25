"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const zod_1 = require("zod");
const dirs = [
    process.cwd(),
    path_1.default.resolve(process.cwd(), "apps/worker"),
    path_1.default.resolve(process.cwd(), ".."),
    path_1.default.resolve(process.cwd(), "../.."),
];
for (const dir of dirs) {
    const envFile = path_1.default.join(dir, ".env");
    if (fs_1.default.existsSync(envFile)) {
        dotenv_1.default.config({ path: envFile, override: true });
    }
}
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("development"),
    PORT: zod_1.z.coerce.number().int().positive().default(8080),
    LOG_LEVEL: zod_1.z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
    SUPABASE_URL: zod_1.z.string().url().default("https://qlknohbyldsrvwwsfhvl.supabase.co"),
    SUPABASE_SERVICE_ROLE_KEY: zod_1.z.string().min(1).default("placeholder-key"),
    SUPABASE_SERVICE_KEY: zod_1.z.string().min(1).default("placeholder-key"),
    WORKER_API_KEY: zod_1.z.string().min(1).default("wgrlNYoDRkyuus26wZZZf"),
    SPORTSRC_BASE_URL: zod_1.z.string().url().default("https://sportsrc.org"),
});
const parsed = envSchema.parse(process.env);
exports.config = {
    ...parsed,
    env: parsed.NODE_ENV,
    port: parsed.PORT,
    supabaseUrl: process.env.SUPABASE_URL || parsed.SUPABASE_URL,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || parsed.SUPABASE_SERVICE_KEY,
    sportsrcBaseUrl: process.env.SPORTSRC_BASE_URL || parsed.SPORTSRC_BASE_URL,
};
