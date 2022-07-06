import { ENDPOINT } from "@static/constants";
import { plainHttp } from "@utils/http";

export const axListActivity = async (objectType, objectId, offset = 0, limit = 3) => {
  try {
    const res = await plainHttp.get(
      `${ENDPOINT.ACTIVITY}/v1/service/ibp/${objectType}/${objectId}`,
      { params: { offset, limit } }
    );
    return {
      success: true,
      data: res.data.activity,
      offset: offset + res.data.activity.length,
      hasMore: res.data.activity.length === limit,
      commentCount: res.data.commentCount
    };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};
