/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',  // applies pl-4 and pr-4
        sm: '1.5rem',     // applies pl-6 and pr-6
        lg: '2rem',       // applies pl-8 and pr-8
      },
    },
  },
  plugins: [],
}
