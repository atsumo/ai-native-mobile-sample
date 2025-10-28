/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#096BFF',
          light: '#3D86E6',
          dark: '#0052CC',
        },
        natural: {
          50: '#F3F3F2',
          100: '#E8E8E7',
          200: '#D1D1CF',
          300: '#B0B0AD',
          400: '#8F8F8C',
          500: '#6E6E6B',
          600: '#57575A',
          700: '#424249',
          800: '#2C2C32',
          900: '#1C1D22',
        },
        accent: {
          orange: '#FF6600',
          red: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['System'],
      },
      boxShadow: {
        'superlist': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'superlist-md': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)',
        'superlist-lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
