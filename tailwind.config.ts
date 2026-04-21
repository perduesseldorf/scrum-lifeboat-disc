import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        champagne: {
          DEFAULT: "hsl(var(--champagne))",
          light: "hsl(var(--champagne-light))",
          dark: "hsl(var(--champagne-dark))",
        },
        amber: {
          DEFAULT: "hsl(var(--amber))",
          soft: "hsl(var(--amber-soft))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
          foreground: "hsl(var(--cream-foreground))",
        },
        slate: {
          warm: "hsl(var(--slate-warm))",
        },
        inverse: {
          DEFAULT: "hsl(var(--inverse-fg))",
          muted: "hsl(var(--inverse-fg-muted))",
        },
        section: {
          "dark-bg": "hsl(var(--section-dark-bg))",
          "dark-fg": "hsl(var(--section-dark-fg))",
          "light-bg": "hsl(var(--section-light-bg))",
          "light-fg": "hsl(var(--section-light-fg))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // DISC dimension accents (semantic: use in circumplex, score grid, primary block accents)
        disc: {
          d: "hsl(var(--disc-d))",
          i: "hsl(var(--disc-i))",
          s: "hsl(var(--disc-s))",
          c: "hsl(var(--disc-c))",
        },
        // New design system colors (Session 10)
        "dark-bg": "#080808",
        "dark-card": "#0f0f0f",
        "dark-border": "#1a1a1a",
        "light-bg": "#f5f5f7",
        "light-card": "#ffffff",
        "light-border": "#e5e5e5",
        "accent-new": "#d4a853",
        "accent-light": "#e8c878",
        "accent-dark": "#b8860b",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        'subtle': 'var(--line-subtle)',
        'standard': 'var(--line-standard)',
        'emphasis': 'var(--line-emphasis)',
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gentle-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "gentle-bounce": "gentle-bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
