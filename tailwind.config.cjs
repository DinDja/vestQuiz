/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- Ele procura DENTRO da pasta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}