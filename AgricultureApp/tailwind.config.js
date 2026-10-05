/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'text': '#f2ecac',
        'background': '#143302',
        'primary': '#637462',
        'secondary': '#6d835c',
        'accent': '#00c203',
       },
    },
  },
  plugins: [],
}

