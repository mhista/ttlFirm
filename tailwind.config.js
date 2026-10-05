/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2.5rem', xl: '3rem' },
      screens: { '2xl': '1320px' },
    },
    extend: {
      fontFamily: {
        // Display serif — headlines, section titles, the attorney name.
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        // Body sans — everything else.
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        // Legacy aliases so any component not yet migrated still renders in
        // the NEW typefaces instead of falling back to browser defaults.
        lora: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        jost: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ---- Primary: navy. Carries the whole site. -------------------
        navy: {
          50:  '#F1F6FA',
          100: '#DCE8F3',
          200: '#BFD6EA',
          300: '#93B8D8',
          400: '#5B93C6',
          500: '#2E6FAC',
          600: '#1C5389',
          700: '#15406F',
          800: '#0F3057',
          900: '#0A2340',
          950: '#061525',
        },
        // ---- Accent: the firm's amber, kept as a HIGHLIGHT only. ------
        // Never a page background. Used for rules, icons, one CTA, links
        // on navy. accent-400 is the on-dark text tint (passes AA on 900).
        accent: {
          300: '#F2CE93',
          400: '#E9A94A',
          500: '#D98324',
          600: '#C06F16',
          700: '#9A5711',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#4A5568',
          soft:  '#6B7280',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt:     '#F5F7FA',
          line:    '#E3E8EF',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(6,21,37,.04), 0 8px 24px -12px rgba(6,21,37,.18)',
        'card-hover': '0 2px 4px rgba(6,21,37,.06), 0 24px 48px -20px rgba(6,21,37,.32)',
        widget: '0 12px 40px -8px rgba(6,21,37,.35)',
      },
      borderRadius: { xl2: '1.25rem' },
      maxWidth: { prose2: '68ch' },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(14px)' }, '100%': { opacity: 1, transform: 'none' } },
        'slide-up': { '0%': { opacity: 0, transform: 'translateY(16px) scale(.98)' }, '100%': { opacity: 1, transform: 'none' } },
        'pulse-ring': { '0%': { transform: 'scale(.9)', opacity: .7 }, '70%': { transform: 'scale(1.5)', opacity: 0 }, '100%': { opacity: 0 } },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,1,.36,1) both',
        'slide-up': 'slide-up .28s cubic-bezier(.22,1,.36,1) both',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
