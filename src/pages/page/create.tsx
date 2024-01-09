import { authorizedPageSSP } from "@components/auth/auth-redirect";
import PageCreatePageComponent from "@components/pages/page/create";
import { Role } from "@interfaces/custom";
import React from "react";

export default function PageCreatePage() {
  return <PageCreatePageComponent />;
}

export const getServerSideProps = async (ctx) => {
  authorizedPageSSP([Role.Any], ctx);
  return { props: {} };
};
