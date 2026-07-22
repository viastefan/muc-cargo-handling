# MUC Cargo Handling

Corporate website for MUC Cargo Handling (Munich Airport air freight).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Images

Copy your photos into `public/images/` — see `public/images/README.md` for exact filenames per page. Placeholder images are included so the site runs immediately; replace them with your finals.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm start` | Serve production build |

## Deploy (Vercel)

Das Projekt heißt **`muc-cargo-handling`** (siehe `vercel.json`). Ohne CLI-Token am einfachsten über die Vercel-GitHub-Integration:

1. Auf [vercel.com/new](https://vercel.com/new) einloggen
2. Repository `viastefan/muc-cargo-handling` importieren
3. Framework: **Next.js** (wird automatisch erkannt)
4. Projektname: **muc-cargo-handling**
5. Deploy starten (Branch `main` nach Merge des PRs, oder Preview für den Feature-Branch)

Optional per CLI (mit Token): `npx vercel --prod`
