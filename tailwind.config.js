/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/Images/Image.png')",
      },
      scale: {
        '110': '1.10',
        '90': '0.90',
      },
      zIndex: {
        '10': '10',
        '0': '0',
      }
    },
  },
  plugins: [],
};
