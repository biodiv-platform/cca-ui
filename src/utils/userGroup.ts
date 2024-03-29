import SITE_CONFIG from "@configs/site-config";
import { UserGroupCCA } from "@interfaces/userGroup";
import { DEFAULT_GROUP } from "@static/constants";
import { stringify } from "@utils/query-string";

import { getGroupImage } from "./media";

export const transformUserGroupList = (list: UserGroupCCA[]): UserGroupCCA[] => {
  return list.map((group: UserGroupCCA) => ({
    ...group,
    webAddress: group.webAddress?.startsWith("/")
      ? SITE_CONFIG.SITE.URL + group.webAddress
      : group.webAddress,
    icon: getGroupImage(group.icon)
  }));
};

export const findCurrentUserGroup = (
  groups: UserGroupCCA[],
  currentURL: string,
  lang?: string
): UserGroupCCA => {
  const defaultGroup = {
    ...DEFAULT_GROUP,
    name: SITE_CONFIG.SITE.TITLE?.[lang || SITE_CONFIG.LANG.DEFAULT] || DEFAULT_GROUP.name
  };

  return (
    (currentURL &&
      groups.find(
        (group: UserGroupCCA) => group.webAddress && currentURL.startsWith(group.webAddress)
      )) ||
    defaultGroup
  );
};

export const getManifestURL = (group: UserGroupCCA) => {
  const { name, icon } = group;
  return `/api/manifest.json?${stringify({ name, icon })}`;
};

export const reorderRemovedGallerySetup = (data, index) => {
  const list = data.sort((a, b) => a.displayOrder - b.displayOrder);
  const removedDisplayOrder = data[index].displayOrder;

  const serializeDisplayOrder = () => {
    return list.reduce((acc, item) => {
      if (item.displayOrder !== removedDisplayOrder) {
        if (item.displayOrder > removedDisplayOrder) {
          item.displayOrder = item.displayOrder - 1;
        }
        acc.push(item);
      }
      return acc;
    }, []);
  };
  const response = list.length <= 1 ? list : serializeDisplayOrder();

  return {
    response,
    payload: response.map(({ id, displayOrder }) => ({ galleryId: id, displayOrder }))
  };
};

export const processUserGroupName = (name) => {
  return name.replace(/\s/g, "_");
};
