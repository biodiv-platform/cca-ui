import React from "react";

import { AccordionRoot } from "@/components/ui/accordion";

import useResponseList from "../use-response-list";
import FilterContainer from "./container";
import FieldCount from "./inputs/field-count";
import UserGroupFilter from "./user-group";

export default function FilterList() {
  const { filtersList } = useResponseList();

  return (
    <>
      <FieldCount />
      <AccordionRoot multiple={true} p={4} collapsible>
        {filtersList.map((field: any) => (
          <FilterContainer key={field.fieldId} field={field} />
        ))}
        <UserGroupFilter />
      </AccordionRoot>
    </>
  );
}
