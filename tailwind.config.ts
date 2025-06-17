import lineClamp from '@tailwindcss/line-clamp'



/** @type {import('tailwindcss').Config} */
const config =  {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        spin: 'spin 1s linear infinite',
      },
      colors: {
        primary: '#2563eb',
        secondary: '#10b981',
      },
    },
  },
plugins: [lineClamp],
}

export default config;