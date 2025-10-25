/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-sefif"],
        "robert-regular": ["robert-regular", "sans-sefif"],
        "peace-sans": ["peace-sans", "sans-sefif"],
        maleha: ["maleha", "sans-sefif"],
      },
      colors: {
        white: {
          100: "#dfdff0",
        },
        blue: {
          10: "#DFDFF0",
          50: "#DFDFF0",
          75: "#DFDFF2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#47B7DD",
          400: "#0166FE",
        },
        violet: {
          300: "#5724FF",
        },
        yellow: {
          100: "#8E983F",
          300: "#EDFF66",
        },
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
