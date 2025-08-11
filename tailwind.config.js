// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Tells Tailwind to scan all JS/JSX files in src/
    "./public/index.html"          // Includes your HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}