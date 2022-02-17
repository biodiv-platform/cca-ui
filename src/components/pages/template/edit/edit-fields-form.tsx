import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, SimpleGrid } from "@chakra-ui/react";
import PageHeading from "@components/@core/page-heading";
import SITE_CONFIG from "@configs/site-config";
import AddIcon from "@icons/add";
import CheckIcon from "@icons/check";
import useTranslation from "next-translate/useTranslation";
import React from "react";

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
        size="lg"
        title={`${t("template:edit_fields")} ${template.isSaved ? "" : "(Unsaved)"}`}
      >
        <ButtonGroup spacing={4}>
          <Button
            colorScheme="green"
            disabled={areFieldsReadOnly}
            onClick={createNewField}
            leftIcon={<AddIcon />}
          >
            {t("template:add_field")}
          </Button>
          <Button
            colorScheme="blue"
            disabled={!areFieldsReadOnly || !template.isSaved}
            hidden={template.name === SITE_CONFIG.TEMPLATE.MAIN}
            onClick={pullTranslations}
            leftIcon={<DownloadIcon />}
          >
            {t("template:pull.title")}
          </Button>
          <Button colorScheme="blue" onClick={saveTemplate} leftIcon={<CheckIcon />}>
            {t("common:save")}
          </Button>
        </ButtonGroup>
      </PageHeading>

      <SimpleGrid columns={2} spacing={4}>
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
