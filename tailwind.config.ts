import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0C",
        surface: "#111116",
        bone: {
          DEFAULT: "#E8D5B7",
          light: "#F5EAD9",
          muted: "rgba(232, 213, 183, 0.65)",
          faint: "rgba(232, 213, 183, 0.15)",
        },
        slate: {
          DEFAULT: "#6C7A89",
          light: "#8A99A8",
          dark: "#3A4550",
          muted: "rgba(108, 122, 137, 0.5)",
        },
        gold: {
          DEFAULT: "#C9A96E",
          hover: "#DEC085",
          faint: "rgba(201, 169, 110, 0.15)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter-tight)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
        inertial: "cubic-bezier(0.25, 1, 0.5, 1)",
        snap: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        quick: "180ms",
        smooth: "400ms",
        stately: "1000ms",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.04)" },
        },
        lineOscillate: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "scroll-indicator": "lineOscillate 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
