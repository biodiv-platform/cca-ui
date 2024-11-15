const SITE_CONFIG_EXAMPLE = {
  TEMPLATE: {
    MAIN: "master"
  },
  LANG: {
    DEFAULT: "en",
    DEFAULT_ID: 205,
    LIST: {
      en: { NAME: "English", ID: 205 },
      hi: { NAME: "Hindi", ID: 206 }
    },
    SWITCHER: true
  },
  SITE: {
    API_ENDPOINT: "http://localhost:8010/proxy/",
    API_ENDPOINT_SSR: "http://localhost:8010/proxy/",
    ICON: "/logo.svg",
    TITLE: {
      en: "Community Conserved Areas"
    },
    URL: "http://localhost:3000"
  },
  TOKENS: {
    GMAP: "X",
    RECAPTCHA: "X",
    OAUTH_GOOGLE: "x.apps.googleusercontent.com",
    YOUTUBE_API_KEY: "X"
  },
  REGISTER: {
    MOBILE: true
  },
  MAP: {
    CENTER: {
      latitude: 22.0,
      longitude: 79.1,
      zoom: -0.28
    },
    COUNTRY: "IN"
  },
  PAGES: {
    ABOUT: {
      en: "/page/show/x",
      hi: "/page/show/x"
    },
    DONATE: {
      en: "/page/show/x",
      hi: "/page/show/x"
    },
    PARTICIPATE_ID: {
      en: 1,
      hi: 1
    },
    NAVBAR_ID: [5965]
  },
  FOOTER: {
    FACEBOOK: "https://www.facebook.com/x",
    GITHUB: "https://github.com/biodiv-platform?q=cca",
    INSTAGRAM: "https://www.instagram.com/x",
    MAIL: "mailto:user@example.com",
    YOUTUBE: "https://youtube.com/x",
    PARENT_PAGE_ID: {
      en: 0,
      hi: 0
    }
  },
  CCA: {
    TITLE_FIELD_IDS: ["1"],
    FEATURED_IDS: [1, 2, 3, 4]
  },
  USERGROUP: {
    ACTIVE: true
  }
};

module.exports = SITE_CONFIG_EXAMPLE;
