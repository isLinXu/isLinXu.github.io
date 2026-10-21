import { useEffect } from "react";

function upsertMeta(
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

/**
 * Keeps <title> and the main SEO / social meta tags in sync with the page
 * currently rendered on the client. The static tags in public/index.html stay
 * as the fallback for crawlers that do not execute JavaScript.
 */
export default function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (!description) {
      return;
    }

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description
    );
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      description
    );
  }, [title, description]);
}
