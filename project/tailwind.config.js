/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
      },
      backgroundColor: {
        base: 'var(--background)',
      },
      textColor: {
        base: 'var(--text)',
        secondary: 'var(--text-secondary)',
      },
      borderColor: {
        base: 'var(--border)',
      },
    },
  },
  plugins: [],
};