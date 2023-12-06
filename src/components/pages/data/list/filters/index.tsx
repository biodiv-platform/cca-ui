import { Accordion } from "@chakra-ui/react";
import React from "react";

import useResponseList from "../use-response-list";
import FilterContainer from "./container";
import FieldCount from "./inputs/field-count";
import UserGroupFilter from "./user-group";

export default function FilterList() {
  const { filtersList } = useResponseList();

  return (
    <>
      <FieldCount />
      <Accordion allowMultiple={true}>
        {filtersList.map((field: any) => (
          <FilterContainer key={field.fieldId} field={field} />
        ))}
        <UserGroupFilter />
      </Accordion>
    </>
  );
}
