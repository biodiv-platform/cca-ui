import { authorizedPageSSR } from "@components/auth/auth-redirect";
import TemplateEditFieldsComponent from "@components/pages/template/edit";
import { TemplateProvider } from "@components/pages/template/edit/use-template";
import SITE_CONFIG from "@configs/site-config";
import { Role } from "@interfaces/custom";
import { axGetAllTemplates, axGetTemplateByShortName } from "@services/cca.service";
import { addIsMasterFieldKey } from "@utils/json";
import React from "react";

const TemplateEditFieldsPage = (props) => (
  <TemplateProvider
    templateList={props.templateList}
    initialTemplate={props.initialTemplate}
    masterTemplate={props.masterTemplate}
    language={props.language}
  >
    <TemplateEditFieldsComponent {...props} />
  </TemplateProvider>
);

TemplateEditFieldsPage.getInitialProps = async (ctx) => {
  authorizedPageSSR([Role.Admin, Role.TemplateCurator], ctx);

  const language = ctx.query.language || SITE_CONFIG.LANG.DEFAULT;

  const [initialTemplate, masterTemplate, templateList] = await Promise.all([
    axGetTemplateByShortName(ctx.query.shortName, language),
    axGetTemplateByShortName(SITE_CONFIG.TEMPLATE.MAIN, language),
    axGetAllTemplates(ctx, { language })
  ]);

  return {
    language,
    masterTemplate: addIsMasterFieldKey(masterTemplate.data),
    initialTemplate: { ...initialTemplate.data, isSaved: true },
    templateList: templateList.data
      .map((t) => ({ label: t.name, value: t.shortName }))
      .filter((t) => t.value !== ctx.query.shortName)
  };
};

export default TemplateEditFieldsPage;
