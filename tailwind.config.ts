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
      /* FORNO – uholie, žiara pece a teplý pergamen. Názvy tried zostávajú,
         aby sa vizuál zmenil bez narušenia existujúcich interakcií a testov. */
      colors: {
        cream: "#F7EFE1",
        "cream-2": "#EFE3CF",
        "cream-3": "#DFCDB2",
        line: "#D2BFA2",
        tomato: "#D8451C",
        "tomato-dark": "#A8310F",
        ember: "#D8451C",
        "ember-deep": "#A8310F",
        flame: "#E89A3C",
        basil: "#476A42",
        char: "#2A1F19",
        "char-deep": "#16100D",
        forest: "#2A1F19",
        "forest-deep": "#16100D",
        gold: "#E89A3C",
        "gold-deep": "#8A4E12",
        ink: "#1C1613",
        muted: "#6B5C4D",
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
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        "ember-breathe": {
          "0%, 100%": { opacity: ".45", transform: "scale(1)" },
          "50%": { opacity: ".85", transform: "scale(1.08)" },
        },
      },
      animation: {
        "fade-up": "fade-up .75s cubic-bezier(.16,1,.3,1) both",
        "fade-in": "fade-in 1s ease-out both",
        "seal-rotate": "seal-rotate 24s linear infinite",
        "cue-pulse": "cue-pulse 1.8s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
        "ember-breathe": "ember-breathe 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
