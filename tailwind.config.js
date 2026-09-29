/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#F5F3EF", // light page background
        ink: "#16181D",
        road: "#2B2E36", // charcoal road, not yet driven over
        trail: "#A9E5C1", // mint the car leaves behind
        "card-lemon": "#FFF0A8",
        "card-peach": "#FFD2B3",
        "card-sky": "#C6E4FB",
        "card-lilac": "#DDD0F7",
      },
      fontFamily: {
        sans: ["Inter", '"Helvetica Neue"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
