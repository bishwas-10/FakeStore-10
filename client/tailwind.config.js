/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffc107',
        'semiprimary': ' #e0e0e0',
        'secondary':'#3f51b5'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    
    animation:{
      slider: 'slider 1.5s ease-in-out'
    },
    keyframes:{
      'slider':{
        '0% , 100%':{transform : 'translateX(-100%)'}
      }
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
  },
  },
  plugins: [],
}
