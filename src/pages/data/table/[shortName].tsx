import { authorizedPageSSR } from "@components/auth/auth-redirect";
import TemplateResponseTableComponent from "@components/pages/data/table";
import { Role } from "@interfaces/custom";
import { axGetTemplateByShortName } from "@services/cca.service";
import React from "react";

const TemplateResponseTablePage = (props) => <TemplateResponseTableComponent {...props} />;

TemplateResponseTablePage.getInitialProps = async (ctx) => {
  authorizedPageSSR([Role.Admin, Role.DataCurator, Role.TemplateCurator], ctx);

  const { data } = await axGetTemplateByShortName(ctx.query.shortName);

  return { template: data };
};

export default TemplateResponseTablePage;
