/* eslint-disable @typescript-eslint/no-var-requires */
const { LANG } = require("./src/configs/site-config");

module.exports = {
  defaultLocale: LANG.DEFAULT,
  locales: Object.keys(LANG.LIST),
  pages: {
    "*": ["common", "header", "auth", "form"],
    "/": ["home"],
    "rgx:/data/": ["template", "activity"],
    "rgx:/page/": ["page"],
    "rgx:/participate/": ["template"],
    "rgx:/register": ["user"],
    "rgx:/template/": ["template", "activity"],
    "rgx:/user/": ["user"]
  }
};
