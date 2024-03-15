import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import BoxHeading from "@components/@core/activity/box-heading";
import LocalLink from "@components/@core/local-link";
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
  "#c7eae5",
  "#80cdc1",
  "#35978f",
  "#01665e",
  "#003c30"
];

export default function Stats({ filtersList, featured }) {
  const chartDataList = generateChartDataForAll(featured.aggregationData, filtersList);

  console.warn("chartDataList", chartDataList);
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
            data={
              chartData?.data
                .map(({ Name, value }) => ({
                  group: Name,
                  cca: value
                }))
                // .sort((a, b) => a.cca - b.cca) // Sort in ascending order by 'cca' value
                // .sort((a, b) => b.cca - a.cca) // Sort in descending order by 'cca' value
                // .sort((a, b) => b.group.localeCompare(a.group)) // Sort in descending order by 'group' (Name)
                .sort((a, b) => a.group.localeCompare(b.group)) // Sort in ascending order by 'group' (Name)
            }
            meta={ChartMeta}
            tooltipRenderer={TooltipRenderer}
            showValues={true}
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
            mr={30}
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

  return chartDataList.length ? (
    <Box className="container" pt={20}>
      <Flex justifyContent="flex-end" mb={10} mt={10} hidden={true}>
        <Button onClick={toggleView}>
          {isStackedView ? "Switch to Horizontal View" : "Switch to Vertical View"}
        </Button>
      </Flex>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={4}>
        {chartDataList.map((chartData, index) => (
          <Box key={index} className="white-box" mb={10}>
            <BoxHeading styles={{ bg: "gray.100" }}>📊 {chartData?.Title}</BoxHeading>
            <Box p={10}>{renderChart(chartData, index)}</Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  ) : (
    <Container>
      <Center textAlign="center" height="calc(100vh - var(--heading-height))">
        <div>
          <Text fontSize="xl" mb={4}>
            {"No charts Available"}
          </Text>

          <LocalLink prefixGroup={true} href="/participate/list">
            <Button as="a" colorScheme="blue" rightIcon={<ArrowForwardIcon />}>
              {"Participate"}
            </Button>
          </LocalLink>
        </div>
      </Center>
    </Container>
  );
}
