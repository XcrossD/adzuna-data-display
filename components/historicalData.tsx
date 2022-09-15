import * as d3 from "d3";
import LineChart from "./charts/lineChart";
import { Historical } from "../types/data";

interface IHistoricalDataProps {
  data: Historical[];
  width?: number;
  height?: number;
  color?: string; 
}

export default function HistoricalData({
  data,
  width,
  height,
  color
}: IHistoricalDataProps) {
  return (
    <LineChart
      data={data}
      x={(d: Historical) => d.month}
      y={(d: Historical) => d.average}
      height={height}
      xDomainPad={(domain) => {
        return [d3.utcMonth.offset(domain[0], -1), d3.utcMonth.offset(domain[1], 1)];
      }}
      yDomainPad={(domain) => {
        return [domain[0] * 0.9, domain[1] * 1.1];
      }}
      color={color}
      yLabel="Average Salary ($)"
    />
  )
}