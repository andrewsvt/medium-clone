/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Boska: ['Boska', 'serif'],
        Charter: ['Charter', 'serif']
      }
      // gridTemplateColumns: {
      //   post: '1fr 2fr 1fr'
      // }
    },

    colors: {
      green: '#1a8917',
      greenHover: '#1D651B',
      black: '#000',
      yellow: '#FFC017',
      white: '#fff',
      gray: '#757575',

      mainText: '#292929',
      secondaryText: '#6e6e6f'
    }
  },
  plugins: []
}
