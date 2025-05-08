/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}', './public/**/*.html'],
  theme: {
    extend: {}
  },
  excluded: ['./_portfolio-site-resources/**/*'],
  plugins: []
};
