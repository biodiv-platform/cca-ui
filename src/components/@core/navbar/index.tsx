import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { fetchGroups } from "@services/usergroup.service";
import { containerMaxW } from "@static/navmenu";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

const LanguageSwitcher = dynamic(() => import("./language-switcher"), { ssr: false });
const MenuItems = dynamic(() => import("./menu-items"), { ssr: false });
const NavbarAuthOption = dynamic(() => import("./auth-option"), { ssr: false });

type Group = {
  id: number;
  name: string;
  icon: string;
  webAddress: string;
  isParticipatory: boolean;
};

export default function NavBar() {
  const { setCurrentGroup } = useGlobalState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  const [groups, setGroups] = useState<Group[]>([]);

  const handleGroupClick = (group: Group) => {
    setCurrentGroup(group); // Set the current group when a group is clicked
  };

  const handleCommunityConservedAreasClick = () => {
    setCurrentGroup(null); // Set currentGroup to null when clicking on the icon
  };

  useEffect(() => {
    fetchGroups()
      .then((response) => {
        if (response.success) {
          setGroups(response.data);
        } else {
          console.error("Error fetching groups");
        }
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

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
              <Link onClick={handleCommunityConservedAreasClick}>
                {" "}
                {/* Add onClick handler here */}
                <Image alt={t("common:site.title")} src="/next-assets/logo.png" />
              </Link>
            </NextLink>
          </Flex>
          <Flex alignItems="center" className="no-print">
            <Menu>
              <MenuButton as={Link} rightIcon={<ChevronDownIcon />} style={{ color: "black" }}>
                Groups
              </MenuButton>
              <MenuList color="black" bg="white">
                {groups.map((group) => (
                  <NextLink href={`/group/${group.id}`} key={group.id} passHref>
                    <Link onClick={() => handleGroupClick(group)}>
                      <MenuItem>{group.name}</MenuItem>
                    </Link>
                  </NextLink>
                ))}
              </MenuList>
            </Menu>
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
