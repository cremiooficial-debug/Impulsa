/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          primary: '#3D17C6',
          deep: '#2A0F8F',
          light: '#5A35D4',
        },
        violet: {
          active: '#7B2FFF',
          soft: '#9B5FFF',
        },
        lime: {
          accent: '#CCFF00',
          dim: '#A8D400',
        },
        chalk: {
          white: '#F4F0EB',
          dim: '#E8E2D9',
          dark: '#D4CEC5',
        },
        dark: {
          base: '#0D0A1A',
          card: '#150E2E',
          panel: '#1A1035',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
      backgroundImage: {
        'indigo-violet': 'linear-gradient(135deg, #3D17C6 0%, #7B2FFF 100%)',
        'violet-indigo': 'linear-gradient(135deg, #7B2FFF 0%, #3D17C6 100%)',
        'indigo-dark': 'linear-gradient(135deg, #2A0F8F 0%, #0D0A1A 100%)',
        'lime-gradient': 'linear-gradient(135deg, #CCFF00 0%, #A8D400 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'counter-up': 'counterUp 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        counterUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      clipPath: {
        'hexagon': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        'arrow-right': 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}