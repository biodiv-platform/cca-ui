import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import ResponseListContainer from "./containers";
import { ResponseListProvider } from "./use-response-list";

export default function TemplateResponseListComponent(props) {
  const { t } = useTranslation();

  return (
    <ResponseListProvider {...props}>
      <NextSeo title={t("common:list")} />
      <ResponseListContainer />
    </ResponseListProvider>
  );
}
