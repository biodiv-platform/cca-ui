import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { googleSearch } from "@utils/search";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function Search() {
  const { t } = useTranslation();

  const handleOnSearch = (e) => {
    e.preventDefault();
    googleSearch(e.target.elements["search"].value);
  };

  return (
    <form onSubmit={handleOnSearch}>
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.400" />} />
        <Input
          maxW={{ md: "10rem" }}
          border={0}
          bg="var(--chakra-colors-blackAlpha-100)none!important"
          borderRadius="md"
          name="search"
          type="search"
          placeholder={t("header:search")}
        />
      </InputGroup>
    </form>
  );
}
