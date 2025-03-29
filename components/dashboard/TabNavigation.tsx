"use client";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ExportModal from "@/components/modal/export-data";
import { Search, Upload } from 'lucide-react';
import React, { useState } from "react";

const TabNavigation = () => {
  const pathname = usePathname();
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
  
    const openExportModal = () => setIsExportModalOpen(true);
    const closeExportModal = () => setIsExportModalOpen(false);

  const tabs = [
    {
      name: "Stock",
      path: "/stock",
      icon: (
        <Icons.Stock
          className="w-5 h-5"
          strokeColor={pathname === "/stock" ? "#009A49" : "#83838B"}
        />
      ),
    },
    {
      name: "Sales",
      path: "/sales",
      icon: (
        <Icons.Sales
          className="w-5 h-5"
          strokeColor={pathname === "/sales" ? "#009A49" : "#83838B"}
        />
      ),
    },
    {
      name: "Reports",
      path: "/reports",
      icon: (
        <Icons.Reports
          className="w-5 h-5"
          strokeColor={pathname === "/reports" ? "#009A49" : "#83838B"}
        />
      ),
    },
  ];

  return (
    <div className="w-full flex-col-reverse relative flex border mt-24 lg:mt-[40px] border-b-0 lg:max-w-fit rounded-t-lg bg-[#F6F8FA] p-1 pb-0">
      <div className="flex w-full">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.name}
            href={tab.path}
            className="relative last:before:absolute w-full last:before:-bottom-1 last:before:content-[''] last:before:w-3"
          >
            <div
              className={`flex items-center justify-center relative gap-2 p-2.5 lg:py-2 w-44 max-[800px]:w-full font-semibold lg:px-9 ${
                isActive
                  ? 'bg-white rounded-t-lg after:absolute after:content-[""] after:w-[80%] after:left-[10%] after:h-5 after:-bottom-2'
                  : ''
              }`}
            >
              <span className={isActive ? "text-[#2A2A2A]" : "text-[#83838b]"}>
                {tab.name}
              </span>
              {tab.icon}
            </div>
          </Link>
        );
      })}
        </div>
      {pathname === "/reports" && (
        <div>
          <div className="w-full">
            <div className="lg:px-2 gap-4 lg:gap-[19px] w-full absolute bottom-15 lg:bottom-3  lg:-right-160 xl:-right-175 rounded-bl-2xl lg:">
              <div className="flex items-center gap-2 bg-white">
              <div className="flex h-[48px] w-full items-center gap-2 rounded-xl border border-neutral-75 bg-white px-2 py-[0.875rem] ">
                <Search className="size-4 flex-shrink-0 text-neutral-400"/>
                <input
                  type="text"
                  placeholder="Search by item name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full flex-1 text-sm focus:border-none focus:outline-none"
                />
              </div>
              <button className="bg-white text-[16px] hidden gap-[6px] lg:flex h-[48px] w-[113px] items-center justify-center text-black pl-[16px] pr-[24px] py-[12px] rounded-[12px] border border-[#1B1B1B ]" onClick={openExportModal}>
                <Upload className="size-[18px]"/>
                Export
              </button>
              <button className="bg-white text-[16px] lg:hidden gap-[6px] flex h-[48px] items-center justify-center text-black p-3.5 rounded-xl border border-gray-500" onClick={openExportModal}>
                <Upload className="size-[18px]"/>
              </button>
              </div>
            </div>
          </div>
          <ExportModal isOpen={isExportModalOpen} onClose={closeExportModal} />
        </div>
      )}
    </div>
  );
};

export default TabNavigation;
