import { Input } from "@chakra-ui/react";
import { googleSearch } from "@utils/search";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuSearch } from "react-icons/lu";

import { InputGroup } from "@/components/ui/input-group";

export default function Search() {
  const { t } = useTranslation();

  const handleOnSearch = (e) => {
    e.preventDefault();
    googleSearch(e.target.elements["search"].value);
  };

  return (
    <form onSubmit={handleOnSearch}>
      <InputGroup startElement={<LuSearch color="gray.400" />}>
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
