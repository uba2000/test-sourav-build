import { Chart as ChartJS, ArcElement } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { IDoughnutChartProps } from './types';

ChartJS.register(ArcElement);

const data = {
  labels: ['', '', '', '', '', ''],
  datasets: [
    {
      label: '',
      data: [12],
      backgroundColor: [
        '',
      ],
      borderColor: [
        '',
      ],
      borderWidth: 1,
    },
  ],
};

function DoughnutChart({ chartData, size=100 }: IDoughnutChartProps) {

  const [options, setOptions] = useState(data)

  useEffect(() => { 
    const labels = chartData.map(({name}) => name);
    const data = chartData.map(({ percentage }) => percentage);
    const backgroundColors = chartData.map(({ color }) => color);
    const borderColors = chartData.map(() => '#2E2B59');

    setOptions({
      labels,
      datasets: [
        {
          label: 'name',
          data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          // cutout: '70%'
        }
      ],
    });
  }, [])

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative'
      }}
    >
      <Doughnut
        data={options}
        options={{
          
        }}
      />
    </div>
  )
}

export default DoughnutChart