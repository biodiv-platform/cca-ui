import { ACCORDIAN_TYPES } from "@static/constants";
import { flattenFields, splitIntoGroups } from "@utils/field";
import React, { createContext, useContext, useMemo } from "react";

interface TemplateResponseShowContextProps {
  permissions;
  template;
  response;
  header;
  templateGroups;
  canEdit;
}

interface TemplateResponseShowProviderProps {
  permissions;
  template;
  response;
  header;
  canEdit;
  children;
}

const TemplateResponseShowContext = createContext<TemplateResponseShowContextProps>(
  {} as TemplateResponseShowContextProps
);

export const TemplateResponseShowProvider = ({
  permissions,
  template,
  response,
  header,
  canEdit,
  children
}: TemplateResponseShowProviderProps) => {
  const splitTableAndAccordians = (fields) => {
    const table: any = [];
    const accordian: any = [];

    for (const field of fields) {
      if (ACCORDIAN_TYPES.includes(field.type)) {
        accordian.push(field);
      } else {
        table.push(field);
      }
    }

    return { table, accordian };
  };

  const templateGroups = useMemo(
    () =>
      splitIntoGroups(flattenFields(template.fields)).map(({ heading, fields }) => ({
        heading,
        ...splitTableAndAccordians(fields)
      })),
    [template]
  );

  return (
    <TemplateResponseShowContext.Provider
      value={{
        permissions,
        template,
        header,
        templateGroups,
        canEdit,
        response
      }}
    >
      {children}
    </TemplateResponseShowContext.Provider>
  );
};

export default function useTemplateResponseShow() {
  return useContext(TemplateResponseShowContext);
}
