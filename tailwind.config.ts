import type { Config } from "tailwindcss";

/** Brand palette: surface #FAFCFB, accent #D7F487, lime #79C80E, leaf #06B13D, forest #4E6F5C */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          surface: "#FAFCFB",
          accent: "#D7F487",
          lime: "#79C80E",
          leaf: "#06B13D",
          forest: "#4E6F5C",
          /** Muted spa teal — primary actions on hero / luxury UI (Scandinave-style). */
          spa: "#50766d",
          spaDark: "#446056",
          50: "#FAFCFB",
          100: "#EEF4EB",
          200: "#D8EED2",
          300: "#C8E88A",
          400: "#79C80E",
          500: "#06B13D",
          600: "#4E6F5C",
          700: "#3f5f4e",
          800: "#344a3f",
          900: "#283830",
          950: "#1a221c",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
