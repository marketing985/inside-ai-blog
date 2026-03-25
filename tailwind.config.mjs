/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: '#A8FF00',
        dark: '#111111',
        muted: '#888888',
        border: '#eeeeee',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        logo: '4px',
        tag: '2px',
        wide: '3px',
      },
    },
  },
  plugins: [],
}
