import { ENDPOINT } from "@static/constants";
import loadImage from "blueimp-load-image";

import notification from "./notification";

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

export const getUserImage = (resourceUrl, name, w = 50) => {
  return resourceUrl
    ? resourceUrl.startsWith("http")
      ? resourceUrl
      : `${ENDPOINT.FILES}/get/crop/users${resourceUrl}?w=${w}`
    : `/api/avatar?t=${name}&s=${w}`;
};

export const getTraitIcon = (resourceUrl, w = 40) => {
  return resourceUrl.startsWith("/next-assets/")
    ? resourceUrl
    : `${ENDPOINT.FILES}/get/crop/traits${resourceUrl}?w=${w}`;
};