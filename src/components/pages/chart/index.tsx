import { Box } from "@chakra-ui/react";
import React from "react";

import { generateChartDataForAll } from "../home/data";
import Stats from "../home/stats";
import { ChartHeader } from "./header";

export default function ChartComponent({ chartData }) {
  const statsData = generateChartDataForAll(chartData.aggregationData, chartData.filtersList);

  const quickNavLinks = statsData.map((data, index) => ({
    title: data.Title,
    href: `#chart-${index}`
  }));

  return (
    <Box position="relative">
      {quickNavLinks.length > 0 && <ChartHeader quickNavLinks={quickNavLinks} />}
      <Stats statsData={statsData} />
    </Box>
  );
}
