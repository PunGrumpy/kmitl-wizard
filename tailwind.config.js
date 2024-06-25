/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{svelte,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mplus: ["'proxima-soft'", 'Verdana', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px'
      },
      backgroundColor: {
        'white-70': 'rgba(255, 255, 255, 0.7)',
        'black-70': 'rgba(0, 0, 0, 0.7)'
      }
    }
  }
}
