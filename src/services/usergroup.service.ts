import { ENDPOINT } from "@static/constants";
import { formDataHeaders, http,plainHttp } from "@utils/http";
import { nanoid } from "nanoid";

import { axClearMemoryCache } from "./api.service";

export const axUserGroupCreate = async (payload) => {
  try {
    const { data } = await http.post(`${ENDPOINT.USERGROUP}/v1/group/create`, payload);
    await axClearMemoryCache();
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axUploadResource = async (resource: File, directory, nestedPath?: string) => {
  try {
    const formData = new FormData();
    formData.append("hash", nanoid());
    formData.append("upload", resource, resource.name);
    formData.append("directory", directory);
    formData.append("resource", "true");
    nestedPath && formData.append("nestedFolder", nestedPath);

    const { data } = await http.post(`${ENDPOINT.FILES}/upload/resource-upload`, formData, {
      headers: formDataHeaders
    });
    return { success: true, data: data.uri };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const fetchGroups = async () => {
  const GROUPS_API_URL = `${ENDPOINT.USERGROUP}/v1/group/list`;
  try {
    const response = await plainHttp.get(GROUPS_API_URL);
    const { data } = response;
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching groups:", error);
    return { success: false, data: [] };
  }
};

export const fetchGroupDetails = async (groupId) => {
  try {
    const response = await plainHttp.get(`${ENDPOINT.USERGROUP}/v1/group/${groupId}`);
    const { data } = response;
    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching group details for groupId ${groupId}:`, error);
    return { success: false, data: null };
  }
};

export const axGetGroupEditInfoByGroupId = async (groupId, ctx) => {
  try {
    const { data } = await http.get(`${ENDPOINT.USERGROUP}/v1/group/edit/${groupId}`, {
      params: { ctx }
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};
