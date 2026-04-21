# Scrum Lifeboat — DISC-style communication indicator

Indicative self-assessment for teaching (Project Management / communication). Client-side only; no data storage.

## Local

```bash
npm install
npm run dev
```

Open http://localhost:3000/

## Build

```bash
npm run build
```

## GitHub Pages

Production builds use `base: /scrum-lifeboat-disc/` so the app works under the project URL.

**Live (GitHub Pages):** https://perduesseldorf.github.io/scrum-lifeboat-disc/

If deploy fails with “Ensure GitHub Pages has been enabled”, run once:

`gh api repos/perduesseldorf/scrum-lifeboat-disc/pages -X POST -f build_type=workflow`
