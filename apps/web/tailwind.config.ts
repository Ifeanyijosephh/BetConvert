import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: "#0A0A0B",
        surface: "#161618",
        brand: {
          neon: "#00FF66",
          "neon-hover": "#00E05A",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        stadium: "linear-gradient(to bottom, rgba(10, 10, 11, 0.75), rgba(10, 10, 11, 0.95)), url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=80')",
      }
    },
  },
  plugins: [],
} satisfies Config;
