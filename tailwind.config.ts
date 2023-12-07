import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        Roboto: ['Roboto', 'sans'],
        Raleway: ['Raleway', 'sans'],
      },
      colors:{
        'orng':{
         100: '#FE6B03',
         200: '#ff862e'
        } ,
        'customBlue': '#468EC1', 
      },

      screens: {
        'sm': '200px',  // Small screens
        'md': '600px',  // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1350px', // Extra-large screens
      },
      extend: {
        fontSize: {
          'sm': '14px',
          'md': '16px',
          'lg': '18px',
        },

        padding: {
          'sm': '10px',
          'md': '20px',
          'lg': '30px',
        },
      },
    },
  },
  plugins: [],
}
export default config
