import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { select } from "d3-selection";
import { arc, pie } from "d3-shape";
import React, { useEffect, useRef } from "react";

const PieChart = (props) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Clear the SVG to prevent duplication on each render
    select(svgRef.current).selectAll("*").remove();

    // Setup the color scheme
    const colors = scaleOrdinal(schemeCategory10);

    // Define the pie layout using the dynamic valueKey from props
    const createPie = pie()
      .value((d) => d[props.valueKey])
      .sort(null);

    // Define the arc generator
    const createArc = arc().innerRadius(props.innerRadius).outerRadius(props.outerRadius);

    // Compute the pie layout
    const data = createPie(props.data);

    // Select the SVG element and set its dimensions
    const svg = select(svgRef.current);

    // Draw the chart centered in the SVG
    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${props.width / 2}, ${props.height / 2})`);

    // Draw each arc slice
    const arcs = chartGroup.selectAll(".arc").data(data).enter().append("g").attr("class", "arc");

    arcs
      .append("path")
      .attr("d", createArc)
      .attr("fill", (d, i) => colors(i));

    // Append text labels to each arc slice using the dynamic labelKey from props
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("fill", "white") // Ensure text color contrasts well with slice colors
      .style("font-size", "12px")
      .text((d) => d.data[props.valueKey]);

    // Check if legend is enabled and set its position
    if (props.showLegend) {
      // Define the legend's position
      const legendTransform =
        {
          left: `translate(30, ${props.height / 2})`,
          right: `translate(${props.width - 250}, ${props.height / 2})`,
          top: `translate(${props.width / 2}, 20)`,
          bottom: `translate(${props.width / 2}, ${props.height - 40})`
        }[props.legendPosition] || `translate(${props.width - 120}, ${props.height / 2})`;

      // Draw the legend
      const legendGroup = svg.append("g").attr("transform", legendTransform);
      legendGroup
        .selectAll(".legend-item")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`)
        .each(function (d, i) {
          select(this).append("rect").attr("width", 10).attr("height", 10).attr("fill", colors(i));
          select(this)
            .append("text")
            .attr("x", 20)
            .attr("y", 10)
            .text(d.data[props.labelKey])
            .style("font-size", props.legendTextSize || "10px")
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle");
        });
    }
  }, [
    props.data,
    props.innerRadius,
    props.outerRadius,
    props.showLegend,
    props.legendPosition,
    props.legendTextSize,
    props.width,
    props.height,
    props.valueKey, // Add these as dependencies to ensure component updates if they change
    props.labelKey
  ]);

  return (
    <div style={{ maxWidth: "100%", height: "auto" }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${props.width} ${props.height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", margin: "0 auto" }}
      >
        {/* SVG content is dynamically added */}
      </svg>
    </div>
  );
};

export default PieChart;
