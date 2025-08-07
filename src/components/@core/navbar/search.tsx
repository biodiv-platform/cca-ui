import React, { useCallback, useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import { axSearchCCAData } from "@/services/cca.service";
import { selectStyles } from "@components/form/configs";
import useTranslation from "next-translate/useTranslation";
import { ImageWithFallback } from "../image-with-fallback";
import { useLocalRouter } from "../local-link";

const FALLBACK_IMAGE = "/next-assets/cca-fallback.svg";

type Option = {
  value: any;
  label: string;
  image?: string;
};

const CustomOption = ({ data, innerRef, innerProps }: any) => (
  <Flex
    ref={innerRef}
    {...innerProps}
    align="center"
    gap={3}
    px={3}
    py={2}
    minH="60px"
    cursor="pointer"
    _hover={{ bg: "gray.100" }}
  >
    <ImageWithFallback
      boxSize="40px"
      objectFit="cover"
      src={data.image}
      borderRadius="md"
      fallbackSrc={FALLBACK_IMAGE}
      alt={data.label}
    />
    <Text fontSize="md" fontWeight="medium" lineClamp={1}>
      {data.label}
    </Text>
  </Flex>
);

export default function Search() {
  const { t } = useTranslation();
  const router = useLocalRouter();

  const search = useMemo(
    () =>
      debounce(async (query: string) => {
        try {
          const { success, data } = await axSearchCCAData({ query });
          return success
            ? data.map((item: any) => ({
                value: item,
                label:
                  item.titlesValues?.find((f: any) => f.name === "Name of CCA")?.value ||
                  `CCA #${item.id}`,
                image: item.files?.[0]?.path
              }))
            : [];
        } catch (error) {
          console.error("Search error:", error);
          return [];
        }
      }, 300),
    []
  );

  const handleSelect = useCallback(
    (option: Option) => {
      if (option?.value?.id) {
        router.push(`/data/show/${option.value.id}`);
      }
    },
    [router]
  );

  return (
    <Box minWidth="20em">
      <AsyncSelect
        components={{
          Option: CustomOption,
          DropdownIndicator: null,
          IndicatorSeparator: null
        }}
        cacheOptions
        loadOptions={search}
        onChange={handleSelect}
        placeholder={t("common:search") || "Search CCA"}
        noOptionsMessage={({ inputValue }) =>
          inputValue ? t("common:no_results") : "Type to search"
        }
        styles={selectStyles}
      />
    </Box>
  );
}
