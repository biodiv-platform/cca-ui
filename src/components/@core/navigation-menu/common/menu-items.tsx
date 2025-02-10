import { Box, Button, Link, useBreakpointValue } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuChevronDown } from "react-icons/lu";

import { MenuRoot, MenuTrigger } from "@/components/ui/menu";

import SubMenu from "./sub-menu";

const buttonProps = {
  colorScheme: "blue",
  _hover: { bg: "blue.600" },
  style: { height: "32px" }
};

const SimpleLink = ({ children, to, params, isDarkButton, prefixGroup }) => (
  <LocalLink href={to} params={params} prefixGroup={prefixGroup}>
    {isDarkButton ? (
      <Button {...buttonProps}>
        <Link>{children}</Link>
      </Button>
    ) : (
      <Link>{children}</Link>
    )}
  </LocalLink>
);

export default function MenuItems(props) {
  const {
    name,
    nameIcon: NameIcon,
    to,
    rows = [],
    cell: CCell,
    params,
    isLazy,
    isDarkButton,
    prefixGroup
  } = props;
  const isDropdown = rows.length > 0 || CCell;
  const { t } = useTranslation();

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const linkContent = (
    <>
      {NameIcon && <NameIcon mr={1} />}
      {t(`${name}`)}
    </>
  );
  const desktopLinkStyle = { display: "flex", alignItems: "center", marginLeft: "20px" };
  const mobileLinkStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    mr: 1
  };
  const menuButton = (
    <Box
      as="button"
      role="button"
      tabIndex={0}
      ml={2}
      display="flex"
      alignItems="left"
      mb={isDesktop ? 0 : 4}
    >
      <MenuTrigger data-label={t(`${name}`)} role="button" tabIndex={0}>
        <LuChevronDown aria-label="Open Menu" />
      </MenuTrigger>
    </Box>
  );

  return isDropdown ? (
    <MenuRoot positioning={{ placement: "bottom-end" }} lazyMount={isLazy}>
      <>
        <Box css={isDesktop ? desktopLinkStyle : mobileLinkStyle}>
          <SimpleLink to={to} params={params} prefixGroup={prefixGroup} isDarkButton={isDarkButton}>
            {linkContent}
          </SimpleLink>
          {menuButton}
        </Box>
        {isLazy ? CCell ? <CCell /> : <SubMenu rows={rows} prefix={""} /> : null}
      </>
    </MenuRoot>
  ) : (
    <SimpleLink to={to} params={params} isDarkButton={isDarkButton} prefixGroup={prefixGroup}>
      {NameIcon && <NameIcon mr={1} />}
      {t(`${name}`)}
    </SimpleLink>
  );
}
