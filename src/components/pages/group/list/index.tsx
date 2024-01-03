import { Box } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import UserGroupListTable from "./table";

export default function GroupListPageComponent() {
  const { t } = useTranslation();

  return (
    <Box className="container mt" style={{ margin: "0 auto", maxWidth: "800px" }}>
      <PageHeading>👥 {t("group:list.title")}</PageHeading>
      <UserGroupListTable />
    </Box>
  );
}
