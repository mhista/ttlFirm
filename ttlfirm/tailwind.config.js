/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
        jost: ['Jost', 'serif'],
      },
      // colors: {
      //   'primary-orange': '#FF5722',
      // }
    },
  },
  plugins: [],
}
