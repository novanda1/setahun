const defaultTheme = require("tailwindcss/defaultTheme");
const windmill = require("@roketid/windmill-react-ui/config");
const colors = defaultTheme.colors;

delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

module.exports = windmill({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./example/**/*.{js,ts,jsx,tsx}",
  ],
  extend: {
    colors,
  },
  plugins: [],
});
