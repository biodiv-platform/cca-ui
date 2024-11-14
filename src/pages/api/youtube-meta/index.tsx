import SITE_CONFIG from "@configs/site-config";
import axios from "axios";

// Your YouTube Data API key
const YOUTUBE_API_KEY = SITE_CONFIG.TOKENS.YOUTUBE_API_KEY;

// Function to truncate the description if it's too long
const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "..."; // Truncate and add ellipsis
  }
  return description; // Return as is if it's not too long
};

export default async function handler(req, res) {
  const videoId = req.query.videoId;

  if (!videoId) {
    return res.status(400).json({ error: "No video ID provided" });
  }

  try {
    // Fetch metadata from YouTube Data API v3
    const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: "snippet",
        id: videoId,
        key: YOUTUBE_API_KEY
      }
    });

    const video = data.items[0].snippet;

    // Return the YouTube metadata
    res.json({
      href: `https://www.youtube.com/watch?v=${videoId}`,
      title: video.title,
      description: truncateDescription(video.description, 300),
      image: video.thumbnails.default.url
    });
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
}
