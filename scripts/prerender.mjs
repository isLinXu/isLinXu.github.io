import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

/**
 * Post-build step: turn the single Vite HTML shell into one static file per
 * route, each with its own title, description, canonical URL and a <noscript>
 * copy of the page text. This gives crawlers real URLs and per-page metadata
 * while the app itself keeps rendering on the client.
 *
 * It also writes 404.html, which GitHub Pages serves for unknown paths so the
 * client-side router can take over.
 */

const OUT_DIR = "build";
const SITE_URL = "https://islinxu.github.io";

const staticRoutes = [
  {
    path: "/",
    heading: "Xu Lin",
    title: "Xu Lin | AI Engineer and Computer Vision Researcher",
    description:
      "Portfolio, projects, notes, and research work by Xu Lin across AI, computer vision, and multimodal systems.",
    body: "Xu Lin is an AI engineer and researcher working on multimodal models, evaluation workflows, and applied computer vision. This site collects his resume, projects, publications, and technical notes.",
  },
  {
    path: "/resume",
    heading: "Resume",
    title: "Resume | Xu Lin",
    description:
      "Resume of Xu Lin, an AI algorithm engineer focused on multimodal and large-model systems, evaluation, and applied computer vision.",
    body: "Resume of Xu Lin: AI algorithm engineer with experience in large-model training, multimodal systems, evaluation workflows, large-scale data engineering, and visual perception.",
  },
];

const markdownRoutes = [
  "overview",
  "skills",
  "experience",
  "education",
  "projects",
  "certificates",
  "accomplishments",
  "docs",
  "publication",
  "course",
];

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toPlainText(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, maxLength = 158) {
  if (text.length <= maxLength) {
    return text;
  }

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const end = lastSpace > 80 ? lastSpace : maxLength;

  return `${cut.slice(0, end).trim()}…`;
}

function markdownRoute(slug) {
  const file = join("public", "pages", "en", `${slug}.md`);

  if (!existsSync(file)) {
    throw new Error(`Missing markdown source for /${slug}: ${file}`);
  }

  const markdown = readFileSync(file, "utf8");
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? slug;
  const body = toPlainText(markdown.replace(/^#\s+.+$/m, ""));

  return {
    path: `/${slug}`,
    heading,
    title: `${heading} | Xu Lin`,
    description: truncate(body),
    body,
  };
}

function renderRoute(template, route) {
  const url = `${SITE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const noscript = `<noscript><main><h1>${escapeHtml(
    route.heading
  )}</h1><p>${escapeHtml(route.body)}</p></main></noscript>`;

  return template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${url}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${url}" />`
    )
    .replace(/<noscript>.*?<\/noscript>/, noscript);
}

const templatePath = join(OUT_DIR, "index.html");

if (!existsSync(templatePath)) {
  throw new Error(`Build output not found: ${templatePath}`);
}

const template = readFileSync(templatePath, "utf8");
const routes = [
  ...staticRoutes,
  ...markdownRoutes.map((slug) => markdownRoute(slug)),
];

for (const route of routes) {
  const html = renderRoute(template, route);

  if (route.path === "/") {
    writeFileSync(templatePath, html);
    continue;
  }

  const directory = join(OUT_DIR, route.path);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "index.html"), html);
}

// GitHub Pages serves this file for unknown paths; the app's catch-all route
// then redirects to the home page.
copyFileSync(templatePath, join(OUT_DIR, "404.html"));

console.log(`Pre-rendered ${routes.length} route shells + 404.html`);
