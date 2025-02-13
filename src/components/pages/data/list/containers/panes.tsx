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
import { LuChevronDown, LuChevronUp, LuMoveLeft, LuMoveRight } from "react-icons/lu";

const ToggleButton = ({ onToggle, top, title, isMobile, mobileTop, isOpen }) => {
  const styles = useBreakpointValue({
    base: {
      top: isOpen ? "100%" : 4,
      left: mobileTop,
      pr: 24,
      height: "2.5rem",
      width: "2.5rem",
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

  const chevronIcon = (() => {
    if (isOpen) {
      return isMobile ? <LuChevronUp /> : <LuMoveLeft />;
    } else {
      return isMobile ? <LuChevronDown /> : <LuMoveRight />;
    }
  })();

  return (
    <Button
      variant="outline"
      position="absolute"
      borderRadius="md"
      onClick={onToggle}
      zIndex="1"
      aria-label="toggle"
      bg="#319795"
      _hover={{ bg: "blue.600" }}
      color="white"
      fontSize="md"
      display="flex"
      alignItems="center"
      justifyContent="left"
      pl="2"
      {...styles}
    >
      {styles?.icon}
      <Box mx="1" />
      {title}
      {chevronIcon}
    </Button>
  );
};

export const CollapsablePane = ({ children, header, top, title, mobileTop }) => {
  const { open, onToggle, onClose } = useDisclosure({ defaultOpen: false });
  const [isMobile] = useMediaQuery(["(max-width: 480px)"], { fallback: [false] });
  useEffect(() => {
    if (isMobile) {
      onClose();
    }
  }, [isMobile]);

  return (
    <Box
      flexShrink={0}
      w={open ? { base: "100%", sm: "340px" } : 0}
      maxH={{ base: "40vh", sm: "unset" }}
      borderRight="2px solid"
      borderColor="gray.300"
      shadow="md"
      bg="white"
      position="relative"
    >
      <ToggleButton
        onToggle={onToggle}
        top={top}
        title={title}
        isMobile={isMobile}
        mobileTop={mobileTop}
        isOpen={open}
      />
      <Flex w="full" h="full" direction="column">
        {open && (
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
};

export function NonCollapsablePane({ children }) {
  return <Box flexGrow={1}>{children}</Box>;
}
