import { Box } from "@chakra-ui/react";
import React from "react";

import Stats from "../home/stats";
import { ChartHeader } from "./header";

export default function ChartComponent({ chartData }) {
  const quickNavLinks = chartData.filtersList.map((data, index) => ({
    title: data.name,
    href: `#chart-${index + 1}`
  }));

  const stateData = {
    title: "State distribution",
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
