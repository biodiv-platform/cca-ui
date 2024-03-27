import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Container, SimpleGrid, Text } from "@chakra-ui/react";
import BoxHeading from "@components/@core/activity/box-heading";
import LocalLink from "@components/@core/local-link";
import { Histogram } from "@components/charts/histogram";
import HorizontalBarChart from "@components/charts/horizontal-bar-chart";
import PieV3 from "@components/charts/pie-v3";
import StackedBarChart from "@components/charts/stacked-bar-chart";
import { cleanAggregationData } from "@utils/field";
import React, { useRef } from "react";

import {
  ChartMeta,
  generateChartDataForAll,
  HistogramData,
  HorizontalChartMeta,
  TooltipRenderer
} from "./data";

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

export default function Stats({ chartData }) {
  const statsData = generateChartDataForAll(
    cleanAggregationData(chartData.stats.aggregation),
    chartData.filtersList
  );

  const renderChart = (chartData, index) => {
    switch (chartData?.Type) {
      case "MULTI_SELECT_CHECKBOX":
      case "SINGLE_SELECT_RADIO":
        return (
          <StackedBarChart
            key={index}
            data={chartData?.data
              .map(({ Name, value }) => ({
                group: Name,
                cca: value
              }))
              .sort((a, b) => a.group.localeCompare(b.group))}
            meta={ChartMeta}
            tooltipRenderer={TooltipRenderer}
            showValues={true}
            h={300}
            barColors={colours}
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
      case "StateDistribution":
        return (
          <HorizontalBarChart
            data={dataForChart}
            meta={{
              ...HorizontalChartMeta,
              countTitle: chartData?.Title,
              barColor: ["#3182CE"]
            }}
            barPadding={0.1}
            mt={0}
            mr={30}
            mb={0}
            ml={150}
            h={500}
          />
        );
      case "NUMBER":
        return <Histogram key={index} data={HistogramData} width={800} height={400} />;
      default:
        return null;
    }
  };

  const chartRefs = useRef<(HTMLDivElement | null)[]>([]);

  const dataForChart = Object.entries(chartData.stats.satewiseAggregation)
    .map(([state, count]) => ({
      Name: state.toUpperCase(),
      Value: count
    }))
    .filter((item) => item.Name !== "?")
    .sort((a, b) => (b.Value as number) - (a.Value as number));

  const stateData = {
    Title: "State distribution",
    Type: "StateDistribution",
    data: dataForChart
  };

  statsData.unshift(stateData);

  return statsData.length ? (
    <Box className="container">
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={4}>
        {statsData.map((chartData, index) => (
          <Box
            key={index}
            className="white-box"
            style={{
              scrollMarginTop: "150px"
            }}
            id={`chart-${index}`}
            ref={(ref) => (chartRefs.current[index] = ref)}
          >
            <BoxHeading
              styles={{
                bgColor: "gray.100"
              }}
            >
              📊 {chartData?.Title}
            </BoxHeading>
            <Box p={10}>{renderChart(chartData, index)}</Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  ) : (
    <Container>
      <Center textAlign="center" height="calc(100vh - var(--heading-height))">
        <div>
          <Text fontSize="2xl" mb={4}>
            {"There are no charts available"}
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
