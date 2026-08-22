/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            code: {
              backgroundColor: "transparent",
              padding: "0",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
