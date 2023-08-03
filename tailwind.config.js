/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   "./pages/**/*.{js,jsx,ts,tsx}",
  //   "./components/**/*.{js,jsx,ts,tsx}",
  // ],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        default: {
          100: "#FFF3E3",
          200: "#B88E2F",
        },
      },
    },
  },
  plugins: [],
  prefix: "tw-",
};
