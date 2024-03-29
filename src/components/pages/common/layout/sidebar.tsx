import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import ToC from "./toc";

export default function Sidebar({ children, fields, isEdit = true }) {
  return (
    <Flex id="home" direction={{ base: "column", md: "row" }}>
      <Box as="nav" aria-label="Main Navigation" w="280px" pr={{ base: 0, md: 10 }} flexShrink={0}>
        <ToC templateFields={fields} isEdit={isEdit} />
      </Box>
      <Box pb={6} w="100%" minW={0}>
        {children}
      </Box>
    </Flex>
  );
}
