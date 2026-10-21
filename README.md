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
| App | React 18, TypeScript 4.7, Create React App 5 |
| UI | Material UI 5, Emotion, `@mui/lab` TreeView |
| Content | Markdown rendered with `react-markdown` + GFM + raw HTML |
| Routing | `react-router-dom` with `HashRouter` |
| Analytics | `react-ga4` (measurement ID in `.env.production`) |
| Hosting | GitHub Pages, deployed from the `gh-pages` branch |

## Structure

```text
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

Node 20 is recommended (`.nvmrc`); the committed Create React App toolchain does
not build reliably on Node 26.

```sh
nvm use            # or install Node 20 manually
npm ci
npm start          # http://localhost:3000
```

Useful checks:

```sh
npm run typecheck  # tsc --noEmit
npm run lint       # eslint src
npm run build      # production build in build/
```

## Editing content

- **Markdown pages** live in `public/pages/en/` and `public/pages/zh/`. They are
  fetched at runtime, so text changes only need a deploy — no rebuild of React
  code is involved.
- **Adding a page** requires two edits: register the route in
  [`src/app/pages/pages.ts`](src/app/pages/pages.ts) and add its bilingual label
  in [`src/app/i18n/pageLabels.ts`](src/app/i18n/pageLabels.ts).
- **Resume page** content is typed into
  [`src/app/pages/Resume.tsx`](src/app/pages/Resume.tsx); it requires a rebuild.
  Refresh `public/resume-xulin-2026.pdf` whenever the resume changes.
- **Social links** are configured in
  [`src/app/pages/links.tsx`](src/app/pages/links.tsx).
- **Home page copy and featured repositories** are in
  [`src/app/pages/Home.tsx`](src/app/pages/Home.tsx).

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
install, type-check, lint, build, then publish `build/` to `gh-pages`.

Manual deploy still works if GitHub Actions is unavailable:

```sh
npm run deploy
```

GitHub Pages must be configured to serve the `gh-pages` branch at the repository
root. The site uses `HashRouter`, so deep links look like
`https://islinxu.github.io/#/projects` and survive a page refresh without a
server-side rewrite.

## Notes

- Only `public/` and compiled assets are shipped. Files under `archive/` are not
  part of the deployed site and are kept for history; see
  [`archive/README.md`](archive/README.md).
- The design started from
  [`noworneverev/react-vscode-portfolio`](https://github.com/noworneverev/react-vscode-portfolio)
  (MIT) and has since been substantially rewritten and restyled.

## License

See [`LICENSE`](LICENSE) (Apache-2.0) for the project code and
[`LICENSE.md`](LICENSE.md) (MIT) for upstream-derived material.
