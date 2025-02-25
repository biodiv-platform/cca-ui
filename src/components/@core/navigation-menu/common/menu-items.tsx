import { Box, Button, Link } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuChevronDown } from "react-icons/lu";

import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu";

const SimpleLink = ({ children, to, params, isDarkButton, prefixGroup }) => (
  <LocalLink href={to} params={params} prefixGroup={prefixGroup}>
    {isDarkButton ? (
      <Button
        w={{ base: "full", sm: "auto" }}
        size="lg"
        colorPalette="blue"
        variant="solid"
        height={"8"}
        rounded={"sm"}
      >
        <a>{children}</a>
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
    isDarkButton,
    prefixGroup
  } = props;
  const isDropdown = rows.length > 0 || CCell;
  const { t } = useTranslation();

  const linkContent = (
    <>
      {NameIcon && <NameIcon mr={1} />}
      {t(`${name}`)}
    </>
  );

  return isDropdown ? (
    <MenuRoot>
      <MenuTrigger asChild>
        <Box display="flex" alignItems="center">
          <SimpleLink to={to} params={params} prefixGroup={prefixGroup} isDarkButton={isDarkButton}>
            {linkContent}
          </SimpleLink>
          <Box as="button" role="button" tabIndex={0} ml={2}>
            <LuChevronDown aria-label="Open Menu" />
          </Box>
        </Box>
      </MenuTrigger>
      <MenuContent>
        {rows.map((row, index) => (
          <MenuItem key={index} value={index}>
            <LocalLink href={row.to} params={row.params} prefixGroup={prefixGroup}>
              <Link w="full">{t(`${row.name}`)}</Link>
            </LocalLink>
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  ) : (
    <SimpleLink to={to} params={params} isDarkButton={isDarkButton} prefixGroup={prefixGroup}>
      {NameIcon && <NameIcon mr={1} />}
      {t(`${name}`)}
    </SimpleLink>
  );
}
