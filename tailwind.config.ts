import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Framer breakpoints used by the portfolio pages (mobile-first):
      // phone < 810, tablet 810–1199, desktop >= 1200.
      screens: {
        tablet: "810px",
        desktop: "1200px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        switzer: ["var(--font-switzer)", "sans-serif"],
        schibsted: ["var(--font-schibsted)", "sans-serif"],
        chivo: ["var(--font-chivo-mono)", "monospace"],
        neutral: ["var(--font-neutral-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        "inter-display": ["var(--font-inter-display)", "sans-serif"],
      },
      colors: {
        ink: "#000000",
        muted: "#1F2937",
        link: "#1F2937",
      },
    },
  },
  plugins: [],
};

export default config;
