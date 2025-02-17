import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'unit-gradient':
          'linear-gradient(360deg, rgba(196, 196, 196, 0.2) -79.96%, rgba(196, 196, 196, 0.0877044) 6.86%, rgba(196, 196, 196, 0) 78.31%)',
      },
      colors: {
        primarybg: '#232229',
        secondarybg: '#2C2930',
        inactiveText: '#666666',
        orange: '#F48403',
      },
      fontSize: {
        '96': '96px',
        '48': '48px',
        '36': '36px',
        '24': '24px',
        '18': '18px',
      },
      lineHeight: {
        '112': '112px',
        '56': '56px',
        '42': '42px',
        '28': '28px',
        '21': '21px',
      },
    },
  },
  plugins: [],
};

export default config;
