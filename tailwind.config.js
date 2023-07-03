/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      offwhite: {
        dark: '#b3b3b3',
        DEFAULT: '#e2e2e2',
        light: '#f0fbff'
      },
      grey: {
        darkest: '#202020',
        dark: '#393939',
        DEFAULT: '#595959',
        light: '##8B8B8B'
      },
      black: {
        DEFAULT: '#000000',
        light: '#111111',
        lightest: '#131313'
      }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
