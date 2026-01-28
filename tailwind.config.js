/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Big Five trait colors
        openness: {
          light: '#E8D5F2',
          DEFAULT: '#9B59B6',
          dark: '#6C3483',
        },
        conscientiousness: {
          light: '#D5F5E3',
          DEFAULT: '#27AE60',
          dark: '#1E8449',
        },
        extraversion: {
          light: '#FCF3CF',
          DEFAULT: '#F1C40F',
          dark: '#B7950B',
        },
        agreeableness: {
          light: '#D6EAF8',
          DEFAULT: '#3498DB',
          dark: '#21618C',
        },
        neuroticism: {
          light: '#FADBD8',
          DEFAULT: '#E74C3C',
          dark: '#A93226',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
