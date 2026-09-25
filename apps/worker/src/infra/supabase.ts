import { createClient } from "@supabase/supabase-js";
import { config } from "../config";

export const supabaseAdmin = createClient(
  config.supabaseUrl,
  config.supabaseServiceKey || "placeholder-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
