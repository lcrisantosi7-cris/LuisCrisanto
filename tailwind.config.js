/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      colors: {
        border: "hsl(240 5.9% 90%)",
        channel: 'rgb(var(--ch) / <alpha-value>)',
        vision: { DEFAULT: '#6867D2', light: '#8F8EE8' },
        rec: '#F5525B',
        ink: {
          950: '#0b0b0f',
          900: '#111116',
          800: '#18181f',
          700: '#23232c',
          600: '#33333f',
          400: '#8b8b9a',
          200: '#d4d4dc',

          // Paleta "Painted Clouds" — naranja cálido + índigo frío + coral
          // Mapeo en el slot "emerald" para no tocar ningún JSX existente
          emerald: {
            200: '#e8e6f8',   // lavanda muy suave — fondos sutiles
            300: '#c5c2ef',   // lavanda claro — badges suaves
            400: '#6867D2',   // lavanda/violeta medio — textos de acento
            500: '#FC8F54',   // naranja cálido — botones principales, activos
            600: '#e67a3f',   // naranja oscuro — hover
            700: '#5546AD',   // índigo profundo — bordes activos, énfasis
            800: '#2C3D95',   // azul índigo — secciones secundarias
            900: '#413646',   // púrpura muy oscuro — fondos de cards
            950: '#1e1a24',   // casi negro púrpura — fondo profundo
          },

          // Coral para highlights/badges especiales (úsalo con bg-coral-500)
          coral: {
            400: '#f87a82',
            500: '#F5525B',
            600: '#e03a44',
          },

          zinc: {
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
            950: '#09090b',
          },

        },
        animation: {
          'fade-in': 'fadeIn 0.8s ease-out',
          'float': 'float 6s ease-in-out infinite',
          'float-delayed': 'float-delayed 8s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(5deg)' },
          },
          'float-delayed': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-30px) rotate(-5deg)' },
          },
        },
      },
    },
    plugins: [],
  }
}