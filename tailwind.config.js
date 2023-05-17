/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        kiiraBlue: '#3F84FF',
        kiiraGradient: 'linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)',
        kiiraDark: '#000B1E',
        kiiraText: '#6F7888',
        kiiraBg: '#F1F5FF'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    }
  },
  important: true,
  plugins: []
});
