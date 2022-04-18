import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  chakra
} from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import Sidebar from "@components/pages/common/layout/sidebar";
import { FORM_TYPE } from "@static/constants";
import { flattenFields, splitIntoGroups } from "@utils/field";
import React, { useMemo } from "react";

import { FieldEditContainer } from "./field-edit-container";
import PermissionEdit from "./permission-edit";
import { ShowHeader } from "./show-header";
import useTemplateResponseEdit from "./use-template-response-edit";

export default function ResponseEditPageComponent() {
  const { template, canEditEditors, isEdit } = useTemplateResponseEdit();

  const [templateFields, templateGroups, selectedAccordians] = useMemo(() => {
    const _flattenFields = flattenFields(template.fields);

    const _templateFields = _flattenFields.filter((tf) => tf.type === FORM_TYPE.HEADING);

    const _templateGroups = splitIntoGroups(_flattenFields);

    const _selectedAccordians = new Array(_templateGroups.length).fill(0).map((_, i) => i);

    return [_templateFields, _templateGroups, _selectedAccordians];
  }, [template]);

  return (
    <Container>
      <ShowHeader />
      {canEditEditors && isEdit && <PermissionEdit />}
      <Sidebar fields={templateFields}>
        <Accordion defaultIndex={selectedAccordians} allowMultiple>
          {templateGroups.map(({ heading, fields }) => (
            <AccordionItem
              key={heading.fieldId}
              mb={4}
              border="1px solid var(--chakra-colors-gray-300)"
              borderRadius="md"
              bg="white"
              shadow="sm"
            >
              <AccordionButton _expanded={{ borderBottom: "1px", borderColor: "gray.300" }}>
                <chakra.h2
                  flex="1"
                  textAlign="left"
                  fontSize="xl"
                  fontWeight="bold"
                  id={heading.fieldId}
                  css={{ scrollMarginTop: "var(--content-top)" }}
                >
                  {heading.name}
                </chakra.h2>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {fields.map((field) => (
                  <FieldEditContainer field={field} key={field.fieldId} />
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Sidebar>
    </Container>
  );
}
