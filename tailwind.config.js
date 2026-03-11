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
        logo: ['var(--font-russo-one)', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
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
          accent: '#22d3ee',
          'base-100': '#0a0a12',
          'base-200': '#12121e',
          'base-300': '#1e1e2e',
        },
      },
    ],
  },
};
