/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: '#090D16',
          slate: '#0F172A',
          card: 'rgba(15, 23, 42, 0.75)',
          border: '#1E293B',
          hover: '#1e293b80'
        },
        agent: {
          scanner: '#10B981',  // emerald
          static: '#06B6D4',   // cyan
          security: '#F59E0B', // amber
          planner: '#8B5CF6'   // violet
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'SF Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 18px rgba(139, 92, 246, 0.7)' },
        }
      }
    },
  },
  plugins: [],
}

