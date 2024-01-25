/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-purple': '#635FC7',
        'main-purple-hover': '#A8A4FF',
        black: '#000112',
        'very-dark-grey-dark-bg': '#20212C',
        'dark-grey': '#2B2C37',
        'lines-dark': '#3E3F4E',
        'medium-grey': '#828FA3',
        'lines-light': '#E4EBFA',
        'light-grey-light-bg': '#F4F7FD',
        red: '#EA5555',
        'red-hover': '#FF9898',
      },
      fontSize: {
        xl: '1.5rem',
        lg: '1.125rem',
        md: '0.9375rem',
      },
      boxShadow: {
        custom: '0px 10px 20px 0px rgba(54, 78, 126, 0.25)',
        'task-shadow': '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
        'dropdown-menu': '0px 10px 20px 0px rgba(54, 78, 126, 0.25)',
      },
      backgroundImage: {
        'new-column-light':
          'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)',
        'new-column-dark':
          'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}
