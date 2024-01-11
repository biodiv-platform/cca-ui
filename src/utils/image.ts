import { ACCEPTED_FILE_TYPES } from "@static/constants";
import notification from "@utils/notification";
import loadImage from "blueimp-load-image";

import { CleanExif } from "./location";
import { getBlockHash } from "./phash";

export async function resizeImage(file: File, max = 3000): Promise<any> {
  try {
    const blockHash = await getBlockHash(file);

    const response = await new Promise((resolve) => {
      loadImage(
        file,
        (img, data) => {
          if (data?.exif) {
            // fix orientation
            if (data.exif[274]) {
              loadImage.writeExifData(data.imageHead, data, "Orientation", 1);
            }

            // replace imageHead to restore exif of original image
            img.toBlob((blob) => {
              loadImage.replaceHead(blob, data.imageHead, (d) =>
                resolve([d, CleanExif(data?.exif, blockHash)])
              );
            }, file.type);
          } else {
            img.toBlob((d) => resolve([d, { blockHash }]));
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

    return response;
  } catch (e) {
    const resourceTypeFileFormat = "." + file.name.substring(file.name.lastIndexOf(".") + 1);

    if (!ACCEPTED_FILE_TYPES["image/*"].includes(resourceTypeFileFormat)) {
      console.warn(resourceTypeFileFormat + " format not supported ");
      notification(resourceTypeFileFormat + " format not supported ");
    } else {
      console.warn("EXIF Failed", e);
      notification("Outdated/Unsupported Browser");
    }
  }

  return [file, {}];
}

export async function resizePredictImage(file: File): Promise<any> {
  try {
    const response = await new Promise((resolve) => {
      loadImage(file, (image) => resolve(image.toDataURL()), {
        maxWidth: 200,
        meta: true,
        orientation: true,
        canvas: true
      });
    });

    return response;
  } catch (e) {
    console.warn("Resize Failed", e);
    notification("Outdated/Unsupported Browser");
  }

  return undefined;
}
