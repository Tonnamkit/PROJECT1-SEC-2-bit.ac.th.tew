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
                downriver: {
                    50: '#ecf6ff',
                    100: '#d4eaff',
                    200: '#b3dcff',
                    300: '#7ec7ff',
                    400: '#42a6ff',
                    500: '#177eff',
                    600: '#005aff',
                    700: '#0042fc',
                    800: '#0235cb',
                    900: '#09339f',
                    950: '#0a1d56',
                },
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'dark', 'wireframe'],
    },
};
