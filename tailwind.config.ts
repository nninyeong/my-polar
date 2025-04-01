import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          100: '#cadef5',
          200: '#95bceb',
          300: '#5996e0',
          400: '#2671ca',
          500: '#1b4f8e',
          10: 'rgba(149, 188, 235, 0.1)',
          50: 'rgba(149, 188, 235, 0.5)',
        },
        neutral: {
          100: '#ffffff',
          200: '#e8e8e8',
          300: '#d2d2d2',
          400: '#bbbbbb',
          500: '#a4a4a4',
          600: '#8e8e8e',
          700: '#777777',
          800: '#606060',
          900: '#4a4a4a',
          1000: '#333333',
          1100: '#000000',
          10: 'rgba(51, 51, 51, 0.1)',
        },
        success: {},
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [],
};
export default config;
