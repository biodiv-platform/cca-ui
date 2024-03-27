import { Box } from "@chakra-ui/react";
import React from "react";

import { ChartHeader } from "./header";
import Stats from "./stats";

export default function ChartComponent({ chartData }) {
  const quickNavLinks = chartData.filtersList.map((data, index) => ({
    Title: data.name,
    href: `#chart-${index + 1}`
  }));

  const stateData = {
    Title: "State distribution",
    href: `#chart-${0}`
  };

  quickNavLinks.unshift(stateData);

  return (
    <Box position="relative">
      {quickNavLinks.length > 0 && <ChartHeader quickNavLinks={quickNavLinks} />}
      <Stats chartData={chartData} />
    </Box>
  );
}
