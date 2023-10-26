import { authorizedPageSSR } from "@components/auth/auth-redirect";
import CreateGroupPage from "@components/pages/group/create";
import { Role } from "@interfaces/custom";
import React from "react";

const createGroup = () => <CreateGroupPage />;

createGroup.getInitialProps = async (ctx) => {
  authorizedPageSSR([Role.Any], ctx, false);
  return {};
};

export default createGroup;
