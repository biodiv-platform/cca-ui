import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import React, { useEffect, useRef } from "react";

import useResizeObserver from "./hooks/use-resize-observer";

interface HorizontalBarChartProps {
  h?: number;

  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;

  barPadding?: number;
  leftOffset?: number;
  displayCountKey?: boolean;

  data: any[];
  meta: {
    titleKey: string;
    countKey: string;
    countTitle?: string;
    barColor?: string | string[]; // Change barColor to accept array of strings
    hideXAxis?: boolean;
  };
}

export default function HorizontalBarChart({
  h = 300,

  mt = 10,
  mr = 64,
  mb = 20,
  ml = 60,

  barPadding = 0.2,
  leftOffset = 0,
  displayCountKey = false,

  data,
  meta: { titleKey, countKey, countTitle, barColor, hideXAxis }
}: HorizontalBarChartProps) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const ro = useResizeObserver(containerRef);

  useEffect(() => {
    if (!ro?.width || !data.length) return;

    const svg = select(svgRef.current).attr("width", ro.width).attr("height", h);

    svg.select(".content").attr("transform", `translate(${ml},${mt})`);

    const max = Math.max(...data.map((o) => o[countKey]));

    const x = scaleLinear()
      .domain([0, max])
      .range([0, ro.width - ml - mr]);

    if (!hideXAxis) {
      svg
        .select(".x-axis")
        .join("g")
        .attr("transform", `translate(0,${h - mt - mb})`)
        .call(axisBottom(x).tickSizeOuter(0) as any);
    }

    const y = scaleBand()
      .range([0, h - mt - mb])
      .domain(data.map((d) => d[titleKey]))
      .padding(barPadding);

    svg
      .select(".y-axis")
      .join("g")
      .attr("transform", `translate(${leftOffset},0)`)
      .call(axisLeft(y).tickSizeOuter(0) as any);

    //Bars
    svg
      .select(".chart")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", x(0) + leftOffset)
      .attr("y", (d) => y(d[titleKey]))
      .attr("width", (d) => (d[countKey] ? x(d[countKey]) : 0))
      .attr("height", y.bandwidth())
      .attr("fill", (d, i) => {
        if (Array.isArray(barColor)) {
          return barColor[i % barColor.length];
        } else {
          return barColor ? barColor : `hsl(${(i * 360) / data.length}, 70%, 50%)`;
        }
      });

    svg
      .select(".chart")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("font-size", 10)
      .attr("y", (d) => y(d[titleKey]) + y.bandwidth() / 2 + 4)
      .attr("x", (d) => x(d[countKey]) + 3 + leftOffset)
      .text((d) => (displayCountKey ? `${d[countKey]} ${countTitle || countKey}` : d[countKey]));
  }, [containerRef, ro?.width, h, data, barColor]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg width={ro?.width} height={h} ref={svgRef}>
        <g className="content">
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="chart" />
        </g>
      </svg>
    </div>
  );
}
