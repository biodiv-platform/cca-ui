import { Box } from "@chakra-ui/react";
import { FORM_TYPE } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot
} from "@/components/ui/accordion";

import FieldShow from "../../edit/field-show";
import useTemplateResponseShow from "../use-template-response-show";

export default function ShowAccordian({ data }) {
  const { response } = useTemplateResponseShow();
  const { t } = useTranslation();

  const defaultValues = useMemo(
    () =>
      data
        .filter(
          (f) => f.type === FORM_TYPE.GEOMETRY || response?.ccaFieldValues?.[f.fieldId]?.value
        )
        .map((f) => f.fieldId), // Extract only fieldId
    [data, response]
  );

  return (
    <Box>
      <AccordionRoot multiple={true} defaultValue={defaultValues} mt={"-1px"}>
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
              value={field.fieldId}
            >
              <h3>
                <AccordionItemTrigger
                  px={4}
                  py={3}
                  _hover={{ bg: "gray.100" }}
                  _expanded={{ bg: "gray.100" }}
                >
                  <Box flex="1" textAlign="left">
                    {field.name} <i>{isEmpty && `(${t("common:no_data")})`}</i>
                  </Box>
                </AccordionItemTrigger>
              </h3>
              <AccordionItemContent bg="white" p={4}>
                {isEmpty ? t("common:no_data") : <FieldShow field={field} response={response} />}
              </AccordionItemContent>
            </AccordionItem>
          );
        })}
      </AccordionRoot>
    </Box>
  );
}
