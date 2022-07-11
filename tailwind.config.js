/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      tooltipArrows: (theme) => ({
        "danger-arrow": {
          borderColor: theme("colors.red.400"),
          borderWidth: 1,
          backgroundColor: theme("colors.red.200"),
          size: 10,
          offset: 10,
        },
      }),
    },
  },
  plugins: [],
};
