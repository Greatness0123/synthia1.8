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
        glass: {
          bg: 'rgba(15, 15, 25, 0.72)',
          border: 'rgba(255, 255, 255, 0.08)',
          light: 'rgba(255, 255, 255, 0.05)',
        },
        synthia: {
          primary: '#6C5CE7',
          secondary: '#00CEC9',
          accent: '#FD79A8',
          warning: '#FDCB6E',
          error: '#E17055',
          dark: '#0A0A14',
          surface: '#12121E',
        },
      },
      backdropBlur: {
        glass: '24px',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.5)',
        panel: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(108, 92, 231, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(108, 92, 231, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
