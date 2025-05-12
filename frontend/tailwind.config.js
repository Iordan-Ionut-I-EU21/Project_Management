/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "rgb(17, 24, 39)",
      },
    
    },
  },
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus", "active"],
      textColor: ["responsive", "hover", "focus"],
      opacity: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
};
