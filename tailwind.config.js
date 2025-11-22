/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'fiestron' is the class name you'll use
        // 'FiestronHeader' must match what you put in index.css
        fiestron: ['FiestronHeader', 'sans-serif'],
      },
    },
  },
  plugins: [],
}