/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C9A84C',
          dark: '#0D0D0D',
          gray: '#1A1A1A',
          light: '#F5F5F0',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(13,13,13,0.3), rgba(13,13,13,0.95))',
      },
    },
  },
  plugins: [],
}
