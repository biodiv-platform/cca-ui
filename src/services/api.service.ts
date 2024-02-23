import { ENDPOINT } from "@static/constants";
import { plainHttp } from "@utils/http";

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

export const axGetOpenGraphMeta = async (url) => {
  try {
    const { data } = await plainHttp.get(`/api/meta`, { params: { url } });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};
