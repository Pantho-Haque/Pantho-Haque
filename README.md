# Pantho Haque · portfolio

The public portfolio at https://panthohaque.vercel.app. A "case file" journey: a normal, fast page with a light game layer (progress bar, level map, checkpoints, J/K keys, three achievements). Every featured project has its own page at `/work/<slug>`.

Content is **not** edited here. It is published from the Control Room in Domino (`domiknows.vercel.app/admin`) into Supabase. This app reads the latest published version, caches it under the `content` tag, and Domino calls `/api/revalidate` (optionally with `{ "slugs": [...] }` to refresh only some exposures) after each publish. If Supabase is unreachable or not configured, the site serves `content.fallback.json`.

## Routes

| Route | What |
| --- | --- |
| `/` | Main site: the case-file journey (exposure `main`) |
| `/work/<project>` | A project's case file |
| `/for/<slug>` | An **exposure**: a copy tailored for one company, created in Domino's Control Room. Opens on a one-page summary |
| `/for/<slug>/full` | That exposure's full journey ("Open the full case file") |
| `/for/<slug>/work/<project>` | That exposure's case files |

Exposure pages are built on the first visit and cached until Domino publishes that exposure again. They are never indexed (noindex, disallowed in robots.txt, not in the sitemap), and their slugs carry a random suffix so they can't be guessed. Each visit is filed under the exposure in Trackima (company and role attached to every event); add `?me=1` to a URL to turn tracking off for your own visits in that tab.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Local dev server |
| `pnpm docker` (or `docker compose up`) | Same dev server inside Docker, nothing to install but Docker · http://localhost:3000 |
| `pnpm check` | Lint, typecheck and production build |
| `pnpm env:pull` | Copy Vercel's env into `.env.vercel` (reference only; `.env.local` is never overwritten) |
| `pnpm content:pull` | Save the live content to `content.fallback.json` (commit it) |
| `pnpm revalidate` | Ask the live site to drop its cached content |
| `pnpm deploy:preview` | Deploy a preview with the Vercel CLI |
| `pnpm ship` | Check, then deploy to production |

Pushing to the production branch also deploys through Vercel's Git integration.

## Environment

See `.env.example`. All optional for local work.

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Read published content (row-level security allows only published rows and token-matched drafts) |
| `REVALIDATE_SECRET` | Shared with Domino; protects `/api/revalidate` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and OG images |
| `NEXT_PUBLIC_TRACKIMA_SITE` | Optional Trackima site id; analytics load only when set |

## Routes

- `/` journey · `/work/[slug]` case files · `/opengraph-image`, `/work/[slug]/opengraph-image` social cards · `/sitemap.xml` · `/robots.txt`
- `POST /api/revalidate` (Bearer secret) · `GET /api/preview?token=<uuid>&slug=<exposure>` and `/api/preview/exit` for Control Room draft previews

## Commit convention

Conventional Commits, enforced by a husky commit-msg hook: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:` …
