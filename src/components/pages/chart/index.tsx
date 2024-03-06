import { Box } from "@chakra-ui/react";
import React from "react";

import Stats from "../home/stats";

export default function ChartComponent({ chartData }) {
  return (
    <Box>
      <Stats featured={chartData} filtersList={chartData.filtersList} />
    </Box>
  );
}
