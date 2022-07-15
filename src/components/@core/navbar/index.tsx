import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, IconButton, Image, Link, Stack, useDisclosure } from "@chakra-ui/react";
import { containerMaxW } from "@static/navmenu";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const LanguageSwitcher = dynamic(() => import("./language-switcher"), { ssr: false });
const MenuItems = dynamic(() => import("./menu-items"), { ssr: false });
const NavbarAuthOption = dynamic(() => import("./auth-option"), { ssr: false });

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <Box h={16}>
      <Box
        backdropFilter="saturate(180%) blur(5px)"
        bg="whiteAlpha.800"
        id="menu"
        position="fixed"
        width="100%"
        zIndex={3}
        shadow="md"
      >
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          w="full"
          px={4}
          mx="auto"
          maxW={containerMaxW}
        >
          <Flex alignItems="center" justifyContent="center" gap={4}>
            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Open Menu"
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              className="no-print"
            />
            <NextLink href="/" passHref={true}>
              <Link>
                <Image alt={t("common:site.title")} src="/next-assets/logo.png" />
              </Link>
            </NextLink>
          </Flex>
          <Flex alignItems="center" className="no-print">
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              <MenuItems />
            </HStack>
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
