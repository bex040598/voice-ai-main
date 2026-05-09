import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#061426",
          925: "#061A40",
          900: "#0c1f39",
          850: "#0B2D5B",
          800: "#163357",
          700: "#1b4b7b"
        },
        cyan: {
          300: "#6fe8ff",
          400: "#33d7f5",
          500: "#0fb8de",
          600: "#00D4FF"
        },
        violet: {
          300: "#a78bfa",
          500: "#7C3AED",
          700: "#5B21B6"
        },
        slate: {
          25: "#f6f9fc"
        }
      },
      boxShadow: {
        glass: "0 24px 64px rgba(6, 20, 38, 0.18)",
        panel: "0 12px 36px rgba(12, 31, 57, 0.14)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0, 212, 255, 0.16)",
        aura: "0 0 120px rgba(124, 58, 237, 0.28)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(12,31,57,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(12,31,57,0.08) 1px, transparent 1px)",
        aurora:
          "radial-gradient(circle at top left, rgba(0, 212, 255, 0.2), transparent 32%), radial-gradient(circle at top right, rgba(124, 58, 237, 0.2), transparent 30%), linear-gradient(135deg, rgba(6,26,64,0.96), rgba(11,45,91,0.92))"
      }
    }
  },
  plugins: []
};

export default config;
