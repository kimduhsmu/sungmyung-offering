/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a5f',
      },
      boxShadow: {
        card: '0 16px 40px rgba(30, 58, 95, 0.08)',
      },
    },
  },
  plugins: [],
};
