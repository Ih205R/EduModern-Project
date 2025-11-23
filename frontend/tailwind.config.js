/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        cream: '#F6F5F3',
        white: '#FFFFFF',
        dark: '#1E1E1E',
        blue: '#8DA7D9',
        grayblue: '#D8DDE3',
        lavender: '#E2D4FF',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#8DA7D9',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#E2D4FF',
          foreground: '#1E1E1E',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#D8DDE3',
          foreground: '#1E1E1E',
        },
        accent: {
          DEFAULT: '#E2D4FF',
          foreground: '#1E1E1E',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        subheading: ['Montserrat', 'sans-serif'],
        body: ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        'heading-xl': ['3.5rem', { lineHeight: '1.2', fontWeight: '800' }],
        'heading-lg': ['2.5rem', { lineHeight: '1.3', fontWeight: '800' }],
        'heading-md': ['2rem', { lineHeight: '1.4', fontWeight: '800' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.4', fontWeight: '800' }],
        'subheading-lg': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        'subheading-md': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body-lg': ['1.25rem', { lineHeight: '1.8' }],
        'body-md': ['1.125rem', { lineHeight: '1.8' }],
        'body-sm': ['1rem', { lineHeight: '1.8' }],
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.08)',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
    },
  },
  plugins: [],
};