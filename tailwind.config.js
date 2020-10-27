module.exports = {
  plugins: [require("@tailwindcss/ui")],
  purge: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
    "./src/**/*.js",
  ],
  future: {
    purgeLayersByDefault: true,
  },
};
