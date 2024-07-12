import {
  Box,
  Button,
  Flex,
  Icon,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import FilterIcon from "@icons/filter";
import ListIcon from "@icons/list";
import React, { useEffect } from "react";

const ToggleButton = ({ onToggle, top, title, isMobile }) => {
  const styles = useBreakpointValue({
    base: {
      top: "100%",
      left: top,
      borderTop: 0,
      borderTopRadius: 0,
      minW: "2.5rem",
      h: "auto",
      icon: title === "Filters" ? <Icon as={FilterIcon} /> : <Icon as={ListIcon} />
    },
    sm: {
      top,
      left: "100%",
      borderLeft: 0,
      borderStartRadius: 0,
      height: "2.4rem",
      width: "6.2rem",
      icon: title === "Filters" ? <Icon as={FilterIcon} /> : <Icon as={ListIcon} />
    }
  });

  return (
    <Button
      variant="outline"
      position="absolute"
      top="4"
      borderRadius="md"
      onClick={onToggle}
      zIndex="10"
      aria-label="toggle"
      h="10"
      w="24"
      bg="white"
      _hover={{ bg: "gray.100" }}
      color="black.100"
      fontSize="md"
      display="flex"
      alignItems="center"
      justifyContent="left"
      pl="2"
      {...styles}
    >
      {styles?.icon}
      <Box mx="1" />
      {!isMobile && title}
    </Button>
  );
};

export function CollapsablePane({ children, header, top, title }) {
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  useEffect(() => {
    if (isMobile) {
      onClose();
    }
  }, [isMobile]);

  return (
    <Box
      flexShrink={0}
      w={isOpen ? { base: "100%", sm: "340px" } : 0}
      maxH={{ base: "40vh", sm: "unset" }}
      borderRight="2px solid"
      borderColor="gray.300"
      shadow="md"
      bg="white"
      position="relative"
    >
      <ToggleButton onToggle={onToggle} top={top} title={title} isMobile={isMobile} />
      <Flex w="full" h="full" direction="column">
        {isOpen && (
          <>
            <Box flexShrink={0}>{header}</Box>
            <Box flexGrow={1} overflowY="auto" overscrollBehavior="contain" className="cscr">
              {children}
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
}

export function NonCollapsablePane({ children }) {
  return <Box flexGrow={1}>{children}</Box>;
}
