import { Button, Flex, Heading } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useResponseList from "../use-response-list";

export function FiltersHeader() {
  const { filter } = useResponseList();
  const { t } = useTranslation();

  const handleOnClearFilter = () => {
    window.location.assign(window.location.origin + window.location.pathname);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      w="full"
      p={4}
      borderBottom="1px solid var(--chakra-colors-gray-300)"
    >
      <Heading as="h2" fontSize="xl" fontWeight="semibold">
        {t("template:filters")} ({Object.keys(filter.f).length})
      </Heading>
      <Button size="xs" onClick={handleOnClearFilter}>
        {t("common:clear")}
      </Button>
    </Flex>
  );
}
