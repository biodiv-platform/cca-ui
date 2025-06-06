import { Box, Flex } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";

import useTemplate from "./use-template";

export default function SwitchLanguage() {
  const { template } = useTemplate();
  const { t } = useTranslation();

  const handleOnChange = (e) => {
    const _url = new URL(window.location.href);
    _url.searchParams.set("language", e.target.value);
    window.location.assign(_url.href);
  };

  return (
    <Flex alignItems="center" gap={4}>
      <Box whiteSpace="pre">{t("form:choose_language")}</Box>
      <NativeSelectRoot defaultValue={template.language} onChange={handleOnChange}>
        <NativeSelectField>
          {Object.entries(SITE_CONFIG.LANG.LIST).map(([k, v]) => (
            <option value={k} key={k}>
              {v.NAME}
            </option>
          ))}
        </NativeSelectField>
      </NativeSelectRoot>
    </Flex>
  );
}
