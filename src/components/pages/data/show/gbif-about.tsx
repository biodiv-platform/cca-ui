import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot
} from "@/components/ui/accordion";

/** Where the GBIF data comes from and how occurrences are matched to the CCA */
export default function GBIFAbout() {
  return (
    <AccordionRoot collapsible defaultValue={["info"]}>
      <AccordionItem
        bg="white"
        borderRadius="md"
        border="1px solid var(--chakra-colors-gray-300)"
        boxShadow="sm"
        value="info"
      >
        <h3>
          <AccordionItemTrigger
            px={4}
            py={3}
            _hover={{ bg: "gray.100" }}
            _expanded={{ bg: "gray.100" }}
          >
            <Box flex="1" textAlign="left">
              About GBIF Data
            </Box>
          </AccordionItemTrigger>
        </h3>
        <AccordionItemContent bg="white" p={4}>
          <Text>
            This species occurrence data is sourced from the Global Biodiversity Information Facility (GBIF), an open-access global biodiversity database. Unlike the rest of the information on this page, this data is not user-submitted on this portal.  It is downloaded from GBIF.org (18 September 2026) GBIF Occurrence{" "}
            <Link
              href="https://doi.org/10.15468/dl.r8uwrs"
              target="_blank"
              rel="noopener noreferrer"
              color="blue.600"
              textDecoration="underline"
            >
              Download
            </Link>
            . The dataset has 65,608,629 occurrences records.
          </Text>
          <Text mt={3}>
            Occurrences are fetched from a buffered area around the CCA: a circle around a point
            location, or the CCA polygon extended outward on all sides. The buffered area is shown
            on the GBIF Occurrences Map below, where you can change the buffered distance.
          </Text>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
