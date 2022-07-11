import { axGetDataListMap } from "@services/cca.service";
import type { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";

async function sitemap(req: NextApiRequest, res: NextApiResponse<string>) {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`
    });

    const ccaList = await axGetDataListMap();

    ccaList.data.forEach((cca) => {
      smStream.write({
        url: `/data/show/${cca.id}`,
        changefreq: "weekly",
        priority: 1.0
      });
    });

    smStream.end();

    const sitemapOutput = (await streamToPromise(smStream)).toString();

    res.writeHead(200, { "Content-Type": "application/xml" });

    res.end(sitemapOutput);
  } catch (e) {
    console.error(e);
    res.send(JSON.stringify(e));
  }
}

export default sitemap;
