import { Input, InputGroup } from "@chakra-ui/react";
import { googleSearch } from "@utils/search";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuSearch } from "react-icons/lu";

export default function Search() {
  const { t } = useTranslation();

  const handleOnSearch = (e) => {
    e.preventDefault();
    googleSearch(e.target.elements["search"].value);
  };

  return (
    <form onSubmit={handleOnSearch}>
      <InputGroup
        startElement={<LuSearch />}
        bg="gray.200"
        borderRadius="md"
        maxW={{ md: "10rem" }}
        colorPalette={"blue"}
      >
        <Input
          border={0}
          height={8}
          bg="var(--chakra-colors-blackAlpha-100)none!important"
          px={2}
          name="search"
          type="search"
          placeholder={t("header:search")}
          _focus={{ boxShadow: "none" }}
        />
      </InputGroup>
    </form>
  );
}
