/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "main-font": ["IntelOne Display", "sans-serif"],
        /* IntelOne Display Font */
        IntelOneDisplayBold: ["IntelOneDisplayBold", "sans-serif"],
        IntelOneDisplayMedium: ["IntelOneDisplayMedium", "sans-serif"],
        IntelOneDisplayRegular: ["IntelOneDisplayRegular", "sans-serif"],
        IntelOneDisplayLight: ["IntelOneDisplayLight", "sans-serif"],
        /* IntelOne BodyText Font */
        IntelOneBodyTextBold: ["IntelOneBodyTextBold", "sans-serif"],
        IntelOneBodyTextMedium: ["IntelOneBodyTextMedium", "sans-serif"],
        IntelOneBodyTextRegular: ["IntelOneBodyTextRegular", "sans-serif"],
        IntelOneBodyTextLight: ["IntelOneBodyTextLight", "sans-serif"],
      },
      fontSize: {
        h1: [
          "60px",
          {
            lineHeight: "60px",
            letterSpacing: "1px",
            fontWeight: "700",
          },
        ],
        "M-h1": [
          "24px",
          {
            lineHeight: "24px",
            letterSpacing: "1px",
            fontWeight: "700",
          },
        ],
        h2: [
          "28px",
          {
            lineHeight: "28px",
            letterSpacing: "1px",
            fontWeight: "700",
          },
        ],
        "M-h2": [
          "20px",
          {
            lineHeight: "20px",
            letterSpacing: "0.7px",
            fontWeight: "700",
          },
        ],
        h3: [
          "22px",
          {
            lineHeight: "24px",
            letterSpacing: "0.7px",
            fontWeight: "700",
          },
        ],
        "M-h3": [
          "16px",
          {
            lineHeight: "16px",
            letterSpacing: "0.7px",
            fontWeight: "700",
          },
        ],
        body: [
          "16px",
          {
            lineHeight: "22px",
            letterSpacing: "0.1px",
            fontWeight: "400",
          },
        ],
      },
      colors: {
        // Gaming
        "gaming-navy": "#0A001F",
        "gaming-blue": "#00FFFC",
        "gaming-blue-disabled": "rgba(0, 255, 255, 0.60)",
        "gaming-blue-hover": "#9FF",
        "gaming-yellow": "#FFF217",
        "gaming-cobalt": "#0040FF",

        // General
        "intel-20-cobalt": "#192FBF",
        "intel-cobalt-s2": "#000864",
        "intel-cobalt-t1": "#5B69FF",
        "intel-e-blue": "#00C7FD",
        "intel-e-blue-t1": "#4FE1FF",
        "intel-e-blue-t1-hover": "#9BEDFF",
        "intel-e-gray": "#808080",
        "intel-e-gray-s1": "#525252",
        "intel-e-gray-s2": "#262626",
        "intel-e-gray-t1": "#AEAEAE",
        "intel-e-gray-t3": "#F6F6F6",
        "intel-white": "#FFFFFF",
        "link-blue": "#1E2EB8",

        "white-20": "rgba(255,255,255,0.20)",
        "white-75": "rgba(255,255,255,0.75)",
        "white-50": "rgba(255, 255, 255, 0.50)",
        // 'bg-linear-gradient-1': '#0A001F, #0A001F00',
      },
      animation: {
        fadeInUp: "fadeInUp 500ms cubic-bezier(0.2, 0, 0.38, 0.9) forwards",
        fadeIn: "fadeIn 500ms cubic-bezier(0.2, 0, 0.38, 0.9) forwards",
        popIn: "popIn 100ms cubic-bezier(0.2, 0, 0.38, 0.9) forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translate(0px, 50px)" },
          "100%": { opacity: "1", transform: "translate(0px, 0px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        popIn: {
          "0%": { opacity: "0", scale: "0.95" },
          "100%": { opacity: "1", scale: "1" },
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar-hide")],
};
