/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mytheme: {
          primary: '#00a5ff',

          secondary: '#0000ff',

          accent: '#00ab00',

          neutral: '#2e2726',

          'base-100': '#fffbff',

          'base-200': '#f7f4f7',

          'base-300': '#f0ecf0',

          'base-400': '#e8e4e8',

          'base-500': '#e0dce0',

          info: '#00b6ff',

          success: '#00d9a7',

          warning: '#e88700',

          error: '#cc2539',

          heart: '#ff3030',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['mytheme'],
  },
};
