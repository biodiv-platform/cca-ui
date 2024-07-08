const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => config
});
