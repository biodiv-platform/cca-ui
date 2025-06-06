import { Box, Button, Center, Container, SimpleGrid, Text } from "@chakra-ui/react";
import BoxHeading from "@components/@core/activity/box-heading";
import LocalLink from "@components/@core/local-link";
import HorizontalBarChart from "@components/charts/horizontal-bar-chart";
import StackedBarChart from "@components/charts/stacked-bar-chart";
import { ChartMeta, TooltipRenderer } from "@utils/chart";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo, useRef } from "react";
import { LuMoveRight } from "react-icons/lu";

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

export default function Stats({ statsData }) {
  const { t } = useTranslation();

  const chartRefs = useRef<(HTMLDivElement | null)[]>([]);
  const renderChart = (chartData, index) => {
    switch (chartData?.Type) {
      case "MULTI_SELECT_CHECKBOX":
      case "SINGLE_SELECT_RADIO":
        return (
          <StackedBarChart
            key={index}
            data={chartData?.data}
            meta={ChartMeta}
            tooltipRenderer={TooltipRenderer}
            showValues={true}
            h={300}
            barColors={colours}
          />
        );
      case "Statewise distribution":
        return (
          <HorizontalBarChart
            key={index}
            data={chartData?.data}
            meta={ChartMeta}
            barPadding={0.1}
            mt={0}
            mr={30}
            mb={0}
            ml={150}
            h={500}
          />
        );
      default:
        return null;
    }
  };

  const charts = useMemo(
    () =>
      statsData.map((chartData, index) => (
        <Box
          key={index}
          className="white-box"
          style={{ scrollMarginTop: "150px" }}
          id={`chart-${index}`}
          ref={(ref) => {
            chartRefs.current[index] = ref;
          }}
        >
          <BoxHeading styles={{ bgColor: "gray.100" }}>📊 {chartData?.Title}</BoxHeading>
          <Box p={10}>{renderChart(chartData, index)}</Box>
        </Box>
      )),
    [statsData]
  );

  return statsData.length ? (
    <Box className="container">
      <SimpleGrid columns={[1, 1, 1, 2]} gap={4}>
        {charts}
      </SimpleGrid>
    </Box>
  ) : (
    <Container>
      <Center textAlign="center" height="calc(100vh - var(--heading-height))">
        <div>
          <Text fontSize="2xl" mb={4}>
            {t("chart:no_charts_available")}
          </Text>
          <LocalLink prefixGroup={true} href="/participate/list">
            <Button as="a" colorPalette="blue">
              {t("chart:participate")}
              <LuMoveRight />
            </Button>
          </LocalLink>
        </div>
      </Center>
    </Container>
  );
}
