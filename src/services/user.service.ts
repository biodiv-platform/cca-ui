import { ENDPOINT } from "@static/constants";
import { http, plainHttp } from "@utils/http";

export const axGetUserById = async (userId, ctx) => {
  try {
    const { data } = await http.get(`${ENDPOINT.INTEGRATOR}/v1/services/read/profile/${userId}`, {
      params: { ctx, skipRefresh: true }
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axUpdateUserAbout = async (payload) => {
  try {
    const { status } = await http.put(`${ENDPOINT.USER}/v1/user/update/details`, payload);
    return { success: status === 200 };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axUpdateNotifications = async (payload) => {
  try {
    const { status } = await http.put(`${ENDPOINT.USER}/v1/user/update/emailPreferences`, payload);
    return { success: status === 200 };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axUpdateUserImage = async (payload) => {
  try {
    const { status } = await http.put(
      `${ENDPOINT.USER}/v1/user/update/image`,
      {},
      { params: payload }
    );
    return { success: status === 200 };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axUpdateUserPassword = async (payload) => {
  try {
    const { status, data } = await http.post(
      `${ENDPOINT.USER}/v1/authenticate/change-password`,
      payload
    );
    return { success: status === 200 && data.status };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axGetUserRoles = async () => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.USER}/v1/roles/all`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const axUpdateUserPermissions = async (payload) => {
  try {
    const { status } = await http.put(`${ENDPOINT.USER}/v1/user/update/roles`, payload);
    return { success: status === 200 };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axDeleteUser = async (userId) => {
  try {
    const { status } = await http.delete(`${ENDPOINT.USER}/v1/user/delete/${userId}`);
    return { success: status === 200 };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axGetUserList = async (
  params,
  payload = {},
  isAdmin = false,
  index = "extended_user",
  type = "_doc"
) => {
  const httpReq = isAdmin ? http : plainHttp;
  try {
    const { data } = await httpReq.post(`${ENDPOINT.USER}/v1/user/list/${index}/${type}`, payload, {
      params
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};
