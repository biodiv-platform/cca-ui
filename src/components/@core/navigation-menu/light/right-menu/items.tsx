import SITE_CONFIG from "@configs/site-config";

import PagesMenuItem from "./pages-menu-item";

export default [
  {
    name: "header:stats",
    to: "/chart",
    isDarkButton: true
  },
  {
    name: "header:browse",
    to: "/data/list",
    isDarkButton: true
  },
  {
    active: SITE_CONFIG.NAKSHA_PAGE,
    name: "Maps",
    to: "/map"
  },
  {
    active: true,
    name: "header:users",
    to: "/user/list"
  },
  {
    cell: PagesMenuItem,
    isLazy: true,
    name: "header:menu_secondary.pages.title",
    active: true
  }
];
