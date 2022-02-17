import { authorizedPageSSR } from "@components/auth/auth-redirect";
import TemplateParticipateComponent from "@components/pages/participate/template";
import { Role } from "@interfaces/custom";
import { axGetTemplateByShortName } from "@services/cca.service";
import React from "react";

const TemplateParticipatePage = (props) => <TemplateParticipateComponent {...props} />;

TemplateParticipatePage.getInitialProps = async (ctx) => {
  authorizedPageSSR([Role.User, Role.DataCurator, Role.TemplateCurator, Role.Admin], ctx);

  const { data } = await axGetTemplateByShortName(ctx.query.shortName, ctx.locale);

  return { template: data };
};

export default TemplateParticipatePage;
