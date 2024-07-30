import { ResourceType } from "@interfaces/custom";
import { AUDIO_TYPES, ENDPOINT, IMAGE_TYPES, VIDEO_TYPES } from "@static/constants";
import loadImage from "blueimp-load-image";

import notification from "./notification";

export const RESOURCE_CTX = {
  MY_UPLOADS: "MY_UPLOADS",
  PAGES: "PAGES",
  USERGROUPS: "USERGROUPS",
  DOCUMENT_SOCIAL_PREVIEW: "DOCUMENT_SOCIAL_PREVIEW"
};

const RESOURCE_CTX_MAP = {
  MY_UPLOADS: "myUploads",
  PAGES: "pages",
  USERGROUPS: "userGroups",
  DOCUMENT_SOCIAL_PREVIEW: "documentSocialPreview"
};

export function resizeImage(file: File, max = 1000): Promise<any> {
  return new Promise((resolve) => {
    loadImage(
      file,
      (img, data) => {
        try {
          if (data?.exif) {
            // fix orientation
            if (data.exif[274]) {
              loadImage.writeExifData(data.imageHead, data, "Orientation", 1);
            }

            // replace imageHead to restore exif of original image
            img.toBlob((blob) => {
              loadImage.replaceHead(blob, data.imageHead, resolve);
            }, file.type);
          } else {
            img.toBlob(resolve);
          }
        } catch (e) {
          console.warn("EXIF Failed", e);
          if (!img.toBlob) {
            notification("Outdated/Unsupported Browser");
          }
          img.toBlob(resolve);
        }
      },
      {
        meta: true,
        canvas: true,
        orientation: true,
        maxWidth: max,
        maxHeight: max
      }
    );
  });
}

export const getResourceThumbnail = (resourceUrl, size = "?h=64") => {
  return resourceUrl ? `${resourceUrl.replace("/raw/", "/crop/")}${size}` : undefined;
};

export const getNextResourceThumbnail = (resourceType, resourceUrl, size) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/crop/${RESOURCE_CTX_MAP[resourceType]}/${resourceUrl}${size}`
    : undefined;
};

export const getUserImage = (resourceUrl, name, w = 50) => {
  return resourceUrl
    ? resourceUrl.startsWith("http")
      ? resourceUrl
      : `${ENDPOINT.FILES}/get/crop/users${resourceUrl}?w=${w}`
    : `/api/avatar?t=${name}&s=${w}`;
};

export const getResourceRAW = (resourceType, resourceUrl) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/raw/${RESOURCE_CTX_MAP[resourceType]}/${resourceUrl}`
    : undefined;
};

export const getTraitIcon = (resourceUrl, w = 40) => {
  return resourceUrl.startsWith("/next-assets/")
    ? resourceUrl
    : `${ENDPOINT.FILES}/get/crop/traits${resourceUrl}?w=${w}`;
};

export const getGroupImage = (resourceUrl) => {
  return `${ENDPOINT.FILES}/get/crop/userGroups${resourceUrl}`;
};

export const getGroupImageThumb = (resourceUrl, height = 32) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/crop/userGroups${resourceUrl}?h=${height}`
    : `/next-assets/species/Unknown.svg`;
};

export const getGroupImageThumbForDatatable = (resourceUrl, height = 32) => {
  return resourceUrl ? `${resourceUrl}?h=${height}` : `/next-assets/species/Unknown.svg`;
};

export const getLocalIcon = (icon, type = "species") =>
  `/next-assets/${type}/${icon || "Unknown"}.svg`;

/**
 * Uses Google Docs viewer to avoid CORS issue
 *
 * @param {string} resourceUrl
 * @return {*}  {string}
 */
export const getDocumentPath = (resourceUrl): string => {
  return `/pdf-viewer/?file=${getDocumentFilePath(resourceUrl)}`;
};

export const getDocumentFilePath = (resourceUrl): string => {
  return resourceUrl?.startsWith("http")
    ? resourceUrl
    : `${ENDPOINT.RAW}/content/documents${resourceUrl}`;
};

export const getSupportedTypeByPath = (path) => {
  if (IMAGE_TYPES.some((type) => path.endsWith(type))) {
    return ResourceType.Image;
  }
  if (VIDEO_TYPES.some((type) => path.endsWith(type))) {
    return ResourceType.Video;
  }
  if (AUDIO_TYPES.some((type) => path.endsWith(type))) {
    return ResourceType.Audio;
  }
  return ResourceType.Unsupported;
};
