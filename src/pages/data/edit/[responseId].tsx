import ResponseEditPageComponent from "@components/pages/data/edit";
import { TemplateResponseEditProvider } from "@components/pages/data/edit/use-template-response-edit";
import { axGetTemplateResponseById, getTemplateByShortOrParentName } from "@services/cca.service";
import { adminOrAuthor, canEditData } from "@utils/auth";
import React from "react";

const ResponseEditPage = (props) => (
  <TemplateResponseEditProvider {...props}>
    <ResponseEditPageComponent />
  </TemplateResponseEditProvider>
);

export const getServerSideProps = async (ctx) => {
  const { data: initialResponse } = await axGetTemplateResponseById(ctx.query.responseId);
  const template = await getTemplateByShortOrParentName(initialResponse.shortName, ctx.locale);

  const canEditEditors = adminOrAuthor(initialResponse.userId, ctx);
  const canEdit = canEditData([initialResponse.userId, ...initialResponse.allowedUsers], ctx);

  return { props: { template, initialResponse, canEditEditors, canEdit } };
};

export default ResponseEditPage;
