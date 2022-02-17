import SITE_CONFIG from "@configs/site-config";

export const getLanguageId = (lang) => SITE_CONFIG.LANG.LIST?.[lang];
