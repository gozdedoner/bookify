/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ Burası olmazsa dark: çalışmaz
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
