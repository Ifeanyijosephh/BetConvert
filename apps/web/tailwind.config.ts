import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "hsl(var(--bg-app) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--bg-surface) / <alpha-value>)",
          2: "hsl(var(--bg-surface-2) / <alpha-value>)",
        },
        input: "hsl(var(--bg-input) / <alpha-value>)",
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
          focus: "hsl(var(--border-focus) / <alpha-value>)",
        },
        t: {
          primary: "hsl(var(--text-primary) / <alpha-value>)",
          secondary: "hsl(var(--text-secondary) / <alpha-value>)",
          muted: "hsl(var(--text-muted) / <alpha-value>)",
        },
        green: {
          DEFAULT: "hsl(var(--green) / <alpha-value>)",
          dim: "hsl(var(--green-dim))",
          hover: "hsl(var(--green-hover) / <alpha-value>)",
          fg: "hsl(var(--green-fg) / <alpha-value>)",
        },
        red: {
          DEFAULT: "hsl(var(--red) / <alpha-value>)",
          dim: "hsl(var(--red-dim))",
        },
        amber: {
          DEFAULT: "hsl(var(--amber) / <alpha-value>)",
          dim: "hsl(var(--amber-dim))",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.4" } },
      },
    },
  },
  plugins: [],
} satisfies Config;
