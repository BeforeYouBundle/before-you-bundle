import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background tones
        graphite: {
          950: '#0E1111',
          900: '#121515',
          850: '#151A1A',
          800: '#1A2020',
          700: '#242B2B',
          600: '#2E3636',
        },
        // Accent - muted steel-teal
        accent: {
          DEFAULT: '#5E8B8B',
          light: '#7BA3A3',
          muted: '#4A7272',
          dim: '#3D5E5E',
        },
        // Text
        text: {
          primary: '#E8ECEC',
          secondary: '#9BA3A3',
          muted: '#6B7575',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'chip': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
