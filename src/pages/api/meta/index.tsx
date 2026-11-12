import { fetch } from "fetch-opengraph";

/** og:image may be relative to the page (IBP gives "/files-api/..."), so make it absolute */
const toAbsoluteUrl = (value: string, pageUrl: string) => {
  try {
    return value ? new URL(value, pageUrl).href : undefined;
  } catch {
    return undefined;
  }
};

/** Decodes the HTML entities that can appear in a URL attribute */
const decodeEntities = (value: string) =>
  value
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&#x2F;|&#47;/gi, "/")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");

/**
 * Content of the first og:image meta tag. fetch-opengraph keeps the last one when a page
 * has several, but link previews elsewhere (and IBP's own order) use the first.
 */
const getFirstOgImage = (html?: string) => {
  for (const tag of html?.match(/<meta[^>]+>/gi) || []) {
    if (/(?:property|name)\s*=\s*["']og:image["']/i.test(tag)) {
      const content = tag.match(/content\s*=\s*["']([^"']*)["']/i)?.[1];
      if (content) {
        return decodeEntities(content);
      }
    }
  }
  return undefined;
};

export default async function handler(req, res) {
  try {
    const data = await fetch(req.query.url, {}, true);

    res.json({
      href: req.query.url,
      title: data.title,
      image: toAbsoluteUrl(getFirstOgImage(data.raw) || data.image, req.query.url),
      description: data.description
    });
  } catch (e) {
    // the page could not be read, e.g. a 403 from bot protection
    res.status(502).json({ href: req.query.url, error: e?.message });
  }
}
