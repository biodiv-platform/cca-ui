import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box
} from "@chakra-ui/react";
import { FORM_TYPE } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

import FieldShow from "../../edit/field-show";
import useTemplateResponseShow from "../use-template-response-show";

export default function ShowAccordian({ data }) {
  const { response } = useTemplateResponseShow();
  const { t } = useTranslation();
  const defaultIndex = useMemo(
    () =>
      data.map((f, idx) => (f.type === FORM_TYPE.GEOMETRY ? idx : null)).filter((i) => i !== null),
    []
  );

  return (
    <Box>
      <Accordion allowMultiple={true} defaultIndex={defaultIndex} allowToggle={true} mt={"-1px"}>
        {data.map((field) => {
          const isEmpty = !response?.ccaFieldValues?.[field.fieldId]?.value;

          return (
            <AccordionItem
              bg="white"
              key={field.fieldId}
              mb={3}
              borderRadius="md"
              border="1px solid var(--chakra-colors-gray-300)"
              shadow="sm"
            >
              <h3>
                <AccordionButton
                  px={4}
                  py={3}
                  _hover={{ bg: "gray.100" }}
                  _expanded={{ bg: "gray.100" }}
                >
                  <Box flex="1" textAlign="left">
                    {field.name} <i>{isEmpty && `(${t("common:no_data")})`}</i>
                  </Box>
                  <AccordionIcon className="no-print" />
                </AccordionButton>
              </h3>
              <AccordionPanel bg="white" pb={4}>
                {isEmpty ? t("common:no_data") : <FieldShow field={field} response={response} />}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
}
