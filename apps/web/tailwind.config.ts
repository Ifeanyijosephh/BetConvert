import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "hsl(var(--bg-app) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--bg-surface) / <alpha-value>)",
          subtle: "hsl(var(--bg-surface-subtle) / <alpha-value>)",
        },
        border: {
          subtle: "hsl(var(--border-subtle) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
        },
        text: {
          primary: "hsl(var(--text-primary) / <alpha-value>)",
          secondary: "hsl(var(--text-secondary) / <alpha-value>)",
          muted: "hsl(var(--text-muted) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "hsl(var(--brand-primary) / <alpha-value>)",
          hover: "hsl(var(--brand-primary-hover) / <alpha-value>)",
          fg: "hsl(var(--brand-primary-fg) / <alpha-value>)",
          glow: "hsl(var(--brand-glow))",
        },
        status: {
          success: "hsl(var(--status-success) / <alpha-value>)",
          "success-bg": "hsl(var(--status-success-bg))",
          warning: "hsl(var(--status-warning) / <alpha-value>)",
          "warning-bg": "hsl(var(--status-warning-bg))",
          danger: "hsl(var(--status-danger) / <alpha-value>)",
          "danger-bg": "hsl(var(--status-danger-bg))",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Oswald", "Barlow Condensed", "Impact", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px -4px var(--brand-glow)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.2)",
        sheet: "0 -8px 32px -4px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "pulse-subtle": "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 200ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
