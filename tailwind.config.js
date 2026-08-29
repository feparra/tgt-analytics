/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          canvas: '#101010',
          base: '#0d0d0d',
          darker: '#060505',
        },
        carbon: {
          lift: '#1d1a18',
          action: '#1f1d1c',
        },
        ash: {
          stroke: '#3d3a39',
          line: '#282524',
        },
        graphite: {
          mid: '#4d4947',
        },
        warm: {
          granite: '#8a8380',
        },
        pale: {
          stone: '#b8b3b0',
        },
        bone: {
          DEFAULT: '#eeeeee',
          pure: '#ffffff',
        },
        chalk: {
          DEFAULT: '#fafafa',
        },
        signal: {
          orange: '#ee6018',
        },
        metric: {
          green: '#a0ca92',
        },
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        'tight-display': '-2.88px',
        'tight-heading-lg': '-1.1px',
        'tight-heading': '-1.12px',
        'tight-caption': '-0.24px',
        'tight-mono': '-0.02em',
      },
      borderRadius: {
        'sm': '3px',
        'nav': '3px',
        'btn': '3px',
        'card': '10px',
        'panel': '20px',
      },
      boxShadow: {
        'hairline': '0 0 0 1px #3d3a39',
      }
    },
  },
  plugins: [],
}
