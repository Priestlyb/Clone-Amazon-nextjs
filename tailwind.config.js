module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all files in src directory for class names
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amazon_shades: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
