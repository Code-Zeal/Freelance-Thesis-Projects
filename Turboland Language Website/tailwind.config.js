/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('/src/assets/home.jpeg')",
        'random1': "url('/src/assets/random1.jpeg')",
        'random2': "url('/src/assets/random2.jpeg')",
      }
    },
  },
  plugins: [require('preline/plugin'),require('@tailwindcss/forms'),],
}

