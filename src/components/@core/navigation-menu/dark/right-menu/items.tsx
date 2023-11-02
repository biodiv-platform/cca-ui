import SITE_CONFIG from "@configs/site-config";

import GroupListItem from "./group-list-item";

export default [
  {
    active: SITE_CONFIG.USERGROUP.ACTIVE,
    cell: GroupListItem,
    isLazy: true,
    name: "header:menu_primary.groups."
  }
];
