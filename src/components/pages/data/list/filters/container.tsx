import { Box } from "@chakra-ui/react";
import { MINMAX_FORM_TYPES, OPTION_FORM_TYPES } from "@static/constants";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger
} from "@/components/ui/accordion";

import { NumberFilter } from "./inputs/number";
import { OptionsFilter } from "./inputs/options";

const FilterInput = ({ filterField }) => {
  if (OPTION_FORM_TYPES.includes(filterField.type)) {
    return <OptionsFilter filterField={filterField} />;
  }

  if (MINMAX_FORM_TYPES.includes(filterField.type)) {
    return <NumberFilter filterField={filterField} />;
  }

  return <>{filterField.type}</>;
};

export default function FilterContainer({ field }) {
  return (
    <AccordionItem key={field.fieldId} borderColor="gray.300" value={field.fieldId}>
      <h2>
        <AccordionItemTrigger py={3} bg="transparent" _hover={{ bg: "gray.50" }}>
          <Box flex="1" textAlign="left" lineHeight={1.2} pr={6} fontWeight="semibold">
            {field.name}
          </Box>
        </AccordionItemTrigger>
      </h2>
      <AccordionItemContent pb={4} pt={2}>
        <FilterInput filterField={field} />
      </AccordionItemContent>
    </AccordionItem>
  );
}
