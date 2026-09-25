"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAdmin = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Find and load .env from current directory up to root
const findAndLoadEnv = () => {
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
};
findAndLoadEnv();
const supabaseUrl = process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    "https://qlknohbyldsrvwwsfhvl.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "";
if (supabaseServiceKey && supabaseServiceKey !== "placeholder-key") {
    console.log(`✅ Supabase credentials loaded (${supabaseServiceKey.slice(0, 12)}...)`);
}
else {
    console.warn("⚠️ SUPABASE_SERVICE_KEY is missing or empty.");
}
exports.supabaseAdmin = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey || "placeholder-key", {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
