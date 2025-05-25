// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Add "Bebas Neue" here
        bebas: ['"Bebas Neue"', "sans-serif"], // Fallback to a generic sans-serif

        // If you were using "Roboto Condensed" as your default sans, it would look like this:
        // 'sans': ['"Roboto Condensed"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
