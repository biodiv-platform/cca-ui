import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const ToggleButton = ({ isOpen, onToggle, top }) => {
  const styles = useBreakpointValue({
    base: {
      top: "100%",
      left: top,
      borderTop: 0,
      borderTopRadius: 0,
      minW: "2.5rem",
      h: "auto",
      icon: isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
    },
    sm: {
      top,
      left: "100%",
      borderLeft: 0,
      borderStartRadius: 0,
      minH: "2.5rem",
      icon: isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />
    }
  });

  return (
    <IconButton
      variant="outline"
      position="absolute"
      borderRadius="md"
      onClick={onToggle}
      zIndex={1}
      aria-label="toggle"
      p={1}
      minW={0}
      minH={0}
      border="2px solid"
      borderColor="gray.300"
      bg="white"
      {...styles}
    />
  );
};

export function CollapsablePane({ children, header, top }) {
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: true });
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
      <ToggleButton isOpen={isOpen} onToggle={onToggle} top={top} />
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
