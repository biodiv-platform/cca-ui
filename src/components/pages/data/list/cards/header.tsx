import { Flex, Heading } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useResponseList from "../use-response-list";

export default function CardHeader() {
  const { responses } = useResponseList();
  const { t } = useTranslation();

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      w="full"
      p={8}
      borderBottom="2px solid var(--chakra-colors-gray-300)"
    >
      <Heading as="h2" fontSize="xl" fontWeight="semibold">
        {t("template:results")} ({responses?.totalCount})
      </Heading>
    </Flex>
  );
}
