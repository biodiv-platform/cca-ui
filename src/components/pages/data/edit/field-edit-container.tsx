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
  const { open, onOpen, onClose } = useDisclosure();
  const { canEdit, response } = useTemplateResponseEdit();

  return (
    <Box mb={4} _hover={open ? {} : { background: "gray.100" }}>
      {open ? (
        <FieldEditor field={field} onClose={onClose} />
      ) : (
        <>
          <Box hidden={field.type === FORM_TYPE.HEADING} fontSize="xl" fontWeight="bold">
            {field.name}

            {canEdit && (
              <IconButton
                alignItems="center"
                colorPalette="blue"
                aria-label={t("form:edit")}
                title={t("form:edit")}
                onClick={onOpen}
                variant="plain"
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <FieldShow field={field} response={response} />
        </>
      )}
    </Box>
  );
};
