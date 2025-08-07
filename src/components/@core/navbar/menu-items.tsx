import { Box } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { axGetTree } from "@services/app.service";
import { header } from "@static/navmenu";
import { hasAccess } from "@utils/auth";
import { convertToMenuFormat } from "@utils/pages";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import LocalLink from "../local-link";
import MenuItems from "../navigation-menu/common/menu-items";
import Search from "./search";
import NoSSR from "../no-ssr";

interface NavLinkProps {
  children;
  href;
  hidden?;
}

const NavLink = ({ children, href, hidden }: NavLinkProps) => {
  const extraProps = { _hover: { bg: "gray.200" } };

  return (
    <Box px={2} py={1} rounded={"md"} {...extraProps} hidden={hidden} asChild>
      <LocalLink href={href} prefixGroup={true}>
        {children}
      </LocalLink>
    </Box>
  );
};

export default function PagesItems() {
  const { t } = useTranslation();
  const { isPreviewMode } = useGlobalState();

  const [pages, setPages] = useState<any[]>();

  useEffect(() => {
    axGetTree("").then(({ data }) => {
      setPages(data || []);
    });
  }, []);

  const filteredPages = pages?.filter((page) => SITE_CONFIG.PAGES.NAVBAR_ID.includes(page.id));
  const pagesMenu = convertToMenuFormat(filteredPages, "/page/", false, false);

  return (
    <>
      <NoSSR>
        <Search />
        {pagesMenu?.map((item) => <MenuItems key={item.name} {...item} prefixGroup={false} />)}
        {header.map((i) => (
          <NavLink
            href={i.url}
            key={i.url}
            hidden={!hasAccess(i.access) || (isPreviewMode && i.preview !== isPreviewMode)}
          >
            {t(i.title)}
          </NavLink>
        ))}
      </NoSSR>
    </>
  );
}
