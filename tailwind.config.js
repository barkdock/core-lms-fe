/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#fdf3ec",
					100: "#fbe5d7",
					200: "#f6c9b0",
					300: "#f0aa84",
					400: "#ea8b5a",
					500: "#e16c38",
					600: "#d45a1f",
					700: "#b64819",
					800: "#923a16",
					900: "#6e2d12",
				},
			},
			fontFamily: {
				sans: ['"Space Grotesk"', '"Trebuchet MS"', "system-ui", "sans-serif"],
			},
			animation: {
				"fade-in": "fadeIn 0.3s ease-in-out",
				"slide-in": "slideIn 0.3s ease-in-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideIn: {
					"0%": { transform: "translateX(-10px)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
			},
		},
	},
	plugins: [],
};
