/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        kiiraBlue: '#3F84FF',
        kiiraGradient: 'linear-gradient(290.44deg, #0253E2 13.57%, #00C0E2 86.43%)',
        kiiraDark: '#000B1E',
        kiiraText: '#6F7888',
        kiiraBlackText: '#252539',
        kiiraBg: '#F1F5FF',
        kiiraCardBg1: '#F6F8FC',
        kiiraCardBg2: '#ECEFF3',
        kiiraCardB3: '#93939A'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    }
  },
  important: true,
  plugins: []
});
