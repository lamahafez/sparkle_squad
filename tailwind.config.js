/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {
      colors:{
        mainText:'#1F4169'
      },
      fontFamily: {
        amaranth: ['"Amaranth"', 'sans-serif'], 
      },
    },
  },
  plugins: [daisyui,],
}
