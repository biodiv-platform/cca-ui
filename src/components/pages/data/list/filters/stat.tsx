import { Box } from "@chakra-ui/react";
import { toHumanString } from "human-readable-numbers";
import React, { useMemo } from "react";

import useResponseList from "../use-response-list";

export default function FilterStat({ fieldId, value }) {
  const { aggregation } = useResponseList();

  const count = useMemo(() => {
    if (Array.isArray(value)) {
      return value.reduce((prev, curr) => (aggregation[fieldId]?.[curr] || 0) + prev, 0);
    }
    return aggregation[fieldId]?.[value] || 0;
  }, [aggregation]);

  return (
    <Box color="gray.500" as="span" title={count}>
      {` - ${toHumanString(count || 0)}`}
    </Box>
  );
}
