# f3nrirgate

[![Build Status](https://github.com/gbss-spec/f3nrirgate/actions/workflows/ci.yml/badge.svg)](https://github.com/gbss-spec/f3nrirgate/actions/workflows/ci.yml)

Minimal Astro portfolio site for Givaldo Batista da Silva Sobrinho (f3nrir), with a cyberpunk-inspired visual style.

## Tech stack

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- Node.js (recommended: 18+)

## Local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploy hints

- **Vercel**: import the repository and keep default build settings (`npm run build`, output `dist`).
- **Netlify**: set build command to `npm run build` and publish directory to `dist`.

## Profile image

The profile image used on the homepage lives at:

`/public/images/profile.jpg`

To replace it, keep the same filename/path or update references in the source accordingly.

## License

License: _TBD_.
