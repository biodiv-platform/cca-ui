import { Link } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { header } from "@static/navmenu";
import { hasAccess } from "@utils/auth";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import LocalLink from "../local-link";
import Search from "./search";

interface NavLinkProps {
  children;
  href;
  hidden?;
}

const NavLink = ({ children, href, hidden }: NavLinkProps) => {
  const extraProps = { _hover: { bg: "gray.200" } };

  return (
    <LocalLink href={href} prefixGroup={true}>
      <Link px={2} py={1} rounded={"md"} {...extraProps} hidden={hidden}>
        {children}
      </Link>
    </LocalLink>
  );
};

export default function MenuItems() {
  const { t } = useTranslation();
  const { isPreviewMode } = useGlobalState();

  return (
    <>
      <Search />
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
