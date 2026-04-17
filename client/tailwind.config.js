/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#FF8C00",
        "primary-dark": "#E67E00",
        "secondary": "#FFA500",
        "accent": "#FF8C00",
        "accent-gold": "#FFB84D",
        "success": "#10B981",
        "background-light": "#FFFFFF",
        "background-dark": "#0F172A",
        "card-dark": "#1E293B",
        "border-light": "#E2E8F0",
        "border-dark": "#334155",
        "border-orange": "#FF8C00",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "serif": ["Playfair Display", "serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
