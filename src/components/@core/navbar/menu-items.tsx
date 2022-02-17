import { Link } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { header } from "@static/navmenu";
import { hasAccess } from "@utils/auth";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import NextLink from "../next-link";
import Search from "./search";

interface NavLinkProps {
  children;
  href;
  isDarkButton?;
  hidden?;
}

const NavLink = ({ children, href, isDarkButton, hidden }: NavLinkProps) => {
  const extraProps = isDarkButton
    ? { color: "white", bg: "blue.500", _hover: { bg: "blue.600" } }
    : { _hover: { bg: "gray.200" } };

  return (
    <NextLink href={href}>
      <Link px={2} py={1} rounded={"md"} {...extraProps} hidden={hidden}>
        {children}
      </Link>
    </NextLink>
  );
};

export default function MenuItems() {
  const { t, lang } = useTranslation();
  const { isPreviewMode } = useGlobalState();

  return (
    <>
      <Search />
      <NavLink href={SITE_CONFIG.PAGES.ABOUT[lang]}>{t("header:about")}</NavLink>
      {header.map((i) => (
        <NavLink
          href={i.url}
          key={i.url}
          hidden={!hasAccess(i.access) || (isPreviewMode && i.preview !== isPreviewMode)}
          isDarkButton={i?.isDarkButton}
        >
          {t(i.title)}
        </NavLink>
      ))}
    </>
  );
}
