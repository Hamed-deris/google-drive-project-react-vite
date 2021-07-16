// tailwind.config.js
module.exports = {
  purge: ["**/*.html", "./src/**/*.js", "./src/**/*.jsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      borderWidth: ["first", "last", "odd"],
    },
  },
  plugins: [],
};
