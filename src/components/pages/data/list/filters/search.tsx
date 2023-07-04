import { Box, Input, InputGroup } from "@chakra-ui/react";
import { axSearchMapCCAData } from "@services/cca.service";
import React from "react";

import useResponseList from "../use-response-list";

function Search() {
  const { query, setQuery } = useResponseList();
  const { setMapResults } = useResponseList();
  const { setIsSearching } = useResponseList();
  const { isSearching } = useResponseList();

  const handleSearch = async () => {
    try {
      const mapResponse = await axSearchMapCCAData(query);

      if (mapResponse.success) {
        setMapResults(mapResponse.data);
      }
      setIsSearching(!isSearching);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box position="relative">
      <InputGroup>
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search CCA"
        ></Input>
      </InputGroup>
    </Box>
  );
}

export default Search;
