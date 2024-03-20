import { Box } from "@chakra-ui/react";
import React from "react";

import { generateChartDataForAll } from "../home/data";
import Stats from "../home/stats";
import { ChartHeader } from "./header";

export default function ChartComponent({ chartData }) {
  const chartDataList = generateChartDataForAll(chartData.aggregationData, chartData.filtersList);

  const quickNavLinks = chartDataList.map((data, index) => ({
    title: data.Title,
    href: `#chart-${index}`
  }));

  return (
    <Box position="relative">
      <ChartHeader quickNavLinks={quickNavLinks} />
      <Stats featured={chartData} filtersList={chartData.filtersList} />
    </Box>
  );
}
