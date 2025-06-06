import { Button, Flex, Heading } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

import useResponseList from "../use-response-list";
import Search from "./search";
export function FiltersHeader() {
  const { filter } = useResponseList();
  const { t } = useTranslation();

  const handleOnClearFilter = () => {
    window.location.assign(window.location.origin + window.location.pathname);
  };

  const filtersCount = useMemo(
    () => Object.keys(filter.f).filter((k) => !["offset", "limit", "language"].includes(k)).length,
    [filter.f]
  );

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="full"
        p={4}
        borderBottom="1px solid var(--chakra-colors-gray-300)"
      >
        <Search />
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="full"
        p={4}
        borderBottom="1px solid var(--chakra-colors-gray-300)"
      >
        <Heading as="h2" fontSize="xl" fontWeight="semibold">
          {t("template:filters")} ({filtersCount})
        </Heading>
        <Button size="xs" onClick={handleOnClearFilter} variant={"subtle"} rounded={"full"} fontWeight={"bold"}>
          {t("common:clear")}
        </Button>
      </Flex>
    </>
  );
}
