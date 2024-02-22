import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Link, Menu, MenuButton, useBreakpointValue } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import SubMenu from "./sub-menu";

const buttonProps = {
  colorScheme: "blue",
  _hover: { bg: "blue.600" },
  style: { width: "120px", height: "32px" }
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
      <MenuButton data-label={t(`${name}`)} role="button" tabIndex={0}>
        <ChevronDownIcon aria-label="Open Menu" />
      </MenuButton>
    </Box>
  );

  return isDropdown ? (
    <Menu placement="bottom-end" isLazy={isLazy}>
      {({ isOpen }) => (
        <>
          <Box sx={isDesktop ? desktopLinkStyle : mobileLinkStyle}>
            <SimpleLink
              to={to}
              params={params}
              prefixGroup={prefixGroup}
              isDarkButton={isDarkButton}
            >
              {linkContent}
            </SimpleLink>
            {menuButton}
          </Box>
          {(isLazy ? isOpen : true) ? (
            CCell ? (
              <CCell />
            ) : (
              <SubMenu rows={rows} prefix={""} />
            )
          ) : null}
        </>
      )}
    </Menu>
  ) : (
    <SimpleLink to={to} params={params} isDarkButton={isDarkButton} prefixGroup={prefixGroup}>
      {NameIcon && <NameIcon mr={1} />}
      {t(`${name}`)}
    </SimpleLink>
  );
}
