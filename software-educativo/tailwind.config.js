/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('/src/assets/backgroundHome.png')",
        'menu': "url('/src/assets/backgroundMenu.jpg')",
        'water': "url('/src/assets/water.png')",
        'words': "url('/src/assets/words.jpg')",
        
      },
      
    },
  },
  plugins: [],
}

