export interface IDoughnutChartData {
  name: string;
  value: string;
  percentage: number;
  color: string;
}

export interface IDoughnutChartProps {
  chartData: IDoughnutChartData[];
  size?: number;
}
