/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'],
        'barlow-condensed': ['"Barlow Condensed"', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
