import SITE_CONFIG from "@configs/site-config";
import axios from "axios";

const YOUTUBE_API_KEY = SITE_CONFIG.TOKENS.YOUTUBE_API_KEY;

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};

const extractVideoId = (url: string): string => {
  const videoIdRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&].*)?$/;
  const match = url.match(videoIdRegex);

  if (match) {
    return match[1];
  }
  return "";
};

export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "No video url provided" });
  }

  try {
    const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: "snippet",
        id: extractVideoId(url),
        key: YOUTUBE_API_KEY
      }
    });

    const video = data.items[0].snippet;

    res.json({
      href: url,
      title: video.title,
      description: truncateDescription(video.description, 300),
      image: video.thumbnails.default.url
    });
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
}
