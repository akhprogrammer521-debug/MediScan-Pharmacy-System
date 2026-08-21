/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
    "./src/config/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        subtle: "var(--subtle)",
        border: "var(--border)",

        primary: "var(--primary)",
        primaryFg: "var(--primary-fg)",
        secondary: "var(--secondary)",

        text: "var(--text)",
        muted: "var(--muted)",

        danger: "var(--danger)",
        success: "var(--success)",
        warning: "var(--warning)",
      },

      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },

      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.04)",
        card: "0 8px 24px rgba(0,0,0,0.06)",
      },

      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["15px", "22px"],
        lg: ["18px", "26px"],
        xl: ["20px", "28px"],
      },

      /* =========================
         TRANSITIONS
      ========================= */
      transitionTimingFunction: {
        soft: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },

  plugins: [],
};
