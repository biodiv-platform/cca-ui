import { Link } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { header } from "@static/navmenu";
import { hasAccess } from "@utils/auth";
import { convertToMenuFormat } from "@utils/pages";
import { processUserGroupName } from "@utils/userGroup";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import MainItems from "../../@core/navigation-menu/common/menu-items";
import NextLink from "../next-link";
import Search from "./search";

interface NavLinkProps {
  children;
  href;
  hidden?;
}

const NavLink = ({ children, href, hidden }: NavLinkProps) => {
  const extraProps = { _hover: { bg: "gray.200" } };

  return (
    <NextLink href={href}>
      <Link px={2} py={1} rounded={"md"} {...extraProps} hidden={hidden}>
        {children}
      </Link>
    </NextLink>
  );
};

export default function MenuItems() {
  const { t } = useTranslation();
  const { isPreviewMode } = useGlobalState();
  const { pages, currentGroup } = useGlobalState();
  const groupPage = `/group/${processUserGroupName(currentGroup.name)}/page/`;
  const outputMenuFormat = currentGroup.id
    ? convertToMenuFormat(pages, groupPage, true, false)
    : convertToMenuFormat(pages, "/page/", true, false);

  return (
    <>
      <Search />
      {outputMenuFormat.map((item) => (
        <MainItems key={item.name} {...item} />
      ))}
      {header.map((i) => (
        <NavLink
          href={i.url}
          key={i.url}
          hidden={!hasAccess(i.access) || (isPreviewMode && i.preview !== isPreviewMode)}
        >
          {t(i.title)}
        </NavLink>
      ))}
    </>
  );
}
