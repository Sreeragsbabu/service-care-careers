export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        cyan: {
          50: "#e0f7fa",
          100: "#b2ebf2",
          200: "#80deea",
          300: "#4dd0e1",
          400: "#26c6da",
          500: "#44c2ce",
          600: "#3bb4b4",
          700: "#2ba09a",
          800: "#208c80",
          900: "#1a6b66",
        },
      },
    },
  },
  plugins: [],
};
