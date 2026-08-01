/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Boxly dark theme: charcoal canvas + vivid indigo accent + white panels
        brand: {
          indigo: '#2a1ad4',   // vivid accent — button/footer FILLS (white text on it)
          iris: '#9d8dff',     // lighter indigo for accent TEXT on dark backgrounds (WCAG contrast)
          indigoDeep: '#000099', // confirmed deep brand blue
          navy: '#0a0a3d',     // deep indigo-navy
          blue: '#2a1ad4',     // alias kept for existing markup
          ink: '#212929',      // heading ink on white panels
          dark: '#141414',     // page canvas (charcoal)
          darker: '#0d0d0d',   // header / darkest sections
          panel: '#1c1c1c',    // slightly raised dark panel
          light: '#eef0ff',    // pale indigo tint
          cream: '#fffcfa',    // warm off-white (light panels)
        },
        // Warm gray ramp (Boxly body text is warm, not cool)
        gray: {
          50: '#faf9f8',
          100: '#f4f2f0',
          200: '#e6e3e0',
          300: '#d3cfcb',
          400: '#aba9a7',
          500: '#83817f',
          600: '#5a5e5f',   // Boxly body text color
          700: '#43464a',
          800: '#2c2f31',
          900: '#212929',   // Boxly heading ink
        },
      },
      fontFamily: {
        // Work Sans for body, Space Grotesk for display headings
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.05' }],
        '6xl': ['3.75rem', { lineHeight: '1.02' }],
        '7xl': ['4.75rem', { lineHeight: '0.98' }],
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
