// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg-size': 'background-size: 100% 100%',
        'custom-bg-position': 'background-position: center',
      },
      height: {
        'home-container-height': 'calc(100vh - 6.5rem)',
        'map-container-height': 'calc(100vh - 4rem)',
        'home-container-width': 'calc(100vh - 300px)',
      },
      colors: {
        'primary-color': '#4E5769',
      },
      backgroundColor: {
        default: '#f3f5f8',
      },
    },
  },
  plugins: [],
};
