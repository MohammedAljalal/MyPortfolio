/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // ─── Core Palette ───────────────────────────
                primary:   '#c8a86b',   // Gold — single accent
                'primary-dark': '#a88c4f', // Gold dark (hover states)
                'primary-light': '#dfc090', // Gold light (subtle uses)
                available: '#4ade80',   // Green — only for "available" & some tags
                // ─── Surfaces (Dark Mode) ───────────────────
                darkBg:    '#0c0c0c',   // True black
                darkCard:  '#141414',   // Card surface
                darkBorder:'#222222',   // Subtle border
                // ─── Surfaces (Light Mode) ──────────────────
                lightBg:   '#f5f0e8',   // Warm cream background
                lightCard: '#fffcf5',   // Warm white card
                lightBorder:'rgba(200,168,107,0.25)',  // Gold-tinted border
                // ─── Text ───────────────────────────────────
                darkText:  '#e2e2e2',   // Soft white body text
                mutedText: '#888888',   // Muted/secondary text
                lightText: '#1a1208',   // Rich dark brown for light mode
                lightMuted:'#6b5c3e',   // Warm muted for light mode
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            animation: {
                blob: "blob 7s infinite",
                "bounce-slow": "bounce 3s infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                blob: {
                    "0%":   { transform: "translate(0px, 0px) scale(1)" },
                    "33%":  { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%":  { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
            },
        },
    },
    plugins: [],
}
