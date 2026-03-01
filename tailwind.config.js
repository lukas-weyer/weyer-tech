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
        logo: ['"Russo One"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#FF2D63',
          light: '#FF5A85',
          dark: '#E0224F',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#FF2D63',
          'primary-content': '#ffffff',
          secondary: '#a855f7',
          'base-100': '#0f172a',
          'base-200': '#1e293b',
          'base-300': '#334155',
        },
      },
    ],
  },
};
