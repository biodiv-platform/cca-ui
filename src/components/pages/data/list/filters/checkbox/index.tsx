import { Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger
} from "@/components/ui/accordion";

import FilterCheckboxes, { FilterCheckboxesProps } from "./checkboxes";

export default function CheckboxFilterPanel(props: FilterCheckboxesProps) {
  const { t } = useTranslation();

  return (
    <AccordionItem value={props.filterKey} borderColor="gray.300">
      <h2>
        <AccordionItemTrigger py={3} bg="transparent" _hover={{ bg: "gray.50" }}>
          <Box flex="1" textAlign="left" lineHeight={1.2} pr={6} fontWeight="semibold">
            {props.label || t(props.translateKey + "title")}
          </Box>
        </AccordionItemTrigger>
        <AccordionItemContent>{<FilterCheckboxes {...props} />}</AccordionItemContent>
      </h2>
    </AccordionItem>
  );
}
