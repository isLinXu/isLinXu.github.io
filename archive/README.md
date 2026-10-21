# Archive

Files in this folder are kept for history only. They are not copied into the
production build: `npm run build` publishes `build/`, which is generated from
`public/` and `src/`, so nothing under `archive/` reaches the live site.

## Contents

- `pages/` — legacy top-level markdown pages. The app only fetches
  `public/pages/{en,zh}/*.md`, so the copies that used to live directly under
  `public/pages/` were never rendered.
  - `README-project-list.md`, `languages.md`, `test.md` — leftovers from other
    projects and experiments.
- `pages/en/resume.md`, `pages/zh/resume.md` — the `/resume` route renders
  `src/app/pages/Resume.tsx`, so these markdown files were dead content.
- `imgs/` — 54 images that no page, component, or metadata file referenced.
  Only five images remain in `public/imgs`: the portrait, the avatar, the MME
  figure, and two certificate images.
- `src-static/` — unused assets from the original Create React App / upstream
  project (`screenshot.gif`, `light.jpg`, `favicon.png`, `logo.svg`).
- `repo-imgs/` — VS Code icons and favicon that used to sit at the repository
  root and were never referenced by the site.

## Restoring a file

```sh
git mv archive/imgs/<name>.png public/imgs/<name>.png
```
