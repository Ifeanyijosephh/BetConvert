import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { z } from "zod";

const dirs = [
  process.cwd(),
  path.resolve(process.cwd(), "apps/worker"),
  path.resolve(process.cwd(), ".."),
  path.resolve(process.cwd(), "../.."),
];

for (const dir of dirs) {
  const envFile = path.join(dir, ".env");
  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile, override: true });
  }
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8080),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
  SUPABASE_URL: z.string().url().default("https://qlknohbyldsrvwwsfhvl.supabase.co"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).default("placeholder-key"),
  SUPABASE_SERVICE_KEY: z.string().min(1).default("placeholder-key"),
  WORKER_API_KEY: z.string().min(1).default("wgrlNYoDRkyuus26wZZZf"),
  SPORTSRC_BASE_URL: z.string().url().default("https://sportsrc.org"),
});

const parsed = envSchema.parse(process.env);

export const config = {
  ...parsed,
  env: parsed.NODE_ENV,
  port: parsed.PORT,
  supabaseUrl: process.env.SUPABASE_URL || parsed.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || parsed.SUPABASE_SERVICE_KEY,
  sportsrcBaseUrl: process.env.SPORTSRC_BASE_URL || parsed.SPORTSRC_BASE_URL,
};
