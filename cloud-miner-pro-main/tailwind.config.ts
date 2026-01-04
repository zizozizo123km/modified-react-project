import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Using Tajawal plus system fonts typical for FB
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        // --- FACEBOOK THEME COLORS ---
        border: "#CED0D4", // Light gray border
        input: "#F0F2F5",  // Input background
        ring: "#1877F2",   // Focus ring (FB Blue)
        background: "#F0F2F5", // Main background light gray
        foreground: "#050505", // Main text color (Dark Black)
        
        primary: {
          DEFAULT: "#1877F2", // Facebook Blue
          foreground: "#FFFFFF", 
        },
        secondary: {
          DEFAULT: "#606770", // Secondary text / Icons (FB Gray)
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#FA383E", // Standard Red for errors
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#38A169", // Standard Green
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#E4E6EB", // UI elements background (Header/Lighter card sections)
          foreground: "#606770", // Muted text
        },
        accent: {
          DEFAULT: "#D8DFE7", // Hover state background
          foreground: "#050505",
        },
        popover: {
          DEFAULT: "#FFFFFF", 
          foreground: "#050505",
        },
        card: {
          DEFAULT: "#FFFFFF", // Standard white card background
          foreground: "#050505",
        },
        // Custom FB color alias
        'fb-blue': '#1877F2',
        'fb-gray-bg': '#F0F2F5',
      },
      borderRadius: {
        // Slight rounding typical of Facebook UI
        sm: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;