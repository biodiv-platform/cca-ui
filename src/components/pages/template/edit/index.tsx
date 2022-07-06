import { Box } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import { Container } from "@components/@core/container";
import PageHeading from "@components/@core/page-heading";
import { axAddAcitivityComment } from "@services/cca.service";
import { RESOURCE_TYPE } from "@static/constants";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useBeforeunload } from "react-beforeunload";

import EditFieldsForm from "./edit-fields-form";
import { EditTemplateMetaForm } from "./edit-meta-form";
import UpdateFieldModal from "./modals/update-field-modal";
import SwitchLanguage from "./switch-language";
import useTemplate from "./use-template";

export default function TemplateEditFieldsComponent() {
  const { t } = useTranslation();
  const { template } = useTemplate();
  const title = `${t("common:edit")} - ${template.name}`;

  useBeforeunload((event) => {
    if (!template.isSaved) {
      event.preventDefault();
    }
  });

  return (
    <Container>
      <NextSeo title={title} />

      <PageHeading icon="📄" title={title}>
        <SwitchLanguage />
      </PageHeading>

      <EditTemplateMetaForm />

      <EditFieldsForm />

      <Box my={16}>
        <Activity
          resourceId={template.id}
          resourceType={RESOURCE_TYPE.CCA_TEMPLATE}
          commentFunc={axAddAcitivityComment}
        />
      </Box>

      {/* Modals */}
      <UpdateFieldModal />
    </Container>
  );
}
