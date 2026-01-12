/** @type {import('tailwindcss').Config} */
import { colors } from "./src/css/colors";

export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors,
    fontFamily: {
      pretendard: ["Pretendard", "system-ui", "sans-serif"],
    },
  },
};
export const plugins = [];
