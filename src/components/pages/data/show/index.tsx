import { GridItem, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import ShowBody from "./body";
import Carousel from "./carousel";
import ShowHeader from "./header";
import ShowMap from "./map";
import useTemplateResponseShow from "./use-template-response-show";

export default function ResponseShowPageComponent() {
  const { header } = useTemplateResponseShow();

  return (
    <div>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <GridItem colSpan={header.files.length ? 1 : 2} h={{ base: "15rem", md: "26rem" }}>
          <ShowMap />
        </GridItem>
        {header.files.length > 0 && (
          <GridItem h={{ base: "auto", md: "26rem" }}>
            <Carousel />
          </GridItem>
        )}
      </SimpleGrid>
      <ShowHeader />
      <ShowBody />
    </div>
  );
}
