import { Box, Flex } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import React from "react";

import { TableOfContents } from "./toc";

interface ChartHeaderProps {
  quickNavLinks: { title: string; href: string }[];
}

export const ChartHeader = ({ quickNavLinks }: ChartHeaderProps) => {
  return (
    <>
      <Box
        pb={4}
        position="sticky"
        top={10}
        pt={10}
        zIndex={1}
        backdropFilter="saturate(180%) blur(20px)"
        pl={4}
      >
        <Container>
          <Flex alignItems="center" justifyContent="space-between">
            <div>
              <TableOfContents quickNavLinks={quickNavLinks} />
            </div>
          </Flex>
        </Container>
      </Box>
    </>
  );
};
