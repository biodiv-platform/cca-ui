import SITE_CONFIG from "@configs/site-config";

import PagesMenuItem from "./pages-menu-item";

export default [
  {
    active: true,
    name: "header:browse",
    to: "/data/list",
    isDarkButton: true
  },
  {
    active: true,
    name: "header:users",
    to: "/user/list"
  },
  {
    active: SITE_CONFIG.PAGES.ACTIVE,
    cell: PagesMenuItem,
    isLazy: true,
    name: "header:menu_secondary.pages."
  }
];
