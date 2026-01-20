/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],

  theme: {
    extend: {
      /* =========================
         COLORS — Semantic Only
         ========================= */
      colors: {
        /* Backgrounds */
        "bg-primary": "rgb(var(--color-bg-primary) / <alpha-value>)",
        "bg-secondary": "rgb(var(--color-bg-secondary) / <alpha-value>)",
        "bg-surface": "rgb(var(--color-bg-surface) / <alpha-value>)",

        /* Text */
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",

        /* Borders */
        "border-default": "rgb(var(--color-border-default) / <alpha-value>)",
        "border-subtle": "rgb(var(--color-border-subtle) / <alpha-value>)",

        /* Actions */
        "action-primary": "rgb(var(--color-action-primary) / <alpha-value>)",
        "action-primary-hover":
          "rgb(var(--color-action-primary-hover) / <alpha-value>)",
        "action-secondary":
          "rgb(var(--color-action-secondary) / <alpha-value>)",

        /* States */
        "state-success": "rgb(var(--color-state-success) / <alpha-value>)",
        "state-warning": "rgb(var(--color-state-warning) / <alpha-value>)",
        "state-error": "rgb(var(--color-state-error) / <alpha-value>)",
        "state-info": "rgb(var(--color-state-info) / <alpha-value>)",
      },

      /* =========================
         TYPOGRAPHY
         ========================= */
      fontFamily: {
        base: ["Inter", "system-ui", "sans-serif"],
      },

      fontSize: {
        xs: ["12px", "16px"], // helper text, timestamps
        sm: ["14px", "20px"], // tables, metadata
        base: ["16px", "24px"], // body text
        lg: ["18px", "28px"], // section headers
        xl: ["20px", "28px"], // page titles
      },

      /* =========================
         SPACING — 4px System
         ========================= */
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
      },

      /* =========================
         BORDER RADIUS
         ========================= */
      borderRadius: {
        sm: "4px", // inputs, tables
        md: "8px", // buttons, cards
      },

      /* =========================
         SHADOWS
         ========================= */
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.25)",
      },
    },
  },

  plugins: [],
};
