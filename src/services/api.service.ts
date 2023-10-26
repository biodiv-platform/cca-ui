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
