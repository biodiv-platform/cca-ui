import { Box, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import ShowAccordian from "./accordian";
import ShowTable from "./table";

export default function ShowSection({ heading, table, accordian }) {
  return (
    <Box mb={12} className="pagebreak">
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ md: 8 }} gapY={{ base: 4, md: 0 }}>
        <GridItem display={{ base: "none", md: "block" }} />
        <GridItem colSpan={2}>
          <Heading
            id={heading.fieldId}
            css={{ scrollMarginTop: "7rem" }}
            fontSize="3xl"
            textAlign="left"
            mb={8}
          >
            {heading.name}
          </Heading>
        </GridItem>
        <GridItem>
          <ShowTable title={heading.name} data={table} />
        </GridItem>
        <GridItem colSpan={2}>
          <ShowAccordian data={accordian} />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
