/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#060606',
          panel: '#101010',
          line: '#1f1f1f',
          text: '#d4d4d4',
          muted: '#8a8a8a',

          // nova identidade: vermelho + preto
          red: '#d94646',
          redSoft: '#b33a3a',
          redDeep: '#7f1d1d',

          // tiers
          tierBeginner: '#6b7280',      // cinza
          tierFamiliar: '#3b82f6',      // azul
          tierIntermediate: '#f59e0b',  // âmbar
          tierAdvanced: '#ef4444',      // vermelho
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['Orbitron', '"JetBrains Mono"', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        softRed: '0 0 0 1px rgba(217,70,70,.35), 0 0 12px rgba(127,29,29,.25)',
      },
      backgroundImage: {
        'cyber-grid':
          'linear-gradient(to right, rgba(217,70,70,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(217,70,70,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '34px 34px',
      },
    },
  },
  plugins: [],
};
