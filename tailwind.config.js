/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  darkMode: "class", // or 'media' if you prefer, but 'class' works best with manual toggling
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

