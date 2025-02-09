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
        red: "#f95050",
        purple: "#604cc3",
        "light-sky": "#fbfdff",
        "light-orange": "#fffdf9",
        "light-gray": "#c3c3c6",
        "dark-primary": "#249168",
        "dark-blue": "#4c82ed",
        "dark-red": "#eb4747",
        "dark-purple": "#4d3d9d",
        "dark-gray": "#3c4043",
        "ghost-white": "#f4f6fc",
      },
      width: {
        100: "25rem",
        108: "27rem",
        140: "35rem",
        200: "50rem",
      },
      minWidth: {
        168: "42rem",
      },
      maxWidth: {
        240: "60rem",
      },
      height: {
        120: "30rem",
      },
      borderWidth: {
        1.5: "1.5px",
        10: "10px",
      },
      boxShadow: {
        "3xl": "8px 8px 16px 0 rgba(0, 0, 0, 0.08)",
        popover:
          "0 0 0 1px rgba(15,15,15,0.05), 0 3px 6px rgba(15,15,15,0.1), 0 9px 24px rgba(15,15,15,0.1)",
      },
    },
  },
  plugins: [],
};
