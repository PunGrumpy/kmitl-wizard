/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{svelte,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mplus: ["'proxima-soft'", 'Verdana', 'sans-serif']
      }
    }
  },
  plugins: [],
  safelist: process.env.NODE_ENV === 'development' ? [{ pattern: /./ }] : []
}
