import { axGetLangList } from "@/services/document.service";
import { authorizedPageSSR } from "@components/auth/auth-redirect";
import CreateGroupPage from "@components/pages/group/create";
import { Role } from "@interfaces/custom";
import React from "react";

const createGroup = ({ languagesList }) => <CreateGroupPage languages={languagesList} />;

createGroup.getInitialProps = async (ctx) => {
  authorizedPageSSR([Role.Admin], ctx, false);

  const { data: languagesList } = await axGetLangList();
  return {
    languagesList
  };
};

export default createGroup;
