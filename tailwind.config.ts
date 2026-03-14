import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        accent: "#1a1a1a",
        primary: "#FFD400"
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(255, 212, 0, 0.6)"
      }
    }
  },
  plugins: []
};

export default config;

