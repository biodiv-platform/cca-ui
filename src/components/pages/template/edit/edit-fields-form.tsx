import { Box, Button, ButtonGroup, SimpleGrid } from "@chakra-ui/react";
import PageHeading from "@components/@core/page-heading";
import SITE_CONFIG from "@configs/site-config";
import AddIcon from "@icons/add";
import CheckIcon from "@icons/check";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import DownloadIcon from "@/icons/download";

import FieldTree from "./field-tree";
import MasterFieldTree from "./master-field-tree";
import useTemplate from "./use-template";

export default function EditFieldsForm() {
  const { t } = useTranslation();
  const { createNewField, saveTemplate, template, areFieldsReadOnly, pullTranslations } =
    useTemplate();

  return (
    <>
      <PageHeading
        size="3xl"
        title={`${t("template:edit_fields")} ${template.isSaved ? "" : "(Unsaved)"}`}
      >
        <ButtonGroup gap={4}>
          <Button colorPalette="green" disabled={areFieldsReadOnly} onClick={createNewField}>
            <AddIcon />
            {t("template:add_field")}
          </Button>
          <Button
            colorPalette="blue"
            disabled={!areFieldsReadOnly || !template.isSaved}
            hidden={template.name === SITE_CONFIG.TEMPLATE.MAIN}
            onClick={pullTranslations}
          >
            <DownloadIcon />
            {t("template:pull.title")}
          </Button>
          <Button colorPalette="blue" onClick={saveTemplate}>
            <CheckIcon />
            {t("common:save")}
          </Button>
        </ButtonGroup>
      </PageHeading>

      <SimpleGrid columns={2} gap={4}>
        <Box>
          <MasterFieldTree />
        </Box>
        <Box>
          <FieldTree />
        </Box>
      </SimpleGrid>
    </>
  );
}
