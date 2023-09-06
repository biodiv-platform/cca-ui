import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import React from "react";

import MenuItems from "./menu-items";

function NavbarDark() {
  const { currentGroup } = useGlobalState();

  return (
    <Box bg="#d1e8de" py={0} px={215}>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <div style={{ width: "150px", height: "100px" }}>
            {" "}
            {/* Larger size while maintaining aspect ratio */}
            <Image
              src={
                currentGroup?.icon
                  ? `https://staging.communityconservedareas.org/files-api/api/get/crop/userGroups//${currentGroup.icon}?w=300`
                  : "/next-assets/logo.png"
              }
              alt="Logo"
              width="100%" /* Width 100% to maintain aspect ratio */
              height="100%" /* Height 100% to maintain aspect ratio */
              objectFit="contain" /* Adjust the object fit as needed */
            />
          </div>
          <Spacer ml={2} />
          <Text fontSize="lg" fontWeight="bold" color="black">
            {currentGroup?.name || "Community Conserved Areas"}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <MenuItems />
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavbarDark;
