import { Box } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import SITE_CONFIG from "@configs/site-config";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function ContactAdmin() {
  const { t } = useTranslation();

  return (
    <Box mb={4}>
      {/* isExternal={true} */}
      <BlueLink href={SITE_CONFIG.FOOTER.MAIL}>{t("group:admin.no_access")}</BlueLink>
    </Box>
  );
}
