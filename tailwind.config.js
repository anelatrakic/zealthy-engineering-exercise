/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#ffffff",
                foreground: "#171717",
                lightcream: "#fffc",
                darkgray: "#1b1b1b",
                darkgreen: "#00531b",
                lightgreen: "#edfff3",
                blackgreen: "#00210b",
                mintgreen: "#b8f5cc",
                darkcream: "#fff6e9",
                cream: "#fffaf2",
                green: "#007c29",
                softgreen: "#f2f4e9",
            },
        },
    },
    plugins: [],
};
