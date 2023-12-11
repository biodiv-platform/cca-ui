import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import NextLink from "@components/@core/next-link";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import debounce from "debounce-promise";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

const GroupListItem = () => {
  const { groups, currentGroup } = useGlobalState();
  const { t } = useTranslation();
  const removePrefix = currentGroup.webAddress?.startsWith(SITE_CONFIG.SITE.URL);
  const [filterGroups, setFilterGroups] = useState<any>(groups);

  const onQuery = debounce((e) => {
    setFilterGroups(
      groups?.filter((i) => i.name?.toLowerCase().match(e.target.value.toLowerCase()))
    );
  }, 200);

  const extraProps = { _hover: { bg: "gray.200" } };

  return (
    <Menu>
      <MenuButton
        as={Link}
        rounded="md"
        variant="link"
        cursor="pointer"
        minW={0}
        px={6}
        py={1}
        {...extraProps}
      >
        Groups
      </MenuButton>
      <MenuList h="18rem" w="360px" overflowY="scroll">
        <Box px={2}>
          <Input w="full" onChange={onQuery} placeholder={t("header:search")} />
        </Box>
        <MenuItem minH="3rem">
          <NextLink href="/group/list" prefixGroup={true}>
            <Link w="full">
              {t("header:menu_primary.groups.see_all")} <ArrowForwardIcon />
            </Link>
          </NextLink>
        </MenuItem>

        {filterGroups?.map((g) => {
          const groupURL: any = removePrefix
            ? g?.webAddress?.replace(SITE_CONFIG.SITE.URL, "")
            : g?.webAddress;

          return (
            <MenuItem key={g.id} minH="3rem">
              <NextLink href={groupURL}>
                <Link w="full">
                  <Flex alignItems="center">
                    <Image
                      boxSize="2rem"
                      objectFit="contain"
                      loading="lazy"
                      src={`${g.icon}?w=40`}
                      aria-label={`${g.name} Logo`}
                      mr={2}
                    />
                    <Text lineHeight="1rem">{g.name}</Text>
                  </Flex>
                </Link>
              </NextLink>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default GroupListItem;