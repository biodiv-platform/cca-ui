import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, IconButton, Link, Stack, useDisclosure } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import dynamic from "next/dynamic";
import React from "react";

const LanguageSwitcher = dynamic(() => import("./language-switcher"), { ssr: false });
const MenuItems = dynamic(() => import("./menu-items"), { ssr: false });
const NavbarAuthOption = dynamic(() => import("./auth-option"), { ssr: false });
const GroupListItem = dynamic(() => import("./group-list-item"), { ssr: false });

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box h={16}>
      <Box
        backdropFilter="saturate(180%) blur(5px)"
        bg="whiteAlpha.800"
        id="menu"
        width="100%"
        zIndex={4}
        shadow="md"
        position={"fixed"}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between" w="full" px={4}>
          <Flex alignItems="center" justifyContent="center" gap={4}>
            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Open Menu"
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              className="no-print"
            />
            <Link href={SITE_CONFIG.SITE.URL}>
              <img src={`/next-assets/logo.png`} alt={"cca logo"} width={150} />
            </Link>
          </Flex>
          <Flex alignItems="center" className="no-print">
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              <MenuItems />
            </HStack>
            <GroupListItem />
            <LanguageSwitcher />
            <NavbarAuthOption />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box p={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              <MenuItems />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
