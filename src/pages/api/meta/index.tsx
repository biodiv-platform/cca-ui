import { fetch } from "fetch-opengraph";

export default async function handler(req, res) {
  try {
    const data = await fetch(req.query.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
      }
    });

    res.json({
      href: req.query.url,
      title: data.title,
      image: data.image,
      description: data.description
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch OG data" });
  }
}
