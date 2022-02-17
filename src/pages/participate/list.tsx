import { authorizedPageSSR } from "@components/auth/auth-redirect";
import TemplateParticipateListPageComponent from "@components/pages/participate/list";
import { Role } from "@interfaces/custom";
import React from "react";

const TemplateParticipateListPage = () => <TemplateParticipateListPageComponent />;

TemplateParticipateListPage.getInitialProps = async (ctx) => {
  authorizedPageSSR([Role.User, Role.DataCurator, Role.TemplateCurator, Role.Admin], ctx);
  return {};
};

export default TemplateParticipateListPage;
