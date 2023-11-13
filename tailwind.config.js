/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "main-font": ["IntelOne Display", "sans-serif"],
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
        h2: [
          "36px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.36px",
            fontWeight: "700",
          },
        ],
        h3: [
          "22px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.2px",
            fontWeight: "700",
          },
        ],
        body: [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.096px",
            fontWeight: "400",
          },
        ],
      },
      colors: {
        // Gaming
        "gaming-navy": "#0A001F",
        "gaming-blue": "#00FFFC",

        // General
        "intel-cobalt-s2": "#000864",
        "intel-e-blue": "#00C7FD",
        "intel-e-gray": "#808080",
        "intel-e-gray-s1": "#525252",
        "intel-e-gray-t1": "#AEAEAE",
        "intel-e-gray-t3": "#F6F6F6",
        "intel-white": "#FFFFFF",
        // 'bg-linear-gradient-1': '#0A001F, #0A001F00',
      },
    },
  },
  plugins: [],
};
