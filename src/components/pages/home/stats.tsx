import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import BoxHeading from "@components/@core/activity/box-heading";
import { Histogram } from "@components/charts/histogram";
import HorizontalBarChart from "@components/charts/horizontal-bar-chart";
import PieV3 from "@components/charts/pie-v3";
import StackedBarChart from "@components/charts/stacked-bar-chart";
import React, { useState } from "react";

import { ChartMeta, generateChartDataForAll, HistogramData, TooltipRenderer } from "./data";

const HorizontalChartMeta = {
  countTitle: "cca's",
  titleKey: "Name",
  countKey: "Value",
  hideXAxis: true
};

//schemeBrBG
const colours = [
  "#543005",
  "#8c510a",
  "#bf812d",
  "#dfc27d",
  "#f6e8c3",
  "#f5f5f5",
  "#c7eae5",
  "#80cdc1",
  "#35978f",
  "#01665e",
  "#003c30"
];

export default function Stats({ filtersList, featured }) {
  const chartDataList = generateChartDataForAll(featured.aggregationData, filtersList);
  const [isStackedView, setIsStackedView] = useState(true);

  const toggleView = () => {
    setIsStackedView((prevState) => !prevState);
  };

  const renderChart = (chartData, index) => {
    switch (chartData?.Type) {
      case "MULTI_SELECT_CHECKBOX":
      case "SINGLE_SELECT_RADIO":
        return isStackedView ? (
          <StackedBarChart
            key={index}
            data={chartData?.data.map(({ Name, value }) => ({
              group: Name,
              cca: value
            }))}
            meta={ChartMeta}
            tooltipRenderer={TooltipRenderer}
            rotateLabels={true}
            h={300}
            barColors={colours}
          />
        ) : (
          <HorizontalBarChart
            key={index}
            data={chartData?.data.map(({ Name, value }) => ({
              Name,
              Value: value
            }))}
            meta={{
              ...HorizontalChartMeta,
              countTitle: chartData?.Title,
              barColor: colours
            }}
            barPadding={0.1}
            mt={10}
            mr={100}
            mb={10}
            ml={300}
          />
        );
      case "PieChart":
        return (
          <PieV3
            key={index}
            data={chartData?.data.map(({ Name, value }) => ({
              Name,
              Value: value
            }))}
            width={1000}
            height={400}
            innerRadius={60}
            outerRadius={180}
            showLegend={true}
            legendTextSize="12px"
            legendPosition="right"
            meta={chartData?.meta}
            valueKey="Value"
            labelKey="Name"
          />
        );
      case "NUMBER":
        return <Histogram key={index} data={HistogramData} width={800} height={400} />;
      default:
        return null;
    }
  };

  return (
    <Box className="container" pt={20}>
      <Flex justifyContent="flex-end" mb={10} mt={10}>
        <Button onClick={toggleView}>
          {isStackedView ? "Switch to Horizontal View" : "Switch to Vertical View"}
        </Button>
      </Flex>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={4}>
        {chartDataList.map((chartData, index) => (
          <Box key={index} className="white-box" mb={10}>
            <BoxHeading styles={{ bg: "gray.200" }}>📊 {chartData?.Title}</BoxHeading>
            <Box bg="gray.100" p={20}>
              {renderChart(chartData, index)}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
