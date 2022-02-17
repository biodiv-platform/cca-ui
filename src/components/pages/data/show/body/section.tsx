import { Box, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import ShowAccordian from "./accordian";
import ShowTable from "./table";

export default function ShowSection({ heading, table, accordian }) {
  return (
    <Box mb={12} className="pagebreak">
      <Heading fontSize="3xl" textAlign="center" mb={8}>
        {heading.name}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ md: 8 }} spacingY={{ base: 4, md: 0 }}>
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
