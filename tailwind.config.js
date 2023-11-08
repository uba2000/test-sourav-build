/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Gaming
        'gaming-navy': '#0A001F',
        'gaming-blue': '#00FFFC',

        // General
        'intel-cobalt-s2': '#000864',
        'intel-e-blue': '#00C7FD',
        'intel-e-gray': '#808080',
        'intel-e-gray-s1': '#525252',
        'intel-e-gray-t1': '#AEAEAE',
        'intel-e-gray-t3': '#F6F6F6',
        'intel-white': '#FFFFFF',
        // 'bg-linear-gradient-1': '#0A001F, #0A001F00',
      },
    },
  },
  plugins: [],
};
