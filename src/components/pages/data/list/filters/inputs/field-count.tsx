import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useResponseList from "../../use-response-list";

const filterKey = "richTextCount";

export default function FieldCount() {
  const { addFilter, removeFilter, filter } = useResponseList();
  const { t } = useTranslation();

  const handleOnAll = () => removeFilter(filterKey);

  const handleOnCaseStudies = () => addFilter(filterKey, 5);

  return (
    <Box p={4}>
      <ButtonGroup colorPalette="blue.100" attached size="sm" variant="outline">
        <Button
          variant={filter.f[filterKey] ? "outline" : "solid"}
          onClick={handleOnAll}
          rounded={"md"}
          colorPalette={"blue"}
        >
          {t("common:all_ccas")}
        </Button>
        <Button
          variant={filter.f[filterKey] ? "solid" : "outline"}
          onClick={handleOnCaseStudies}
          rounded={"2xl"}
          colorPalette={"blue"}
        >
          {t("common:case_studies")}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
