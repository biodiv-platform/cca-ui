import { ENDPOINT } from "@static/constants";
import { http, plainHttp } from "@utils/http";

/**
 * removes `memory-cache` data from memory
 *
 */
export const axClearMemoryCache = async () => {
  try {
    await plainHttp.get(`${ENDPOINT.API}/memory-cache/clear`);
  } catch (e) {
    console.error(e);
  }
};

export const extractVideoId = (url: string): string => {
  const videoIdRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&].*)?$/;
  const match = url.match(videoIdRegex);

  if (match) {
    return match[1];
  }
  return "";
};

export const axGetOpenGraphMeta = async (url) => {
  // Check if the URL is a YouTube URL
  if (url.includes("youtube.com/watch?v=") || url.includes("youtu.be/")) {
    // Extract the video ID from the YouTube URL
    const videoId = extractVideoId(url);

    if (videoId) {
      try {
        const { data } = await http.get(`/api/youtube-meta`, { params: { videoId } });

        return { success: true, data };
      } catch (e) {
        console.error("Error fetching YouTube metadata", e);
        return { success: false, data: {} };
      }
    }
  }
  try {
    const { data } = await plainHttp.get(`/api/meta`, { params: { url } });
    return { success: true, data };
  } catch (e) {
    console.error("Error fetching Open Graph metadata", e);
    return { success: false, data: {} };
  }
};
