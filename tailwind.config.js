/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#6B0F1A',
          light: '#8B1A28',
          dark: '#4A0A12',
        },
        gold: {
          DEFAULT: '#C9973B',
          light: '#E8C97A',
          pale: '#F5E6C8',
          dark: '#9A7020',
        },
        stage: {
          black: '#0A0A0A',
          charcoal: '#1A1510',
          dark: '#120E0A',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-stage': 'radial-gradient(ellipse at 50% 30%, rgba(201,151,59,0.15) 0%, rgba(10,10,10,0) 70%)',
        'gold-shimmer': 'linear-gradient(135deg, #C9973B 0%, #E8C97A 50%, #C9973B 100%)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'beat': 'beat 0.5s ease-in-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,151,59,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201,151,59,0.7)' },
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'beat': {
          '0%': { transform: 'scaleX(0)', opacity: '1' },
          '100%': { transform: 'scaleX(1)', opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
