import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { 
      container: {
        center: true,
        padding: "0px",
      },

      colors: {
        accent: "#FF8F9C",
        blackish: "#1b1b1b",
        'custom-bg': "#FCF8F3",
        mainGreen: "#698474",
        background: "#FCF8F3",
        lightCream: "#FFD3B6",
        darkCream: "#DCA47C",
      },

      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        customSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(var(--rotate-to))' },
        },
      },

      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'custom-spin': 'customSpin 3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
