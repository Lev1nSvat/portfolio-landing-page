/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'carousel-pink': {
          '50': '#fffefe', 
          '100': '#fffcfd', 
          '200': '#fff8fa', 
          '300': '#fff4f7', 
          '400': '#feebf2', 
          '500': '#FEE3EC', 
          '600': '#e5ccd4', 
          '700': '#bfaab1', 
          '800': '#98888e', 
          '900': '#7c6f74'
        },
        'tickle-me-pink': {
          '50': '#fef8fa', 
          '100': '#fef2f5', 
          '200': '#fcdde7', 
          '300': '#fac9d9', 
          '400': '#f6a1bc', 
          '500': '#F2789F', 
          '600': '#da6c8f', 
          '700': '#b65a77', 
          '800': '#91485f', 
          '900': '#773b4e'
        },
        'seashell': {
          '50': '#fefefe', 
          '100': '#fefefe', 
          '200': '#fbfbfb', 
          '300': '#f9f9f9', 
          '400': '#f5f5f5', 
          '500': '#f0f0f0', 
          '600': '#d8d8d8', 
          '700': '#b4b4b4', 
          '800': '#909090', 
          '900': '#767676'
        },
        'shark': {
          '50': '#f4f4f4', 
          '100': '#e9e9e9', 
          '200': '#c8c8c8', 
          '300': '#a7a7a7', 
          '400': '#646464', 
          '500': '#222222', 
          '600': '#1f1f1f', 
          '700': '#1a1a1a', 
          '800': '#141414', 
          '900': '#111111'
        }
      }
    },
  },
  plugins: [function ({ addVariant }) {
    addVariant('child', '& > *');
    addVariant('child-hover', '& > *:hover');
}],
}
