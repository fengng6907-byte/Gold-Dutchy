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
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'sans-serif'],
      },
      colors: {
        silver: {
          50:  '#FAFAFA',
          100: '#F5F5F5',
          200: '#EFEFEF',
          300: '#E5E5E5',
          400: '#D5D5D5',
          500: '#C0C0C0',
          600: '#AAAAAA',
          700: '#8A8A8A',
          800: '#5A5A5A',
          900: '#3A3A3A',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          soft:    '#2D2D2D',
          mid:     '#3A3A3A',
          light:   '#4A4A4A',
        },
        red: {
          matte:  '#B91C1C',
          dark:   '#991B1B',
          bright: '#DC2626',
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
    },
  },
  plugins: [],
}
