import { Accordion } from "@chakra-ui/react";
import React from "react";

import useResponseList from "../use-response-list";
import FilterContainer from "./container";

export default function FilterList() {
  const { filtersList } = useResponseList();

  return (
    <Accordion allowMultiple={true}>
      {filtersList.map((field: any) => (
        <FilterContainer key={field.fieldId} field={field} />
      ))}
    </Accordion>
  );
}
