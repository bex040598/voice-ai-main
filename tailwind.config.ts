import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#061426",
          900: "#0c1f39",
          800: "#163357",
          700: "#1b4b7b"
        },
        cyan: {
          300: "#6fe8ff",
          400: "#33d7f5",
          500: "#0fb8de"
        },
        slate: {
          25: "#f6f9fc"
        }
      },
      boxShadow: {
        glass: "0 24px 64px rgba(6, 20, 38, 0.18)",
        panel: "0 12px 36px rgba(12, 31, 57, 0.14)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(12,31,57,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(12,31,57,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
