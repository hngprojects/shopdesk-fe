'use client';
import React, { useState } from 'react';
import ExportModal from '@/components/modal/export-data';
import { Search, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import Revenue from '@/components/report/revenue';
import BestSelling from '@/components/report/bestSellingProducts';
import { useStore } from '@/store/useStore';

function ReportDashboard() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const openExportModal = () => setIsExportModalOpen(true);
  const closeExportModal = () => setIsExportModalOpen(false);

  const metrics = [
    {
      title: 'Total Revenue',
      value: '₦0',
      change: '+0% vs last week',
      icon: '/icons/revenue.svg',
      textColor: 'text-grey-600',
    },
    {
      title: 'Gross Profit Margin',
      value: '₦0',
      change: '+0% vs last week',
      icon: '/icons/gross.svg',
      textColor: 'text-grey-600',
    },
    {
      title: 'Stock Turnover Rate',
      value: '0 Units',
      change: '0% vs last week',
      icon: '/icons/stockturn.svg',
      textColor: 'text-gray-600',
    },
    {
      title: 'Total Sale Transaction',
      value: '0 Units',
      change: '+0% vs last week',
      icon: '/icons/TotalSale.svg',
      textColor: 'text-grey-600',
    },
  ];

  const { metrics: fetchedMetrics, isMetricsLoading } = useStore();

  metrics.forEach((metric, index) => {
    if (fetchedMetrics[index]) {
      metric.value = fetchedMetrics[index].value;
      metric.change = fetchedMetrics[index].change;
    }
  });

  return (
    <div className='pb-6 bg-white'>
      <div className=' lg:bg-gray-100 z-50 relative rounded-[12px]'>
        <div className='mb-6'>
          <div className='flex items-center  lg:justify-end'>
            <div className='px-2 py-4 gap-[19px] bg-white rounded-bl-2xl flex justify-center items-center'>
              <div className='flex h-[48px] items-center justify-start gap-2 rounded-md border border-neutral-75 bg-white px-2 py-[0.875rem]'>
                <Search className='size-4 flex-shrink-0 text-neutral-400' />
                <input
                  type='text'
                  placeholder='Search by item name'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-[calc(100%-1rem)] flex-1 text-sm focus:border-none focus:outline-none'
                />
              </div>
              <button
                className='bg-white text-[16px] hidden gap-[6px] lg:flex h-[48px] w-[113px] items-center justify-center text-black pl-[16px] pr-[24px] py-[12px] rounded-[12px] border border-[#1B1B1B ]'
                onClick={openExportModal}
              >
                <ArrowUp className='size-[18px]' />
                Export
              </button>
              <button
                className='bg-white text-[16px] lg:hidden gap-[6px] flex h-[48px] items-center justify-center text-black p-3.5 rounded-[12px] border border-[#1B1B1B ]'
                onClick={openExportModal}
              >
                <ArrowUp className='size-[18px]' />
              </button>
            </div>
          </div>

          <div className='p-[20px]'>
            <div className='lg:grid flex flex-col md:grid-cols-4 gap-4 mb-6'>
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className='bg-white flex flex-col rounded shadow'
                >
                  <div className='flex items-center w-full gap-2 lg:gap-[12px] pt-5 pb-5 pl-3'>
                    <div className='flex items-center justify-center size-4 lg:size-[32px] border rounded-[8px]'>
                      <Image
                        src={metric.icon}
                        alt={metric.title}
                        width={16}
                        height={16}
                      />
                    </div>
                    <h2 className='text-[14px] lg:text-[16px] font-medium text-gray-500'>
                      {metric.title}
                    </h2>
                  </div>
                  <div className='border-b-2'></div>
                  <div className='flex flex-col pl-3 pb-3.5 pt-4'>
                    {(() => {
                      const percentMatch = metric.change.match(/([+-]?\d+)%/);
                      const percent = percentMatch
                        ? parseInt(percentMatch[1])
                        : 0;
                      const isPositive = percent >= 0;
                      const arrow = isPositive ? '↑' : '↓';
                      const colorClass = isPositive
                        ? 'text-green-600'
                        : 'text-red-600';
                      const value = metric.value || '₦0';

                      return (
                        <>
                          {isMetricsLoading ? (
                            <div className='h-6 bg-gray-100 animate-pulse rounded w-24'></div>
                          ) : (
                            <p
                              className={`lg:text-2xl font-bold ${metric.textColor}`}
                            >
                              {value}
                            </p>
                          )}
                          <p className='text-xs mt-1'>
                            <span
                              className={`px-2 py-1 rounded ${isPositive ? 'bg-green-100' : 'bg-red-100'} ${colorClass}`}
                            >
                              {arrow} {Math.abs(percent)}% vs. last week
                            </span>
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>

            <Revenue />
            <BestSelling />
          </div>
        </div>
      </div>

      <ExportModal isOpen={isExportModalOpen} onClose={closeExportModal} />
    </div>
  );
}

export default ReportDashboard;
