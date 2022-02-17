import { Box, BoxProps } from "@chakra-ui/react";
import { containerMaxW } from "@static/navmenu";
import React from "react";

export const Container = ({ children, ...props }: BoxProps) => (
  <Box w="full" mx="auto" maxW={containerMaxW} px={4} {...props}>
    {children}
  </Box>
);
