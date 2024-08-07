import SITE_CONFIG from "@configs/site-config";

import { parseEXIF } from "./date";

export const getMapCenter = (zoomDiff, extra = {}) => ({
  ...SITE_CONFIG.MAP.CENTER,
  bearing: 0,
  pitch: 0,
  zoom: SITE_CONFIG.MAP.CENTER.zoom + (zoomDiff || 0),
  ...extra
});

/**
 * This function is designed to use existing pre-initialized
 * google maps instance and perform reverse geocode
 *
 * @export
 * @param {*} location
 */
export function reverseGeocode(location) {
  return new Promise<any[]>((resolve, reject) => {
    if (process.browser) {
      const geocoder = new (window as any).google.maps.Geocoder();
      geocoder.geocode({ location }, function (results, status) {
        if (status === "OK" && results.length > 0) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    } else {
      reject();
    }
  });
}

/**
 * Converts flat coordinates from query param (string) to feature object
 *
 * @param {*} costr
 * @returns
 */
export const stringToFeature = (costr) => {
  try {
    const coarr = costr.split(",");
    const coordinates: any = [];
    for (let i = 0; i < coarr.length; i += 2) {
      coordinates.push([Number(coarr[i]), Number(coarr[i + 1])]);
    }
    return [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [coordinates]
        }
      }
    ];
  } catch (e) {
    console.error(e);
    return [];
  }
};

const ConvertDMSToDD = (dms, direction) => {
  try {
    const [degrees, minutes, seconds] = dms.split(",");

    const m1 = Number(minutes) / 60;
    const s1 = Number(seconds) / (60 * 60);
    const d1 = Number(degrees);

    let dd = d1 + m1 + s1;

    if (direction === "S" || direction === "W") dd *= -1;

    return Number(dd.toFixed(4));
  } catch (e) {
    console.warn("Unable to parse GPS");
  }
};

export const CleanExif = (data, blockHash) => {
  if (!data) return {};

  const exif = data.getAll();

  return {
    latitude: ConvertDMSToDD(exif?.GPSInfo?.GPSLatitude, exif?.GPSInfo?.GPSLatitudeRef),
    longitude: ConvertDMSToDD(exif?.GPSInfo?.GPSLongitude, exif?.GPSInfo?.GPSLongitudeRef),
    dateCreated: parseEXIF(exif?.Exif?.DateTimeOriginal),
    blockHash
  };
};

export const getMapDataProps = (data) => {
  const features = data.map((point) => ({
    type: "Feature",
    properties: { id: point.id },
    geometry: {
      type: "Point",
      coordinates: [point.lng, point.lat]
    }
  }));

  const lats = data.map((point) => point.lat);
  const lngs = data.map((point) => point.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const bounds = [
    [minLng, minLat],
    [maxLng, maxLat]
  ];

  const WORLD_DIM = { height: 512, width: 512 }; // default dimensions
  const ZOOM_MAX = 20;

  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;

  const latZoom = Math.log2(WORLD_DIM.height / latDiff);
  const lngZoom = Math.log2(WORLD_DIM.width / lngDiff);

  const zoom = Math.min(latZoom, lngZoom, ZOOM_MAX) - 1; // Adjust zoom level as needed

  return {
    bounds,
    zoom,
    geoJSON: {
      type: "FeatureCollection",
      features
    }
  };
};
