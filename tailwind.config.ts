import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neon-glow': '0 0 10px rgba(135, 90, 250, 0.6), 0 0 20px rgba(135, 90, 250, 0.3)',
        'neon-hover': '0 0 15px rgba(250, 90, 220, 0.8), 0 0 30px rgba(250, 90, 220, 0.5)',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(90deg, #875AFE 0%, #FA5ADC 100%)',
      },
    },
  },
  plugins: [],
};
export default config;