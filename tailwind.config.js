/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        celestial: {
          dark: '#141d44',
          mid: '#233170',
          light: '#3f519d',
          sky: '#5c70bf',
        }
      }
    },
  },
  plugins: [],
}
