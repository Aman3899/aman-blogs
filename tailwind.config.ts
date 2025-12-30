import type { Config } from "tailwindcss";

export default {
    darkMode: ["class", "class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./public/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                    light: "#a78bfa",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                surface: "rgb(30 41 59 / 0.5)",
                'text-primary': "hsl(var(--foreground))",
                'text-secondary': "hsl(var(--muted-foreground))",
                success: "hsl(var(--success))",
                warning: "hsl(var(--warning))",
                error: "hsl(var(--destructive))",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-in": "slideIn 0.3s ease-out",
                "scale-in": "scaleIn 0.5s ease-out",
                "float": "float 3s ease-in-out infinite",
                "bounce-in": "bounceIn 0.6s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "from": { opacity: "0" },
                    "to": { opacity: "1" },
                },
                slideUp: {
                    "from": { transform: "translateY(20px)", opacity: "0" },
                    "to": { transform: "translateY(0)", opacity: "1" },
                },
                slideIn: {
                    "from": { transform: "translateX(20px)", opacity: "0" },
                    "to": { transform: "translateX(0)", opacity: "1" },
                },
                scaleIn: {
                    "from": { transform: "scale(0.9)", opacity: "0" },
                    "to": { transform: "scale(1)", opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                bounceIn: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "50%": { transform: "scale(1.05)" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
} satisfies Config;