"use client";
import React from "react";
// import { Search, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import Revenue from '@/components/report/revenue'
import BestSelling from '@/components/report/bestSellingProducts';
import { useStore } from "@/store/useStore";

function ReportDashboard() {
  // const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  // const openExportModal = () => setIsExportModalOpen(true);
  // const closeExportModal = () => setIsExportModalOpen(false);

  const metrics = [
  {
    title: "Total Revenue",
    value: "₦1,123,000",
    change: "+0% vs last week",
    icon: "/icons/revenue.svg",
    textColor: "text-grey-600",
    graph: "/icons/totalgraph.svg",
  },
  {
    title: "Gross Profit Margin",
    value: "₦400,000",
    change: "+10% vs last week",
    icon: "/icons/gross.svg",
    textColor: "text-grey-600",
    graph: "/icons/totalgraph.svg",
  },
  {
    title: "Stock Turnover Rate",
    value: "0 Units",
    change: "-0% vs last week",
    icon: "/icons/stockturn.svg",
    textColor: "text-gray-600",
    graph: "/icons/totalgraph.svg",
  },
  {
    title: "Total Sale Transaction",
    value: "52 Units",
    change: "-0% vs last week",
    icon: "/icons/TotalSale.svg",
    textColor: "text-grey-600",
    graph: "/icons/totalgraph.svg",
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
    <div className="pb-6 bg-white">
      <div className=" lg:bg-gray-100 lg:rounded-tr-xl border">
        <div className="mb-6">
          <div className="lg:p-[20px]">
            <div className="flex  flex-row lg:gap-4 mb-6 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible scrollbar-hide">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white  min-w-[196px] mx-3 lg:mx-0 lg:mt-0 mt-4 border flex flex-col rounded-xl shadow">
                  <div className="flex items-center w-full gap-2 lg:gap-[12px] pt-5 pb-5 pl-3">
                    <div className="flex items-center justify-center size-4 lg:size-[32px] border rounded-[8px]">
                      <Image src={metric.icon} alt={metric.title} width={16} height={16} />
                    </div>
                    <h2 className="text-[14px] lg:text-[16px] font-medium text-gray-800">{metric.title}</h2>
                  </div>
                  <div className="border-b-2"></div>
                  <div className="flex flex-col pl-3 pb-3.5 pt-4">
                    {(() => {
                      const percentMatch = metric.change.match(/([+-]?\d+)%/);
                      const percent = percentMatch ? parseInt(percentMatch[1]) : 0;
                      const isPositive = metric.change.trim().startsWith('+');
                      const arrow = isPositive ? "↑" : "↓";
                      const colorClass = isPositive ? "text-green-400" : "text-red-400";
                      const value = metric.value || "₦0";
                    

                      return (
                        <>
                          {isMetricsLoading ? (
                            <div className="h-6 bg-gray-100 animate-pulse rounded w-24"></div>
                          ) : (
                            <div className="flex items-center justify-between pr-3">
                              <p className={`lg:text-2xl font-bold ${metric.textColor}`}>{value}</p>
                              <div className="hidden lg:block">
                                <Image src={metric.graph} alt={`${metric.title} graph`} width={70} height={30} />
                              </div>
                            </div>
                          )}
                          <p className="text-xs mt-1">
                            <span className={`px-2 py-1 rounded-xl ${isPositive ? 'bg-green-50' : 'bg-red-50'} ${colorClass}`}>
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

            <div>
            <Revenue/>
            <div>
            <BestSelling/>
            </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ReportDashboard;
