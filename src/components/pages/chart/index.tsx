import { Box } from "@chakra-ui/react";
import { generateChartData } from "@utils/chart";
import { cleanAggregationData } from "@utils/field";
import React, { useMemo } from "react";

import { ChartHeader } from "./header";
import Stats from "./stats";

export default function ChartComponent({ chartData }) {
  const statsData = useMemo(() => {
    const aggregationData = cleanAggregationData(chartData.stats.aggregation);
    return generateChartData(aggregationData, chartData.filtersList);
  }, [chartData]);

  const dataForChart = Object.entries(chartData.stats.satewiseAggregation)
    .map(([state, count]) => ({
      Name: state.toUpperCase(),
      Value: count
    }))
    .filter((item) => item.Name !== "?")
    .sort((a, b) => (b.Value as number) - (a.Value as number));

  const stateData = dataForChart.length > 0 && {
    Title: "Statewise distribution",
    Type: "Statewise distribution",
    data: dataForChart
  };

  if (dataForChart.length > 0) {
    statsData.unshift(stateData);
  }

  const quickNavLinks = useMemo(
    () =>
      statsData
        .map((data, index) => ({
          Title: data.Title,
          href: `#chart-${index}`
        }))
        .filter(Boolean),
    [statsData]
  );

  return (
    <Box position="relative">
      {quickNavLinks.length > 0 && <ChartHeader quickNavLinks={quickNavLinks} />}
      <Stats statsData={statsData} />
    </Box>
  );
}
