// import { fetch } from "fetch-opengraph";

// export default async function handler(req, res) {
//   const data = await fetch(req.query.url);

//   res.json({
//     href: req.query.url,
//     title: data.title,
//     image: data.image,
//     description: data.description,
//   });
// }

import ogs from "open-graph-scraper";

export default async function handler(req, res) {
  const options = { url: req.query.url };
  const { result, error } = await ogs(options);

  if (error) {
    res.status(500).json({ error: "Failed to fetch Open Graph metadata" });
  } else {
    const imageUrl = Array.isArray(result.ogImage) ? result.ogImage[0]?.url : result.ogImage?.url;

    res.json({
      href: req.query.url,
      title: result.ogTitle,
      image: imageUrl || null,
      description: result.ogDescription || null
    });
  }
}
