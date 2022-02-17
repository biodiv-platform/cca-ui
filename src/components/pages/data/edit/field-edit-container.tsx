import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import EditIcon from "@icons/edit";
import { FORM_TYPE } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import FieldEditor from "./field-editor";
import FieldShow from "./field-show";
import useTemplateResponseEdit from "./use-template-response-edit";

export const FieldEditContainer = ({ field }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { canEdit, response } = useTemplateResponseEdit();

  return (
    <Box mb={4} _hover={isOpen ? {} : { background: "gray.100" }}>
      {isOpen ? (
        <FieldEditor field={field} onClose={onClose} />
      ) : (
        <>
          <Box hidden={field.type === FORM_TYPE.HEADING} fontSize="xl" fontWeight="bold">
            {field.name}

            {canEdit && (
              <IconButton
                alignItems="center"
                colorScheme="blue"
                aria-label={t("form:edit")}
                title={t("form:edit")}
                onClick={onOpen}
                icon={<EditIcon />}
                variant="link"
              />
            )}
          </Box>
          <FieldShow field={field} response={response} />
        </>
      )}
    </Box>
  );
};
