/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'golden-sand': {
                    50: '#fffbeb',
                    100: '#fff3c6',
                    200: '#ffe382',
                    300: '#ffd14a',
                    400: '#ffbc20',
                    500: '#f99907',
                    600: '#dd7202',
                    700: '#b74f06',
                    800: '#943c0c',
                    900: '#7a310d',
                    950: '#461802',
                },
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'dark', 'wireframe'],
    },
};
