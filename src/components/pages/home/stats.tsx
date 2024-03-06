import { Box, Button, Flex, Text } from "@chakra-ui/react";
import BoxHeading from "@components/@core/activity/box-heading";
import HorizontalBarChart from "@components/charts/horizontal-bar-chart";
import PieV3 from "@components/charts/pie-v3";
import StackedBarChart from "@components/charts/stacked-bar-chart";
import React, { useState } from "react";

import { ChartMeta, generateChartDataForAll, TooltipRenderer } from "./data";

const HorizontalChartMeta = {
  countTitle: "cca's",
  titleKey: "Name",
  countKey: "Value",
  hideXAxis: true
};

const colours = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf"
];

export default function Stats({ filtersList, featured }) {
  const chartDataList = generateChartDataForAll(featured.aggregationData, filtersList);
  const [isStackedView, setIsStackedView] = useState(false);
  const [selectedChartIndex, setSelectedChartIndex] = useState(null);

  const toggleView = () => {
    setIsStackedView((prevState) => !prevState);
  };

  const handleChartClick = (index) => {
    setSelectedChartIndex(index);
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
            h={600}
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
      // case "NUMBER":
      //   return <Histogram key={index} data={HistogramData} width={800} height={400} />;
      // default:
      //   return null;
    }
  };

  return (
    <Box className="container">
      <Flex>
        <Box position="fixed" left="100" top="30%" transform="translateY(-50%)" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Quick Navigation
          </Text>
          <ul style={{ listStyleType: "disc", marginLeft: "1rem" }}>
            {chartDataList.map((chartData, index) => (
              <li key={index}>
                <a
                  href={`#chart-${index}`}
                  style={{
                    textDecoration: "none",
                    color: index === selectedChartIndex ? "teal.500" : "gray.600",
                    fontWeight: index === selectedChartIndex ? "bold" : "normal"
                  }}
                  onClick={() => handleChartClick(index)}
                >
                  {chartData?.Title}
                </a>
              </li>
            ))}
          </ul>
        </Box>
        <Box flex="1" ml="200px">
          <Flex justifyContent="flex-end" mb={10}>
            <Button onClick={toggleView}>
              {isStackedView ? "Switch to Horizontal View" : "Switch to Vertical View"}
            </Button>
          </Flex>
          {chartDataList.map((chartData, index) => (
            <Box
              key={index}
              className="white-box"
              id={`chart-${index}`}
              mt={index === 0 ? "0" : "10"}
              mb={10}
            >
              <BoxHeading>📊 {chartData?.Title}</BoxHeading>
              <Box p={20}>{renderChart(chartData, index)}</Box>
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
