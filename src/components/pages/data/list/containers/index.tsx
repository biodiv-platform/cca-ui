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
      <CollapsablePane top="4.4rem" header={<FiltersHeader />} title={"Filters"}>
        <Filters />
      </CollapsablePane>
      <CollapsablePane top="7.5rem" header={<CardHeader />} title={"List"}>
        <Cards />
      </CollapsablePane>
      <NonCollapsablePane>
        <Map />
      </NonCollapsablePane>
    </Flex>
  );
}
