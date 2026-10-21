import type { Locale } from "./LocaleContext";

/**
 * Single source of truth for the label shown in the explorer tree, the
 * editor tab bar and the document title. Add new markdown pages here once
 * instead of duplicating the map in every layout component.
 */
const pageLabels: Record<string, Record<Locale, string>> = {
  "overview.md": { en: "Overview", zh: "概览" },
  "resume.md": { en: "Resume", zh: "简历" },
  "skills.md": { en: "Skills", zh: "技能" },
  "experience.md": { en: "Experience", zh: "经历" },
  "education.md": { en: "Education", zh: "教育" },
  "projects.md": { en: "Projects", zh: "项目" },
  "certificates.md": { en: "Certificates", zh: "证书" },
  "accomplishments.md": { en: "Highlights", zh: "亮点" },
  "docs.md": { en: "Docs", zh: "文档" },
  "publication.md": { en: "Publication", zh: "论文" },
  "course.md": { en: "Course", zh: "课程" },
};

export function pageLabel(name: string, locale: Locale): string {
  return pageLabels[name]?.[locale] ?? name.replace(/\.md$/, "");
}
