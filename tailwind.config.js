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
        accent: {
          DEFAULT: '#FF6A00',
          secondary: '#FF7A18',
          bright: '#FF8A24',
          dark: '#D95400',
          hover: '#FF8A24',
          highlight: '#FF7A18',
          glow: 'rgba(255, 106, 0, 0.18)',
          muted: 'rgba(255, 106, 0, 0.12)',
          subtle: 'rgba(255, 106, 0, 0.05)',
        },
        dark: {
          bg: '#080808',
          secondary: '#101010',
          surface: '#111111',
          card: '#111111',
          cardHover: '#161616',
          border: '#2A2A2A',
          borderHover: '#FF6A00',
          text: '#F5F5F5',
          muted: '#6B6B6B',
          dim: '#6B6B6B',
        },
        light: {
          bg: '#FFFFFF',
          secondary: '#F5F5F5',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          cardHover: '#FAFAFA',
          border: '#E5E5E5',
          borderHover: '#FF6A00',
          text: '#111111',
          muted: '#6B6B6B',
          dim: '#6B6B6B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        tech: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.18em',
        ultra: '0.24em',
      },
      boxShadow: {
        'glow-orange': '0 0 35px -5px rgba(255, 106, 0, 0.18)',
        'glow-orange-sm': '0 0 15px -2px rgba(255, 106, 0, 0.18)',
        'glow-orange-lg': '0 0 60px -10px rgba(255, 106, 0, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'slide-up': 'slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', ['html.light &', '.light &']);
    },
  ],
}
