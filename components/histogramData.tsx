import * as d3 from "d3";
import BarChart from "./charts/barChart";
import { Histogram } from "../types/data";

interface IHistoricalDataProps {
  data: Histogram[];
  width?: number;
  height?: number;
  color?: string; 
}

export default function HistogramData({
  data,
  width,
  height,
  color
}: IHistoricalDataProps) {
  return (
    <BarChart
      data={data}
      x={d => d.bin}
      y={d => d.amount}
      yLabel="↑ Frequency"
      height={height}
      color={color}
    />
  );
};