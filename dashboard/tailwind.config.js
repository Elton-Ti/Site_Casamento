/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF8F3',
          200: '#F4F0E8',
          300: '#EAE3D5',
          400: '#DFD5C0',
          500: '#D2C4AA',
          600: '#B8A586',
        },
        gold: {
          50: '#FAF7EE',
          100: '#F4EDD6',
          200: '#E9D8A5',
          300: '#DEC374',
          400: '#D4AF43',
          500: '#C5A038',
          600: '#A48227',
          700: '#7E631E',
          800: '#5A4616',
          900: '#3D2F0E',
        },
        olive: {
          50: '#F5F7F4',
          100: '#E9ECE7',
          200: '#D5DCD2',
          300: '#B7C3B2',
          400: '#92A38C',
          500: '#6B7F64',
          600: '#53654E',
          700: '#42513E',
          800: '#344031',
          900: '#273025',
        },
        charcoal: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E2E5E8',
          300: '#C7CDD3',
          400: '#8E98A4',
          500: '#5A6370',
          600: '#404752',
          700: '#2E333C',
          800: '#1F2329',
          900: '#14171B',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 30px -4px rgba(0, 0, 0, 0.07)',
        'soft-xl': '0 20px 40px -6px rgba(0, 0, 0, 0.09)',
        'gold-sm': '0 2px 10px rgba(197, 160, 56, 0.15)',
        'gold': '0 4px 20px rgba(197, 160, 56, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      }
    },
  },
  plugins: [],
}
