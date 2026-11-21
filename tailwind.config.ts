import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.75rem", lg: "2.5rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1200px", "2xl": "1200px" },
    },
    extend: {
      colors: {
        cream: "#FBF6EA",
        "cream-2": "#F4EAD8",
        "cream-3": "#EADFCB",
        line: "#E3D7C2",
        tomato: "#C7321F",
        "tomato-dark": "#A82717",
        forest: "#16382E",
        "forest-deep": "#0F2A22",
        gold: "#C9A227",
        "gold-deep": "#8A6D18",
        ink: "#1F1A16",
        muted: "#6B6157",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        heading: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-body)", "Manrope", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Manrope", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "16px", pill: "999px", soft: "10px" },
      boxShadow: {
        card: "0 2px 8px rgba(31,26,22,.06)",
        "card-hover": "0 18px 40px -16px rgba(15,34,26,.24)",
        image: "0 18px 40px -18px rgba(15,34,26,.45)",
        header: "0 6px 24px rgba(31,26,22,.07)",
      },
      maxWidth: { content: "1200px" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "seal-rotate": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        "cue-pulse": {
          "0%, 100%": { transform: "scaleY(.35)", opacity: ".5" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up .75s cubic-bezier(.16,1,.3,1) both",
        "fade-in": "fade-in 1s ease-out both",
        "seal-rotate": "seal-rotate 24s linear infinite",
        "cue-pulse": "cue-pulse 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
