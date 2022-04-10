import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {theme} from '../utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      
    },
  },
  responsive: true,
  scales: {
    xAxes: {display: false},
    y: {
        grid: {
          color: 'transparent',
          drawBorder: false,
          tickColor: 'transparent',
          drawTicks: true,
        },
      },
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    },
    title: {
      display: false,
      text: 'Guess Distribution',
    },
    ChartDataLabels,
    datalabels: {
      color: theme.white,
      anchor: 'end' as any,
      align: 'start' as any,
      font: {
        weight: 'bold' as any
      }
      
    }
  },
};

const labels = ['1', '2', '3', '4', '5', '6', '7'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Guesses',
      data: labels.map(() => 2),
      backgroundColor: theme.darkGrey,
      categoryPercentage: 1.3,
      barPercentage: 0.5,
    },
  ],
};

export const Chart = () => {
  return <Bar options={options} data={data} />;
}

export default Chart
