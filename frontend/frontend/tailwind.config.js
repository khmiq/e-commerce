/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      sm: "300px",
      md: "540px",
      lg: "768px",
      xl: "1024px"
    },
    extend: {},
    keyframes :{
      move:{
        "50%": {
          transform: "translateY(-1rem)"
        }
      },
      rotate:{
        "0%": {transform: "rotate(0deg)"},
        "100%": {transform: "rotate(360deg)"},
      },
      scaleUp:{
        "50%": {transform: "scale(1.2)"},
        "100%": {transform: "scale(0.8)"},
      }
    },
    animation: {
      movingY: "move 3s linear infinite",
      rotating: "rotate 15s linear infinite",
      scalingUp: "scaleUp 3s linear infinite"
    },
    fontFamily:{
Jost: ["Jost", "sans-serif"],
Lobster: [ "Lobster", "sans-serif"]
    },
    container:{
      center: true,
      padding: {
        DEFAUL: "12px",
        md: "32px"
      }
    }
  },
  plugins: [],
}