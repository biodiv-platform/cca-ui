import { Box, Button, Flex, Select, Stack, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import { sortByOptions, viewTabs } from "@static/documnet-list";
import { format } from "indian-number-format";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useDocumentFilter from "../../common/use-document-filter";

export default function ListHeader() {
  const { filter, setFilter, documentData } = useDocumentFilter();
  const { t } = useTranslation();

  const { user } = useGlobalState();

  const hasCreateAccess = user?.roles?.some((role) =>
    ["ROLE_ADMIN", "ROLE_DOCUMENT_CONTRIBUTOR"].includes(role)
  );

  const handleOnSort = (e) => {
    const v = e?.target?.value;
    setFilter((_draft) => {
      _draft.f.offset = 0;
      _draft.f.sort = `${v}`;
    });
  };

  const buttonProps = {
    colorScheme: "blue",
    _hover: { bg: "blue.600" },
    style: { height: "32px", width: "10rem" }
  };

  return (
    <>
      <Flex mt={4} direction={{ base: "column", md: "row" }} justify="space-between">
        <Tabs
          display="inline-block"
          className="icon-tabs"
          variant="soft-rounded"
          isManual={true}
          defaultIndex={0}
          mb={4}
          isLazy={true}
        >
          <TabList aria-orientation="vertical">
            {viewTabs.map(({ name, icon, key }) => (
              <Tab key={key} aria-label={t(name)} aria-controls={`view_${key}`}>
                {icon} {t(name)}
              </Tab>
            ))}
          </TabList>
        </Tabs>
        <Stack isInline={true} spacing={4} mb={4}>
          <Box hidden={!hasCreateAccess}>
            <LocalLink href={"/document/create"} prefixGroup={true}>
              <Button {...buttonProps}>{t("document:create.title")}</Button>
            </LocalLink>
          </Box>
          <Box>
            <Select
              maxW="10rem"
              height="32px"
              aria-label={t("common:list.sort_by")}
              value={filter?.sort}
              onChange={handleOnSort}
            >
              {sortByOptions.map(({ name, key }) => (
                <option key={key} value={key}>
                  {t(name)}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>
      </Flex>

      {documentData && documentData.n > -1 && (
        <Text color="gray.600" mb={4}>
          {format(documentData.n)} {t("document:documents_found")}
        </Text>
      )}
    </>
  );
}
