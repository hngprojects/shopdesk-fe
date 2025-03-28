import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { useStore } from '@/store/useStore';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const RevenueGraph = () => {
  const {
    revenueData,
    fetchRevenue,
    isRevenueLoading,
    isRevenueError,
    metrics,
  } = useStore();
  const [selectedDataType, setSelectedDataType] = useState<string>('');

  const isEmpty = revenueData.length === 0;

  const chartData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Weekly Revenue',
        data: revenueData,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 250000,
        ticks: {
          stepSize: 50000,
          callback: function (value: string | number) {
            return `₦${Number(value).toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className='bg-white p-4 rounded-xl shadow'>
      <div className='flex lg:flex-row flex-col items-start gap-4 justify-between'>
        <div className='flex '>
          <h2 className='text-[16px] font-bold mb-4'>Revenue</h2>
          <ChevronDownIcon />
        </div>
        <div className='flex justify-center gap-2.5 items-center'>
          <div className='flex rounded-full bg-blue-400 size-2.5'></div>
          <p className='text-[12px] '>Revenue for this week</p>
        </div>
        <div className='flex justify-center gap-2.5 items-center'>
          <div className='flex rounded-full bg-black size-2.5'></div>
          <p className='text-[12px]'>Revenue for Last week</p>
        </div>
        <div className='flex justify-center gap-2.5 items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type='button'
                className='border-gray-300 flex h-[32px] items-center justify-between rounded-[9px] border bg-white p-2 lg:p-3 text-left'
              >
                <div className='flex items-center gap-2'>
                  <span
                    className={`text-[16px] font-circular-normal ${selectedDataType ? 'text-black' : 'text-[#B8B8B8]'}`}
                  >
                    {selectedDataType || 'Monthly'}
                  </span>
                </div>
                <ChevronDownIcon className='h-4 w-4' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='max-h-60 min-w-0 overflow-y-auto'>
              <DropdownMenuItem onClick={() => setSelectedDataType('Weekly')}>
                Weekly
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDataType('Monthly')}>
                Monthly
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDataType('Yearly')}>
                Yearly
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {(() => {
        const revenueChange = metrics[0]?.change;
        const percentMatch = revenueChange?.match(/([+-]?\d+)%/);
        const previousMatch = revenueChange?.match(/₦[\d,]+/);

        const percent = percentMatch ? parseInt(percentMatch[1]) : 0;
        const previous = previousMatch ? previousMatch[0] : '₦0';

        const isPositive = percent >= 0;
        const arrow = isPositive ? '↑' : '↓';
        const colorClass = isPositive ? 'text-green-600' : 'text-red-600';

        return (
          <p
            className={`text-xs px-2 py-1 rounded inline-block mt-2.5 lg:mt-0 ${isPositive ? 'bg-green-100' : 'bg-red-100'} ${colorClass}`}
          >
            {arrow} {Math.abs(percent)}% vs. {previous} last week
          </p>
        );
      })()}
      {isRevenueLoading && (
        <p className='text-sm text-gray-500 mb-2'>Loading data...</p>
      )}
      {isRevenueError && (
        <p className='text-sm text-red-500 mb-2'>Error loading data</p>
      )}
      {isEmpty && !isRevenueLoading && !isRevenueError && (
        <p className='text-sm text-gray-400 mb-2'>No revenue data available</p>
      )}
      <div className='w-full max-w-full sm:max-w-[100%] md:max-w-[100%] lg:max-w-[100%] h-[250px] lg:h-[400px]'>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RevenueGraph;
