import React, { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ChevronDownIcon } from "lucide-react";
import { DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,} from "@/components/ui/dropdown-menu"
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { useStore } from "@/store/useStore";

// Register the Filler plugin
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const RevenueGraph = () => {
  const { revenueData, fetchRevenue, isRevenueLoading, isRevenueError, metrics } = useStore();
  useEffect(() => {
    fetchRevenue();
  }, [fetchRevenue]);
  const [selectedDataType, setSelectedDataType] = useState<string>("");

  const isEmpty = revenueData.length === 0;

  const dummyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue for this week',
        data: [0, 130000, 120000, 120000, 125000, 130000, 150000, 155000, 130000, 160000, 190000, 230000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: '#0096FF',
        pointBorderColor: 'transparent',
      },
      {
        label: 'Revenue for last week',
        data: [0, 100000, 90000, 90000, 95000, 100000, 120000, 125000, 110000, 130000, 160000, 200000],
        borderColor: '#000000',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        tension: 0.3,
        pointRadius: 1,
        pointHoverRadius: 3,
        pointBackgroundColor: 'black',
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: '#4f46e5', 
        pointHoverBorderColor: '#4f46e5',     
      },
    ],
  };

  const chartData: ChartData<"line", number[], string> = isRevenueLoading || isEmpty || isRevenueError ? dummyChartData : {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Weekly Revenue',
        data: revenueData as number[], 
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: 'transparent', 
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: '#4f46e5',
        pointHoverBorderColor: '#4f46e5',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: '#ffffff',
        titleColor: '#1C1C1C',
        bodyColor: '#4B5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 16,
        boxPadding: 6,
        cornerRadius: 10,
        caretSize: 6,
        displayColors: true,
        usePointStyle: true,
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          title: function () {
            return 'Revenue';
          },
          labelPointStyle: () => ({
            pointStyle: 'circle',
            rotation: 0
          }),
          label: function (context) {
            const value = context.raw;
            return `₦${Number(value).toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 250000,
        border: {
          display: false,
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          color: '#E5E7EB',
        },
        ticks: {
          stepSize: 50000,
          callback: function (value: string | number) {
            const val = typeof value === 'number' ? value : parseInt(value);
            if ([0, 50000, 100000, 150000, 200000, 250000].includes(val)) {
              return `₦${val / 1000}k`;
            }
            return '';
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex  items-start gap-4 justify-between">
        <div className="flex ">
          <h2 className="text-[16px] font-bold mb-4">Revenue</h2>
          <ChevronDownIcon/>
        </div>
        <div className='flex lg:gap-8 lg:flex-row flex-col'>
          <div className="flex justify-center gap-2.5 items-center">
            <div className="flex rounded-full bg-blue-400 size-1.5 lg:size-2.5"></div>
            <p className="text-[8px] lg:text-[12px] text-gray-500">Revenue for this week</p>
          </div>
          <div className="flex justify-center gap-2.5 items-center">
            <div className="flex rounded-full bg-black size-1.5 lg:size-2.5"></div>
            <p className='text-[8px] lg:text-[12px] text-gray-500'>Revenue for Last week</p>
          </div>
        </div>
        <div className="flex justify-center gap-2.5 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="border-gray-300 flex h-[32px] items-center justify-between rounded-[9px] border bg-white p-2 lg:p-3 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[12px] font-circular-normal ${selectedDataType ? 'text-black' : 'text-[#B8B8B8]'}`}>
                    {selectedDataType || "Monthly"}
                  </span>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-60 min-w-0 overflow-y-auto">
              <DropdownMenuItem onClick={() => setSelectedDataType("Weekly")}>
                Weekly
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDataType("Monthly")}>
                Monthly
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDataType("Yearly")}>
                Yearly
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Render revenue data */}
      {(() => {
        const revenueChange = metrics[0]?.change || "₦0"; // Fallback to default value if `metrics[0]?.change` is undefined
        const percentMatch = revenueChange.match(/([+-]?\d+)%/);
        const previousMatch = revenueChange.match(/₦[\d,]+/);

        const percent = percentMatch ? parseInt(percentMatch[1]) : 0;
        const previous = previousMatch ? previousMatch[0] : '₦0';

        const isPositive = percent >= 0;
        const arrow = isPositive ? "↑" : "↓";
        const colorClass = isPositive ? "text-green-400" : "text-red-400";

        return (
          <div className='mb-[21px]'>
            <h3 className="text-2xl lg:text-[32px] text-[#111827] mt-2">{metrics[0]?.value || "₦2,300,125"}</h3>
            <p className={`text-xs px-2 py-1 rounded-xl inline-block mt-1 lg:mt-0 ${isPositive ? 'bg-green-50' : 'bg-red-50'} ${colorClass}`}>
              {arrow} {Math.abs(percent)}% vs. {previous} last week
            </p>
          </div>
        );
      })()}

      {isRevenueLoading && <p className="text-sm text-gray-500 mb-2">Loading data...</p>}
      {isEmpty && !isRevenueLoading && !isRevenueError && (
        <p className="text-sm text-gray-400 mb-2">No revenue data available</p>
      )}
      <div className="w-full max-w-full sm:max-w-[100%] md:max-w-[100%] lg:max-w-[100%] h-[250px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RevenueGraph;