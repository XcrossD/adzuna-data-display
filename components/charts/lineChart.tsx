import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { CurveFactory } from "d3";
import { Historical } from "../../types/data";

interface ILineChartProps {
  data: Historical[];
  x?: (...args: any[]) => any;
  y?: (...args: any[]) => any;
  title?: string;
  defined?: (d: any, i: number) => boolean;
  curve?: CurveFactory;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  width?: number;
  height?: number;
  xType?: any;
  xDomain?: any[];
  xDomainPad?: (...args: any[]) => [any, any];
  xRange?: any[];
  yType?: any;
  yDomain?: any[];
  yDomainPad?: (...args: any[]) => [any, any];
  yRange?: any[];
  color?: string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  yFormat?: string;
  yLabel?: string;
}

export default function LineChart({
  data,
  x = ([x]) => x, // given d in data, returns the (temporal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  title, // given d in data, returns the title text
  defined, // for gaps in data
  curve = d3.curveLinear, // method of interpolation between points
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xType = d3.scaleUtc, // type of x-scale
  xDomain, // [xmin, xmax]
  xDomainPad,
  xRange = [marginLeft, width - marginRight], // [left, right]
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yDomainPad,
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  color = "currentColor", // stroke color of line
  strokeLinecap = "round", // stroke line cap of the line
  strokeLinejoin = "round", // stroke line join of the line
  strokeWidth = 1.5, // stroke width of line, in pixels
  strokeOpacity = 1, // stroke opacity of line
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
}: ILineChartProps) {
  const svgRef = useRef(null);

  useEffect(() => {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const I = d3.range(X.length);
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);

    // Compute default domains.
    if (xDomain === undefined) {
      xDomain = d3.extent(X);
      if (xDomainPad !== undefined) {
        xDomain = xDomainPad(xDomain);
      }
    }
    if (yDomain === undefined) {
      yDomain = d3.extent(Y);
      if (yDomainPad !== undefined) {
        yDomain = yDomainPad(yDomain);
      }
    }

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
    
    const line = d3.line()
      .defined(i => D[i])
      .curve(curve)
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

    // Create root container where we will append all other chart elements
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear svg content before adding new elements
    svg.attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-opacity", strokeOpacity)
        .attr("d", line(I));
    
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  )
}