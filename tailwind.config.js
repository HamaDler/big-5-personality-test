/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Zen primary color - Sage Green
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7d8f7d',
          500: '#627362',
          600: '#4d5c4d',
          700: '#404a40',
          800: '#363d36',
          900: '#2f342f',
          950: '#181c18',
        },
        // Warm neutral tones
        warm: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Soft accent for highlights
        accent: {
          light: '#e8f0e8',
          DEFAULT: '#7d9f7d',
          dark: '#4a6b4a',
        },
        // Big Five trait colors - muted, harmonious palette
        openness: {
          light: '#e8e4f0',
          DEFAULT: '#9b8ab8',
          dark: '#6b5a88',
        },
        conscientiousness: {
          light: '#e3ece3',
          DEFAULT: '#7d9f7d',
          dark: '#4d6b4d',
        },
        extraversion: {
          light: '#f5ede3',
          DEFAULT: '#c4a574',
          dark: '#8b7355',
        },
        agreeableness: {
          light: '#e3eef0',
          DEFAULT: '#7ba4ad',
          dark: '#4b7480',
        },
        neuroticism: {
          light: '#f0e8e8',
          DEFAULT: '#b89898',
          dark: '#886868',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
