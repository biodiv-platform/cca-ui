import { Histogram } from "@components/charts/histogram";
import HorizontalBarChart from "@components/charts/horizontal-bar-chart";
import PieV3 from "@components/charts/pie-v3";
import StackedBarChart from "@components/charts/stacked-bar-chart";
import React from "react";

export const ChartMeta = {
  groupKey: "group",
  subGroupKeys: ["cca"],
  subGroupColors: ["#3182CE", "#E53E3E"]
};

export const HorizontalChartMeta = {
  countTitle: "cca's",
  titleKey: "Name",
  countKey: "Value",
  hideXAxis: true
};

export const TooltipRenderer = (data) => {
  return `<b>${data[ChartMeta.groupKey]}</b><br/>
  <nobr> ${data?.cca} cca's</nobr>`;
};

export const HistogramData = [
  75.0, 104.0, 369.0, 300.0, 92.0, 64.0, 265.0, 35.0, 287.0, 69.0, 52.0, 23.0, 287.0, 87.0, 114.0,
  114.0, 98.0, 137.0, 87.0, 90.0, 63.0, 69.0, 80.0, 113.0, 58.0, 115.0, 30.0, 35.0, 92.0, 460.0,
  74.0, 72.0, 63.0, 115.0, 60.0, 75.0, 31.0, 277.0, 52.0, 218.0, 132.0, 316.0, 127.0, 87.0, 449.0,
  46.0, 345.0, 48.0, 184.0, 149.0, 345.0, 92.0, 749.0, 93.0, 9502.0, 138.0, 48.0, 87.0, 103.0, 32.0,
  93.0, 57.0, 109.0, 127.0, 149.0, 78.0, 162.0, 173.0, 87.0, 184.0, 288.0, 576.0, 460.0, 150.0,
  127.0, 92.0, 84.0, 115.0, 218.0, 404.0, 52.0, 85.0, 66.0, 52.0, 201.0, 287.0, 69.0, 114.0, 379.0,
  115.0, 161.0, 91.0, 231.0, 230.0, 822.0, 115.0, 80.0, 58.0, 207.0, 171.0, 156.0, 91.0, 138.0,
  104.0, 691.0, 74.0, 87.0, 63.0, 333.0, 125.0, 196.0, 57.0, 150000.0
];

export const PieChartData = [
  {
    State: "Andaman and Nicobar Islands",
    CCA: 2
  },
  {
    State: "Andhra Pradesh",
    CCA: 6
  },
  {
    State: "Arunachal Pradesh",
    CCA: 5
  },
  {
    State: "Assam",
    CCA: 15
  }
];
export const StackedBarChartData = [
  {
    group: "Chhattisgarh",
    cca: 80
  },
  {
    group: "Dadra and Nagar Haveli and Daman and Diu",
    cca: 20
  },
  {
    group: "Delhi",
    cca: 20
  },
  {
    group: "Goa",
    cca: 30
  },
  {
    group: "Gujarat",
    cca: 90
  }
];

export const renderChart = (chartData, index, isStackedView = false) => {
  console.warn("chartData", chartData);

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
          h={400}
        />
      ) : (
        <HorizontalBarChart
          key={index}
          data={chartData?.data.map(({ Name, value }) => ({
            Name,
            Value: value
          }))}
          meta={{ ...HorizontalChartMeta, countTitle: chartData?.Title, barColor: "#319795" }}
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

interface ChartDataItem {
  Name: string;
  value: any;
}

export const generateChartDataForAll = (aggregationData, filtersList) => {
  const generateChartData = (dataKey: string, aggregationValues: Record<string, any>) => {
    const filter = filtersList.find((filter) => filter.fieldId === dataKey);
    if (!filter) {
      console.warn(`Matching filter not found for ${dataKey}`);
      return null; // Return null if no matching filter to handle gracefully
    }

    const chartData = {
      Title: filter.name,
      Type: filter.type,
      data: [] as ChartDataItem[] // Explicitly specify the type of chartData.data
    };

    // Including all categories directly, including different "Others"
    Object.keys(aggregationValues).forEach((key) => {
      chartData.data.push({
        Name: key,
        value: aggregationValues[key]
      });
    });

    return chartData;
  };

  // Filter out null values in case of unmatched dataKey and filters
  return Object.keys(aggregationData)
    .map((dataKey) => generateChartData(dataKey, aggregationData[dataKey]))
    .filter((chartData) => chartData !== null);
};

