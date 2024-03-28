export const ChartMeta = {
  groupKey: "Name",
  subGroupKey: "Value"
};

export const TooltipRenderer = (data) => {
  console.warn("data", data);
  return `<b>${data[ChartMeta.groupKey]}</b><br/>
  <nobr> ${data?.Value} CCAs</nobr>`;
};

interface ChartDataItem {
  Name: string;
  Value: any;
}

export const generateChartData = (aggregationData, filtersList) => {
  const generateChart = (filter, aggregationValues: Record<string, any>) => {
    const chartData = {
      Title: filter.name,
      Type: filter.type,
      data: [] as ChartDataItem[]
    };

    // Iterate through value options to check for corresponding aggregation data
    filter.valueOptions.forEach((option) => {
      const value = aggregationValues[option.value];
      if (value !== undefined) {
        chartData.data.push({
          Name: option.value.replace("|?", ""),
          Value: value
        });
      }
    });

    return chartData;
  };

  const chartDataArray = filtersList
    .map((filter) => {
      const aggregationValues = aggregationData[filter.fieldId];
      if (!aggregationValues) {
        console.warn(`Aggregation data not found for ${filter.name}`);
        return null;
      }
      return generateChart(filter, aggregationValues);
    })
    .filter((chartData): chartData is NonNullable<typeof chartData> => chartData !== null);

  // Filter out empty chart data objects
  const nonEmptyChartDataArray = chartDataArray.filter((chartData) => chartData.data.length > 0);

  return nonEmptyChartDataArray;
};
