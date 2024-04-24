import { Link, MenuItem, MenuList } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import notification from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

const getPageLink = (lang, to) => {
  return typeof to === "string" ? to : to?.[lang] || to?.[SITE_CONFIG.LANG.DEFAULT];
};

export default function SubMenu({ rows, prefix = "" }) {
  const { t, lang } = useTranslation();
  const { isCurrentGroupMember, isLoggedIn } = useGlobalState();

  const memoizedRows = useMemo(
    () =>
      rows.map((item) => ({
        label: item.name && t(prefix + item.name),
        toLink: getPageLink(lang, item.to)
      })),
    [rows, lang, prefix, t]
  );

  return (
    <MenuList>
      {memoizedRows.map((item, index) => (
        <MenuItem key={index}>
          {isLoggedIn && item.memberOnly && isCurrentGroupMember === false ? (
            <Link w="full" onClick={() => notification(t("header:member_only"))}>
              {item.label}
            </Link>
          ) : (
            <LocalLink href={item.toLink} params={rows[index].params} prefixGroup={true}>
              <Link w="full">{item.label}</Link>
            </LocalLink>
          )}
        </MenuItem>
      ))}
    </MenuList>
  );
}
