import SITE_CONFIG from "@configs/site-config";

export const isBrowser = typeof window !== `undefined`;

const API_ENDPOINT = process.browser
  ? SITE_CONFIG.SITE.API_ENDPOINT
  : SITE_CONFIG.SITE.API_ENDPOINT_SSR;

export const ENDPOINT = {
  ACTIVITY: `${API_ENDPOINT}activity-api/api`,
  CCA: `${API_ENDPOINT}cca-api/api`,
  ESMODULE: `${API_ENDPOINT}esmodule-api/api`,
  FILES: `${API_ENDPOINT}files-api/api`,
  INTEGRATOR: `${API_ENDPOINT}integrator-api/api`,
  NAKSHA: `https://indiabiodiversity.org/naksha-api/api`,
  PAGES: `${API_ENDPOINT}pages-api/api`,
  USER: `${API_ENDPOINT}user-api/api`,
  RAW: `${API_ENDPOINT}biodiv`,
};

export const TOKEN = {
  BATOKEN: "BAToken",
  BRTOKEN: "BRToken",
  ACCESS: "access_token",
  REFRESH: "refresh_token",
  TIMEOUT: "timeout",
  TYPE: "Bearer "
};

export const FORWARD_BLACKLIST = ["login", "register"];

export const FORM_TYPE_OPTIONS = [
  { value: "TEXT", label: "Text Box" },
  { value: "TEXT_AREA", label: "Text Area" },
  { value: "RICHTEXT", label: "Rich Text" },
  { value: "HEADING", label: "Heading" },
  { value: "SINGLE_SELECT_DROPDOWN", label: "Single Select (Dropdown)" },
  { value: "SINGLE_SELECT_RADIO", label: "Single Select (Radio)" },
  { value: "MULTI_SELECT_DROPDOWN", label: "Multiple Select (Dropdown)" },
  { value: "MULTI_SELECT_CHECKBOX", label: "Multiple Select (Checkbox)" },
  { value: "NUMBER", label: "Number" },
  { value: "NUMBER_RANGE", label: "Number Range" },
  { value: "DATE", label: "Date" },
  { value: "DATE_RANGE", label: "Date Range" },
  { value: "YEAR", label: "Year" },
  { value: "FILE", label: "File" },
  { value: "GEOMETRY", label: "Geometry" }
];

export const FORM_TYPE = Object.fromEntries(FORM_TYPE_OPTIONS.map(({ value }) => [value, value]));

export const MINMAX_FORM_TYPES = [FORM_TYPE.NUMBER, FORM_TYPE.NUMBER_RANGE];

export const MINMAX_DATE_FORM_TYPES = [FORM_TYPE.DATE, FORM_TYPE.YEAR, FORM_TYPE.DATE_RANGE];

export const NON_FILTERABLE_FORM_TYPES = [FORM_TYPE.GEOMETRY, FORM_TYPE.FILE];

export const OPTION_FORM_TYPES = [
  FORM_TYPE.SINGLE_SELECT_DROPDOWN,
  FORM_TYPE.SINGLE_SELECT_RADIO,
  FORM_TYPE.MULTI_SELECT_DROPDOWN,
  FORM_TYPE.MULTI_SELECT_CHECKBOX
];

export const ACCORDIAN_TYPES = [
  FORM_TYPE.TEXT,
  FORM_TYPE.TEXT_AREA,
  FORM_TYPE.RICHTEXT,
  FORM_TYPE.GEOMETRY,
  FORM_TYPE.FILE
];

export const LOCAL_ASSET_PREFIX = "ibpmu-";

export const LICENSES = [
  "UNSPECIFIED",
  "CC-BY",
  "CC-BY-SA",
  "CC-BY-NC",
  "CC-BY-NC-SA",
  "CC-BY-NC-ND",
  "CC-BY-ND",
  "CC-PUBLIC-DOMAIN"
];

export const RESOURCE_TYPE = {
  CCA_DATA: "ccaData",
  CCA_TEMPLATE: "ccaTemplate"
};

export const OPTION_SEPRATOR = "|";

export const MENU_PORTAL_TARGET = isBrowser ? document.body : undefined;

export const LIST_PAGINATION_LIMIT = 10;
