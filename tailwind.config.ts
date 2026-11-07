import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#17211d", muted: "#738078", brand: "#176b52", soft: "#f4f7f4", line: "#e7ece8" },
    boxShadow: { soft: "0 12px 40px rgba(20, 50, 35, .07)" },
    borderRadius: { "2xl": "1.25rem" }
  }},
  plugins: []
};
export default config;
