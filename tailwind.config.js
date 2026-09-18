/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        base: {
          950: "#0a0d12",
          900: "#0e1218",
          850: "#121721",
          800: "#161c28",
          700: "#1f2733",
          600: "#2a3441",
          500: "#3d4a5c",
          400: "#6b7a8f",
          300: "#9aa8ba",
          200: "#c4ccd6",
          100: "#e7ebf0",
        },
        signal: {
          done: "#3ddc84",
          info: "#4d9dff",
          warn: "#f5b300",
          danger: "#ff5c5c",
          phase: "#a685ff",
        },
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
