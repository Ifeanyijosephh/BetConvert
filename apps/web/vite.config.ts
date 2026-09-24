import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  define: {
    // Explicitly ensure server secrets are NEVER injected into the client bundle.
    // If any code accidentally references these, the build will use undefined
    // instead of the real value.
    "process.env.SUPABASE_SERVICE_ROLE_KEY": undefined,
    "process.env.POCKETFI_SECRET_KEY": undefined,
    "process.env.POCKETFI_WEBHOOK_SIGNING_KEY": undefined,
    "process.env.WORKER_API_KEY": undefined,
  },
});