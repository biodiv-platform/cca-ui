import { authorizedPageSSR } from "@components/auth/auth-redirect";
import TemplateCreateComponent from "@components/pages/template/create";
import { Role } from "@interfaces/custom";
import React from "react";

const TemplateCreatePage = () => <TemplateCreateComponent />;

TemplateCreatePage.getInitialProps = async (ctx) => {
  authorizedPageSSR([Role.Admin, Role.TemplateCurator], ctx);
  return {};
};

export default TemplateCreatePage;
