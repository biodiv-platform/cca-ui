import { ENDPOINT } from "@static/constants";
import { plainHttp } from "@utils/http";

/**
 * This function is written for legacy support when migration happens to microservices
 * please remove this and ask for property named `key` (alias of `id`) as a string
 *
 * @param {*} list
 */

/**
 * returns Array of Taxon IDs based on term (text search)
 *
 * @param {*} term
 * @returns
 */

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
