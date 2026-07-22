<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

### Product
Static multi-page Next.js (App Router) marketing site for **MUC Cargo Handling**. No database or backend services required for normal development.

### Commands
See root `README.md` / `package.json`:
- Dev: `npm run dev` (http://localhost:3000)
- Lint: `npm run lint`
- Build: `npm run build`
- Prod serve: `npm start`

### Images
Replace placeholders by copying files into `public/images/` using the filenames listed in `public/images/README.md`. No rebuild is required for static image swaps in dev; a refresh is enough.

### Design tokens
Primary button `#D90D3A`, arrow slot `#F31042` — defined as CSS variables `--brand` / `--brand-arrow` in `src/app/globals.css`.

### Deploy
- Vercel via GitHub import (recommended): repo `viastefan/muc-cargo-handling`, project name `muc-cargo-handling`.
- CLI deploy requires `VERCEL_TOKEN`; not needed for local dev.
