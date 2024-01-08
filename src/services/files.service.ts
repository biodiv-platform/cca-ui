import { ENDPOINT, LOCAL_ASSET_PREFIX } from "@static/constants";
import { formDataHeaders, http } from "@utils/http";
import { nanoid } from "nanoid";

export const axUploadResource = async (file: File, dir = "pages", nestedPath?: string) => {
  const formData = new FormData();
  formData.append("hash", LOCAL_ASSET_PREFIX + nanoid());
  formData.append("directory", dir);
  formData.append("upload", file, file.name);
  formData.append("resource", "true");
  nestedPath && formData.append("nestedFolder", nestedPath);

  const { data } = await http.post(`${ENDPOINT.FILES}/upload/resource-upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return data;
};

/**
 * Used for uploading `userGrpoup` logo
 *
 * @param {IDBObservationAsset} resource
 * @returns
 */
export const axUploadUserGroupResource = async (resource: File, directory, nestedPath?: string) => {
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
