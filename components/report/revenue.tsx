"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import RevenueGraph from "./RevenueGraph";

const RevenueReport = () => {
  const [selectedItemType, setSelectedItemType] = useState<string>("");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded flex items-center justify-center">
            <RevenueGraph/>
          </div>

        <div className="bg-white p-6 rounded shadow">
            <div className="flex lg:flex-row flex-col items-center justify-between">
                <div className="flex justify-center gap-3">
                    <div className="flex size-[32px] border rounded-[8px] items-center justify-center">
                            <Image
                                src="/icons/TotalItems.svg"
                                alt="Sales Table Icon"
                                className=""
                                width={17}
                                height={15}
                              />
                    </div>
                        <h2 className="text-[16px] mb-4 mt-1">Total Items Sold</h2>
                </div>

                <div>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="border-gray-300 flex h-[32px] items-center justify-between rounded-[9px] border bg-white p-2 lg:p-3 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[16px] font-circular-normal ${selectedItemType ? 'text-black' : 'text-[#B8B8B8]'}`}>
                        {selectedItemType || "Monthly"}
                      </span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 min-w-0 overflow-y-auto lg:w-full">
                  <DropdownMenuItem onClick={() => setSelectedItemType("Weekly")}>
                    Weekly
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedItemType("Monthly")}>
                    Monthly
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedItemType("Yearly")}>
                    Yearly
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
                </div>

            </div>
          <div className="h-48 rounded flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Image
                    src="/icons/emptyState.svg"
                    alt="Sales Table Icon"
                    className=""
                    width={56}
                    height={56}
                 />
            <p className="text-[20px] text-gray-500">No items sold yet</p>
            </div>
          </div>
        </div> 
      </div>

    </div>
  );
};

export default RevenueReport;
