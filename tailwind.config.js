/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      'lg': '996px',
    },
  },
  darkMode: ['class','[data-theme="dark"]'],
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

