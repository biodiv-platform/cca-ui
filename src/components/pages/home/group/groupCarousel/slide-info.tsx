import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

import Indicators from "./indicators";

export default function SlideInfo({ size, page, setPage }) {
  const showIndicators = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      position="absolute"
      backgroundImage="linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))"
      bottom={0}
      left={0}
      right={0}
      p={6}
    >
      <Flex justifyContent="space-between" alignItems="flex-end">
        {showIndicators && size > 1 && (
          <div>
            <Indicators size={size} page={page} setPage={setPage} />
          </div>
        )}
      </Flex>
    </Box>
  );
}
