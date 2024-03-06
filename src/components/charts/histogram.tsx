import { bin } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import React, { useEffect, useMemo, useRef, useState } from "react";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const BUCKET_PADDING = 1;

type HistogramProps = {
  width: number;
  height: number;
  data: number[];
};

export const Histogram = ({ width, height, data }: HistogramProps) => {
  const axesRef = useRef(null);
  const [bucketNumber, setBucketNumber] = useState(20); // Initial number of bins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain([0, 1000]) // note: limiting to 1000 instead of max here because of extreme values in the dataset
      .range([10, boundsWidth]);
  }, [data, width]);

  const updateHistogram = (nBin: number) => {
    const bucketGenerator = bin()
      .value((d) => d)
      .domain(xScale.domain())
      .thresholds(xScale.ticks(nBin));
    const buckets = bucketGenerator(data);

    const yScale = scaleLinear()
      .range([boundsHeight, 0])
      .domain([0, Math.max(...buckets.map((bucket) => bucket.length))])
      .nice();

    const svgElement = select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);

    const allRects = svgElement
      .selectAll("rect")
      .data(buckets)
      .enter()
      .append("rect")
      .attr("fill", "#319795")
      .attr("x", (d) => xScale(d.x0) + BUCKET_PADDING / 2)
      .attr("width", (d) => xScale(d.x1) - xScale(d.x0) - BUCKET_PADDING)
      .attr("y", (d) => yScale(d.length))
      .attr("height", (d) => boundsHeight - yScale(d.length));

    return allRects;
  };

  // Initial histogram render
  useEffect(() => {
    updateHistogram(bucketNumber);
  }, [bucketNumber, boundsHeight, boundsWidth]);

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <g ref={axesRef} />
        </g>
      </svg>
      <input
        type="range"
        min={1}
        max={100}
        value={bucketNumber}
        onChange={(e) => setBucketNumber(+e.target.value)}
      />
    </div>
  );
};
