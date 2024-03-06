import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { stack } from "d3-shape";
import React, { useEffect, useRef } from "react";

import useResizeObserver from "./hooks/use-resize-observer";
import { tooltipHelpers, useTooltip } from "./hooks/use-tooltip";

interface StackedBarChartProps {
  h?: number;

  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;

  barPadding?: number;
  rotateLabels?: boolean;

  data: any[];
  meta: { groupKey: string; subGroupKeys };

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

  data,
  meta: { groupKey, subGroupKeys },

  tooltipRenderer,

  barColors = ["#319795"] // Default to empty array if not provided
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

    const x: any = scaleBand()
      .domain(groups)
      .range([0, ro.width - ml - mr])
      .padding(barPadding);

    const xAxis = svg
      .select(".x-axis")
      .join("g")
      .attr("transform", `translate(0,${h - mt - mb})`)
      .call(axisBottom(x).tickSizeOuter(0) as any);

    if (rotateLabels) {
      xAxis
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-60)")
        .text(function (d) {
          // Check label length and add ellipsis if it exceeds a threshold
          const labelThreshold = 10; // Adjust this threshold as needed
          return d.length > labelThreshold ? d.substring(0, labelThreshold) + "..." : d;
        });
    }

    const max = Math.max(
      ...data.map((o) => subGroupKeys.map((k) => o[k]).reduce((a, b) => a + b, 0))
    );

    // Add Y axis
    const y: any = scaleLinear()
      .domain([0, max])
      .range([h - mt - mb, 0]);

    svg
      .select(".y-axis")
      .join("g")
      .call(axisLeft(y) as any);

    // stack per subgroup
    const stackedData = stack().keys(subGroupKeys)(data);

    // show the bars
    svg
      .select(".chart")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .selectAll("rect")
      // second time loop per subgroup to add all rectangles
      .data((d) => d)
      .join("rect")
      .on("mouseover", tipHelpers.mouseover)
      .on("mousemove", tipHelpers.mousemove)
      .on("mouseleave", tipHelpers.mouseleave)
      .attr("x", (d) => x(d?.data[groupKey]))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("fill", (_, i) => barColors[i % barColors.length]); // Use specified bar colors
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
    </div>
  );
}
