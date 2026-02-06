/* eslint-disable @typescript-eslint/no-var-requires */
const { LANG } = require("./src/configs/site-config");

module.exports = {
  defaultLocale: LANG.DEFAULT,
  locales: Object.keys(LANG.LIST),
  pages: {
    "*": ["common", "header", "auth", "form", "group"],
    "/": ["home"],
    "rgx:/data/": ["template", "activity", "filters"],
    "rgx:/document/": ["document", "observation", "filters", "activity"],
    "/group/[groupName]": ["home"],
    "/group/[groupName]/show": ["home"],
    "rgx:/admin": ["admin", "group"],
    "/group/[groupName]/chart": ["chart"],
    "rgx:/map": ["page", "map"],
    "/chart": ["chart"],
    "rgx:/admin": ["admin"],
    "rgx:/page/": ["page", "activity"],
    "rgx:/participate/": ["template"],
    "rgx:/register": ["user"],
    "rgx:/template/": ["template", "activity"],
    "rgx:/user/": ["user", "filters"]
  }
};
