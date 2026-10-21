# isLinXu.github.io

Personal portfolio for **Xu Lin (林旭)** — AI algorithm engineer working on
multimodal models, evaluation workflows, and applied computer vision.

**Live site:** [https://islinxu.github.io](https://islinxu.github.io)

The site is a VS Code-inspired single-page app: activity bar, collapsible explorer
tree, closable editor tabs, and a status bar. The content pages are Markdown,
available in English and Chinese, and there is a dedicated resume page designed
for both web reading and PDF export.

## Stack

| Layer | Choice |
| --- | --- |
| App | React 18, TypeScript 5, Vite 5 |
| UI | Material UI 5, Emotion, `@mui/lab` TreeView |
| Content | Markdown rendered with `react-markdown` + GFM + raw HTML |
| Routing | `react-router-dom` with `BrowserRouter` |
| Static output | `scripts/prerender.mjs` writes one HTML shell per route + `404.html` |
| Analytics | `react-ga4` (measurement ID in `.env.production`) |
| Hosting | GitHub Pages, deployed from the `gh-pages` branch |

## Structure

```text
index.html                       Vite entry (meta tags, fonts, theme bootstrap)
vite.config.ts
scripts/prerender.mjs            per-route HTML shells with title/description
src/
  app/
    components/MDContainer.tsx   Markdown page loader + renderer
    hooks/                       page-view tracking, document metadata
    i18n/                        locale context + shared page labels
    layout/                      App shell, sidebar, tree, tabs, footer
    pages/                       Home, Resume, route table, social links
  index.tsx
public/
  pages/en/*.md                  English content
  pages/zh/*.md                  Chinese content
  imgs/                          images still referenced by pages
  resume-xulin-2026.pdf          downloadable resume PDF
archive/                         legacy pages/images kept for history only
```

## Getting started

Node 18+ (Node 20 is used by CI via `.nvmrc`).

```sh
npm ci
npm run dev        # http://localhost:3000
```

Useful checks:

```sh
npm run typecheck  # tsc --noEmit
npm run lint       # eslint src
npm run build      # vite build + route shells in build/
npm run preview    # serve the production build on :4173
```

Environment variables live in `.env.development` / `.env.production` and must
use the `VITE_` prefix (`VITE_APP_NAME`, `VITE_MEASUREMENT_ID`).

## Editing content

- **Markdown pages** live in `public/pages/en/` and `public/pages/zh/`. They are
  fetched at runtime from `import.meta.env.BASE_URL`, so text changes only need
  a deploy — no rebuild of React code is involved.
- **Adding a page** requires three edits: register the route in
  [`src/app/pages/pages.ts`](src/app/pages/pages.ts), add its bilingual label in
  [`src/app/i18n/pageLabels.ts`](src/app/i18n/pageLabels.ts), and add the slug to
  `markdownRoutes` in [`scripts/prerender.mjs`](scripts/prerender.mjs) so it gets
  a static shell. Remember to add the URL to `public/sitemap.xml`.
- **Resume page** content is typed into
  [`src/app/pages/Resume.tsx`](src/app/pages/Resume.tsx); it requires a rebuild.
  Refresh `public/resume-xulin-2026.pdf` whenever the resume changes.
- **Social links** are configured in
  [`src/app/pages/links.tsx`](src/app/pages/links.tsx).
- **Home page copy and featured repositories** are in
  [`src/app/pages/Home.tsx`](src/app/pages/Home.tsx).

## Routing and static output

The app uses `BrowserRouter`, so URLs are clean (`/projects`, `/resume`). After
`vite build`, `scripts/prerender.mjs` generates `build/<route>/index.html` with
that route's `<title>`, description, canonical URL, Open Graph tags and a
`<noscript>` copy of the page text. It also copies the home page to
`build/404.html`; GitHub Pages serves that file for unknown paths and the app
redirects to `/`.

## Deployment

Every push and pull request runs
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): install,
type-check, lint, build. Only pushes to `main` publish `build/` to `gh-pages`.

Manual deploy still works if GitHub Actions is unavailable:

```sh
npm run deploy
```

GitHub Pages must be configured to serve the `gh-pages` branch at the repository
root.

## Notes

- Only `public/` and compiled assets are shipped. Files under `archive/` are not
  part of the deployed site and are kept for history; see
  [`archive/README.md`](archive/README.md).
- The design started from
  [`noworneverev/react-vscode-portfolio`](https://github.com/noworneverev/react-vscode-portfolio)
  (MIT) and has since been substantially rewritten, restyled and moved to Vite.

## License

See [`LICENSE`](LICENSE) (Apache-2.0) for the project code and
[`LICENSE.md`](LICENSE.md) (MIT) for upstream-derived material.
