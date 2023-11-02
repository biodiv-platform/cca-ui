import SITE_CONFIG from "@configs/site-config";

import GroupListItem from "../../dark/right-menu/group-list-item";
import PagesMenuItem from "./pages-menu-item";

export default [
  {
    active: SITE_CONFIG.USERGROUP.ACTIVE,
    cell: GroupListItem,
    isLazy: true,
    name: "header:menu_primary.groups."
  },
  {
    active: SITE_CONFIG.PAGES.ACTIVE,
    cell: PagesMenuItem,
    isLazy: true,
    name: "header:menu_secondary.pages."
  }
];
