import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box
} from "@chakra-ui/react";
import { MINMAX_FORM_TYPES, OPTION_FORM_TYPES } from "@static/constants";
import React from "react";

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
    <AccordionItem borderColor="gray.300">
      <h2>
        <AccordionButton py={3} bg="transparent" _hover={{ bg: "gray.50" }}>
          <Box flex="1" textAlign="left" lineHeight={1.2} pr={6} fontWeight="semibold">
            {field.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} pt={2}>
        <FilterInput filterField={field} />
      </AccordionPanel>
    </AccordionItem>
  );
}
