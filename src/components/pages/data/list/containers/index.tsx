import { Flex } from "@chakra-ui/react";
import React from "react";

import Cards from "../cards";
import CardHeader from "../cards/header";
import Filters from "../filters";
import { FiltersHeader } from "../filters/header";
import Map from "../map";
import { CollapsablePane, NonCollapsablePane } from "./panes";

export default function ResponseListContainer() {
  return (
    <Flex
      width="full"
      height="calc(100vh - var(--heading-height))"
      direction={{ base: "column", md: "row" }}
    >
      <CollapsablePane top="2.4rem" header={<FiltersHeader />}>
        <Filters />
      </CollapsablePane>
      <CollapsablePane top="5.4rem" header={<CardHeader />}>
        <Cards />
      </CollapsablePane>
      <NonCollapsablePane>
        <Map />
      </NonCollapsablePane>
    </Flex>
  );
}
