/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#374151',
        accent: '#F59E0B',
        'bg-dark': '#0F172A',
      }
    },
  },
  plugins: [],
}
