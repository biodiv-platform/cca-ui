/* eslint-disable @typescript-eslint/no-var-requires */
const { LANG } = require("./src/configs/site-config");

module.exports = {
  defaultLocale: LANG.DEFAULT,
  locales: Object.keys(LANG.LIST),
  pages: {
    "*": ["common", "header", "auth", "form"],
    "/": ["home"],
    "rgx:/data/": ["template", "activity"],
    "/group/[groupName]": ["home"],
    "/group/[groupName]/show": ["home"],
    "rgx:/admin": ["admin", "group"],
    "rgx:/group/": ["group"],
    "rgx:/page/": ["page"],
    "rgx:/participate/": ["template"],
    "rgx:/register": ["user"],
    "rgx:/template/": ["template", "activity"],
    "rgx:/user/": ["user", "filters"]
  }
};
