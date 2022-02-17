import { Container } from "@components/@core/container";
import PageHeading from "@components/@core/page-heading";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { CreateTemplateForm } from "./form";

export default function TemplateCreateComponent() {
  const { t } = useTranslation();

  return (
    <Container>
      <PageHeading icon="🗂" title={t("template:create.title")} />
      <CreateTemplateForm />
    </Container>
  );
}
