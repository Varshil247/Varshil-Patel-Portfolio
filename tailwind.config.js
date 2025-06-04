// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"],
      },
      colors: {
        light: "var(--light)",
        regular: "var(--regular)",
        dark: "var(--dark)",
        special: "var(--special)",
      },
    },
  },
  plugins: [],
};


