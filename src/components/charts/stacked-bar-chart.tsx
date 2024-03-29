import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { stack } from "d3-shape";
import React, { useEffect, useRef } from "react";

import useResizeObserver from "./hooks/use-resize-observer";
import { tooltipHelpers, useTooltip } from "./hooks/use-tooltip";
import Legend from "./legend";

interface StackedBarChartProps {
  h?: number;

  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;

  barPadding?: number;
  rotateLabels?: boolean;
  showValues?: boolean;

  data: any[];
  meta: { groupKey: string; subGroupKey: string };
  tooltipRenderer;

  barColors?: string[]; // Add a prop to specify bar colors
}

export default function StackedBarChart({
  h = 360,

  mt = 10,
  mr = 0,
  mb = 60,
  ml = 40,

  barPadding = 0.2,
  rotateLabels,
  showValues,

  data,
  meta: { groupKey, subGroupKey },

  tooltipRenderer,

  barColors = ["teal"]
}: StackedBarChartProps) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const ro = useResizeObserver(containerRef);

  // tooltip
  const tip = useTooltip(containerRef);
  const tipHelpers = tooltipHelpers(tip, tooltipRenderer);

  useEffect(() => {
    if (!ro?.width || !data.length) return;

    // append the svg object to the body of the page
    const svg = select(svgRef.current).attr("width", ro.width).attr("height", h);

    svg.select(".content").attr("transform", `translate(${ml},${mt})`);

    const groups = data.map((o) => o[groupKey]);

    const x = scaleBand()
      .domain(groups)
      .range([0, ro.width - ml - mr])
      .padding(barPadding);

    const xAxis = svg
      .select(".x-axis")
      .join("g")
      .attr("transform", `translate(0,${h - mt - mb})`)
      .call(axisBottom(x).tickSize(0) as any);

    if (rotateLabels) {
      xAxis
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-60)")
        .text(function (d) {
          // Check label length and add ellipsis if it exceeds a threshold
          const labelThreshold = 6; // Adjust this threshold as needed
          return d.length > labelThreshold ? d.substring(0, labelThreshold) + "..." : d;
        });
    }

    if (showValues) {
      xAxis
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-60)")
        .text("");
    }

    const max = Math.max(...data.map((o) => o[subGroupKey]));

    const y = scaleLinear()
      .domain([0, max])
      .range([h - mt - mb, 10]);

    svg
      .select(".y-axis")
      .join("g")
      .call(axisLeft(y) as any);

    const stackedData = stack().keys([subGroupKey])(data);

    svg
      .select(".chart")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .on("mouseover", tipHelpers.mouseover)
      .on("mousemove", tipHelpers.mousemove)
      .on("mouseleave", tipHelpers.mouseleave)
      .attr("x", (d) => x(d?.data[groupKey]))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("fill", (_, i) => barColors[i % barColors.length]);

    // Add text for bar values
    svg
      .select(".chart")
      .selectAll(".bar-value")
      .data(stackedData)
      .join("g")
      .selectAll(".bar-value-text")
      .data((d) => d)
      .join("text")
      .attr("class", "bar-value-text")
      .attr("x", (d) => x(d?.data[groupKey]) + x.bandwidth() / 2)
      .attr("y", (d) => y(d[1]) - 5) // Adjust the position of the text
      .attr("text-anchor", "middle")
      .text((d) => d[1] - d[0]); // Show the difference between upper and lower values of the bar
  }, [containerRef, ro?.width, h, data]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg width={ro?.width} height={h} ref={svgRef}>
        <g className="content">
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="chart" />
        </g>
      </svg>
      <div className="tooltip" />
      <Legend keys={data} colors={barColors} />
    </div>
  );
}
