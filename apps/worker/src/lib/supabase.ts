import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Find and load .env from current directory up to root
const findAndLoadEnv = () => {
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
};

findAndLoadEnv();

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://qlknohbyldsrvwwsfhvl.supabase.co";

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";

if (supabaseServiceKey && supabaseServiceKey !== "placeholder-key") {
  console.log(`✅ Supabase credentials loaded (${supabaseServiceKey.slice(0, 12)}...)`);
} else {
  console.warn("⚠️ SUPABASE_SERVICE_KEY is missing or empty.");
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || "placeholder-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
