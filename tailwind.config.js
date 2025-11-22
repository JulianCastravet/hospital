/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mars: {
          red: "#ff3b2d",
          dark: "#12040a",
        },
      },
      boxShadow: {
        "mars-glow": "0 0 40px rgba(255, 59, 45, 0.7)",
      },
    },
  },
  plugins: [],
};