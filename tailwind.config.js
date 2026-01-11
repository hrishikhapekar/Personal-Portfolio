/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        rainbowGlow: {
          "0%": { filter: "blur(18px)", opacity: "0.55" },
          "50%": { filter: "blur(26px)", opacity: "0.95" },
          "100%": { filter: "blur(18px)", opacity: "0.55" },
        },
      },
      animation: {
        rainbowGlow: "rainbowGlow 3s ease-in-out infinite",
      },
    },

  },
  plugins: [],
};
