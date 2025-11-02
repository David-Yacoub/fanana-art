import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        sans: ['"Work Sans"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        brand: {
          cream: '#f9f5f0',
          blush: '#f6d6d6',
          clay: '#d9a28f',
          forest: '#3a5a40',
          ink: '#1f1f23'
        }
      }
    }
  },
  plugins: []
};
