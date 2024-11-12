import ogs from "open-graph-scraper";

export default async function handler(req, res) {
  const options = { url: req.query.url };
  const { result, error } = await ogs(options);

  if (error) {
    res.status(500).json({ error: "Failed to fetch Open Graph metadata" });
  } else {
    const imageUrl = Array.isArray((result as any).ogImage)
      ? (result as any).ogImage[0]?.url
      : (result as any).ogImage?.url;

    res.json({
      href: req.query.url,
      title: (result as any).ogTitle,
      image: imageUrl || null,
      description: (result as any).ogDescription || null
    });
  }
}
