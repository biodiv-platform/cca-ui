import { authorizedPageSSR } from "@components/auth/auth-redirect";
import TemplateListComponent from "@components/pages/template/list";
import { Role } from "@interfaces/custom";
import React from "react";

const TemplateListPage = () => <TemplateListComponent />;

export const getServerSideProps = async (ctx) => {
  authorizedPageSSR([Role.Admin, Role.TemplateCurator], ctx);
  return { props: {} };
};

export default TemplateListPage;
