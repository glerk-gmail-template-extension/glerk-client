import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto Slab", "serif"],
      },
      colors: {
        primary: "#2c9f73",
        stroke: "#eaecf0",
        black: "#0f1012",
        blue: "#5089f9",
        yellow: "#f7c349",
        darkGray: "#3c4043",
        lightGray: "#c3c3c6",
        red: "#f95050",
        purple: "#604cc3",
        "ghost-white": "#f4f6fc",
      },
      width: {
        100: "25rem",
      },
      height: {
        120: "30rem",
      },
      boxShadow: {
        "3xl": "8px 8px 16px 0 rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
