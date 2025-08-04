import { Box, Flex, HStack, IconButton, Link, Stack, useDisclosure } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import React from "react";
import { LuMenu, LuX } from "react-icons/lu";
import NavbarAuthOption from "./auth-option";
import GroupListItem from "./group-list-item";
import LanguageSwitcher from "./language-switcher";
import MenuItems from "./menu-items";

export default function NavBar() {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box h={16}>
      <Box
        backdropFilter="saturate(180%) blur(5px)"
        bg="whiteAlpha.800"
        id="menu"
        width="100%"
        zIndex={99}
        shadow="md"
        position={"fixed"}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between" w="full" px={4}>
          <Flex alignItems="center" justifyContent="center" gap={4}>
            <IconButton
              variant={"subtle"}
              size="md"
              aria-label="Open Menu"
              display={{ md: "none" }}
              onClick={open ? onClose : onOpen}
              className="no-print"
            >
              {open ? <LuX /> : <LuMenu />}
            </IconButton>

            <Link href={SITE_CONFIG.SITE.URL}>
              <img src={`/next-assets/logo.png`} alt={"cca logo"} width={150} />
            </Link>
          </Flex>
          <Flex alignItems="center" className="no-print">
            <HStack as="nav" gap={4} display={{ base: "none", md: "flex" }}>
              <MenuItems />
            </HStack>
            <GroupListItem />
            <LanguageSwitcher />
            <NavbarAuthOption />
          </Flex>
        </Flex>

        {open ? (
          <Box p={4} display={{ md: "none" }}>
            <Stack as="nav" gap={4}>
              <MenuItems />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
