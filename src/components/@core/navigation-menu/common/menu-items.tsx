import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Link, Menu, MenuButton } from "@chakra-ui/react";
import NextLink from "@components/@core/next-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import SubMenu from "./sub-menu";

const buttonProps = {
  colorScheme: "blue",
  _hover: { bg: "blue.600" },
  style: { width: "120px", height: "32px" }
};

const SimpleLink = ({ children, to, params, isDarkButton }) => (
  <NextLink href={to} params={params} prefixGroup={true}>
    {isDarkButton ? (
      <Button {...buttonProps}>
        <Link>{children}</Link>
      </Button>
    ) : (
      <Link>{children}</Link>
    )}
  </NextLink>
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
    isDarkButton
  } = props;
  const isDropdown = rows.length > 0 || CCell;
  const { t } = useTranslation();

  return isDropdown ? (
    <Menu placement="bottom-end" isLazy={isLazy}>
      {({ isOpen }) => (
        <>
          <MenuButton data-label={name} role="button" tabIndex={0}>
            {NameIcon && <NameIcon mr={1} />}
            {t(`${name}`)}
            <ChevronDownIcon mt={[1, 0]} float={["right", "none"]} />
          </MenuButton>
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
    <SimpleLink to={to} params={params} isDarkButton={isDarkButton}>
      {NameIcon && <NameIcon mr={1} />}
      {t(`${name}`)}
    </SimpleLink>
  );
}
