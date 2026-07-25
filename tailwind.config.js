/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sampled directly from the brand artwork — do not eyeball these.
        //   primary       #703F8C  "GRACE" lettering + monogram swoosh (wordmark)
        //   primary-dark  #5D2179  monogram fill (circular logo)
        //   primary-light #C7A2D9  light accent (wordmark)
        //   deep          #1E0C2C  brand hue (274°) taken down to near-black.
        //                          The wordmark's own #3A1754 is correct on a
        //                          logo-sized surface but too heavy across a
        //                          full section — same hue, much lower value.
        // Roles: primary = fills behind white text, primary-dark = brand text on
        // light backgrounds, primary-light = accents on the deep sections.
        primary: '#703F8C',
        'primary-dark': '#5D2179',
        'primary-light': '#C7A2D9',
        accent: '#C9A96E',
        'accent-dark': '#8A6A2E',
        background: '#F9F7FB',
        surface: '#FFFFFF',
        ink: '#18101A',
        muted: '#736A7A',
        divider: '#EBE5ED',
        deep: '#1E0C2C',
      },
      fontFamily: {
        display: ['"Fraunces"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
