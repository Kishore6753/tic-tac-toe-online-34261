/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          primary: "#2563EB",
          secondary: "#F59E0B",
          success: "#F59E0B",
          error: "#EF4444",
          background: "#0b1220",
          surface: "#0f172a",
          text: "#e5e7eb"
        }
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.35)"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
};
