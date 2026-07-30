/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // ─── Core Palette ───────────────────────────
                primary:   '#c8a86b',   // Gold — single accent
                'primary-dark': '#a88c4f', // Gold dark (hover states)
                'primary-light': '#dfc090', // Gold light (subtle uses)
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
        },
    },
    plugins: [],
}
