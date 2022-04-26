const defaultTheme = require("tailwindcss/defaultTheme");
const windmill = require("@roketid/windmill-react-ui/config");
const { lightBlue, warmGray, trueGray, coolGray, blueGray, ...colors } =
  defaultTheme.colors;

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
