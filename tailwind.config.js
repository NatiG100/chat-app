/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
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
      animation:{
        'slide-in':'slide-in 100ms ease-in 1',
        'slide-out':'slide-out 100ms ease-in 1 forwards',
      },
      colors:{
        'dark':"#1D232F",
        'dark-surface':"#30394D",
        "primary":"#818CF8",
        "dark-text":"#FFFFFF",
        'light':"#E7E7E7",
        'light-surfce':"#D7DAE0",
        "light-text":"#212224",
      },
      keyframes:{
        'slide-in':{
          from:{
            marginLeft:"-100%",
            opacity:"0"
          },
          to:{
            marginLeft:"none",
            opacity:"1"
          }
        },
        'slide-out':{
          from:{
            marginLeft:"none",
            opacity:"1"
          },
          to:{
            marginLeft:"-100%",
            opacity:"0"
          },
        }
      }
    },
  },
  plugins: [],
}
