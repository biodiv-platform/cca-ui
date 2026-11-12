import { fetch } from "fetch-opengraph";

/** og:image may be relative to the page (IBP gives "/files-api/..."), so make it absolute */
const toAbsoluteUrl = (value: string, pageUrl: string) => {
  try {
    return value ? new URL(value, pageUrl).href : undefined;
  } catch {
    return undefined;
  }
};

export default async function handler(req, res) {
  try {
    const data = await fetch(req.query.url);

    res.json({
      href: req.query.url,
      title: data.title,
      image: toAbsoluteUrl(data.image, req.query.url),
      description: data.description
    });
  } catch (e) {
    // the page could not be read, e.g. a 403 from bot protection
    res.status(502).json({ href: req.query.url, error: e?.message });
  }
}
