/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Clash Display', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        ember: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        sky: {
          400: '#38bdf8',
          500: '#0ea5e9',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-light': 'radial-gradient(at 40% 20%, hsla(145,60%,92%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,70%,90%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,80%,94%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(270,70%,94%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(145,60%,90%,1) 0px, transparent 50%)',
        'mesh-dark': 'radial-gradient(at 40% 20%, hsla(145,40%,10%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,50%,8%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,60%,8%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(270,50%,8%,1) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card': '0 4px 24px -4px rgba(0,0,0,0.08)',
        'card-hover': '0 16px 40px -8px rgba(0,0,0,0.14)',
        'neon-green': '0 0 24px rgba(34,197,94,0.35)',
        'neon-ember': '0 0 24px rgba(249,115,22,0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
