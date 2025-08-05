import { Box, Flex, Image, Input, Link, Menu, Portal, Text } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import debounce from "debounce-promise";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { LuArrowRight, LuChevronDown } from "react-icons/lu";

import LocalLink from "../local-link";

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
    <Menu.Root>
      <Menu.Trigger asChild rounded="md" cursor="pointer" minW={0} px={4} py={1} {...extraProps}>
        <Flex alignItems="center" gap={2}>
          {t("header:menu_primary.groups.title")}
          <LuChevronDown />
        </Flex>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content h="18rem" w="360px" overflowY="scroll">
            <Input w="full" onChange={onQuery} placeholder={t("header:search")} />
            <Menu.Item minH="3rem" value="list" asChild>
              <LocalLink href="/group/list" prefixGroup={true}>
                {t("header:menu_primary.groups.see_all")} <LuArrowRight />
              </LocalLink>
            </Menu.Item>

            {filterGroups?.map((g) => {
              const groupURL: any = removePrefix
                ? g?.webAddress?.replace(SITE_CONFIG.SITE.URL, "")
                : g?.webAddress;

              return (
                <Menu.Item key={groupURL} minH="3rem" value={g.name} asChild>
                  <a href={groupURL}>
                    <Flex alignItems="center">
                      <Image
                        boxSize="2rem"
                        objectFit="contain"
                        loading="lazy"
                        src={`${g.icon}?w=40`}
                        aria-label={`${g.name} Logo`}
                        mr={2}
                      />
                      <Text lineHeight="1rem">
                        {g.name} {console.info(g.name, groupURL)}
                      </Text>
                    </Flex>
                  </a>
                </Menu.Item>
              );
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default GroupListItem;
