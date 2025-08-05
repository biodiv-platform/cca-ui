import { Box, Button, Link, Menu, Portal } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuChevronDown } from "react-icons/lu";

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
        {children}
      </Button>
    ) : (
      children
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
    <Menu.Root>
      <Menu.Trigger asChild pl={4}>
        <Box display="flex" alignItems="center">
          <SimpleLink to={to} params={params} prefixGroup={prefixGroup} isDarkButton={isDarkButton}>
            {linkContent}
          </SimpleLink>
          <Box as="button" role="button" tabIndex={0} ml={2}>
            <LuChevronDown aria-label="Open Menu" />
          </Box>
        </Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          {CCell ? (
            <CCell />
          ) : (
            <Menu.Content>
              {rows.map((row) => (
                <Menu.Item key={row.to} value={row.name} asChild>
                  <LocalLink href={row.to} params={row.params} prefixGroup={prefixGroup}>
                    {t(`${row.name}`)}
                  </LocalLink>
                </Menu.Item>
              ))}
            </Menu.Content>
          )}
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  ) : (
    <SimpleLink to={to} params={params} isDarkButton={isDarkButton} prefixGroup={prefixGroup}>
      {NameIcon && <NameIcon mr={1} />}
      {t(`${name}`)}
    </SimpleLink>
  );
}
