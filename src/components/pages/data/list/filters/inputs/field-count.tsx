import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";

import useResponseList from "../../use-response-list";

const filterKey = "richTextCount";

export default function FieldCount() {
  const { addFilter, removeFilter, filter } = useResponseList();

  const handleOnAll = () => removeFilter(filterKey);

  const handleOnCaseStudies = () => addFilter(filterKey, 5);

  return (
    <Box p={4}>
      <ButtonGroup colorScheme="blue" isAttached size="sm">
        <Button variant={filter.f[filterKey] ? "outline" : "solid"} onClick={handleOnAll}>
          All
        </Button>
        <Button variant={filter.f[filterKey] ? "solid" : "outline"} onClick={handleOnCaseStudies}>
          Case Studies
        </Button>
      </ButtonGroup>
    </Box>
  );
}
