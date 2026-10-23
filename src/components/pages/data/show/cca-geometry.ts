import { FORM_TYPE } from "@static/constants";

/**
 * The geometry field value is stored as a FeatureCollection, but the form keeps it
 * as a plain array of features, so accept both.
 */
export const toFeatureCollection = (value) => {
  if (!value) return null;
  if (Array.isArray(value)) return { type: "FeatureCollection", features: value };
  if (value.type === "FeatureCollection") return value;
  if (value.type === "Feature") return { type: "FeatureCollection", features: [value] };
  return null;
};

/** The CCA's location as a FeatureCollection, or null when it has none */
export const getCcaGeometry = (response) => {
  const geometryField = Object.values<any>(response?.ccaFieldValues ?? {}).find(
    (f) => f?.type === FORM_TYPE.GEOMETRY
  );
  return toFeatureCollection(geometryField?.value);
};

export const isPolygonFeature = (f) => ["Polygon", "MultiPolygon"].includes(f?.geometry?.type);
export const isPointFeature = (f) => ["Point", "MultiPoint"].includes(f?.geometry?.type);

/** Which kinds of geometry the CCA has; points and the other shapes are buffered separately */
export const getGeometryKinds = (geometry) => {
  const features = geometry?.features ?? [];
  return {
    hasPolygon: features.some(isPolygonFeature),
    hasPoint: features.some(isPointFeature),
    hasShape: features.some((f) => f?.geometry && !isPointFeature(f))
  };
};
