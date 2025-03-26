"use client";
import React, { useState, useEffect } from "react";
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react";
import useWindowWidth from '@/services/useWindowWidth'
import Drawer from '@/components/ui/drawer';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDataType, setSelectedDataType] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("");
  const width = useWindowWidth()
  const [animationClass, setAnimationClass] = useState("");
  
  useEffect(() => {
    if (isOpen) {
      setAnimationClass("slide-up"); 
    }
  }, [isOpen]);
  
const handleClose = () => {
  setAnimationClass("slide-down"); 

  setTimeout(() => {
    onClose(); 
  }, 500); 
};


  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) newErrors.email = 'Email is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => email.trim() !== "" && selectedFormat !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (validateForm()) {
      try {
        const payload = {
          email,
          dataType: selectedDataType,
          dateRange: selectedDateRange,
          format: selectedFormat,
        };
  
        const response = await fetch('/api/reports/export', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to export report');
        }
  
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `report.${selectedFormat.toLowerCase()}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
  
        onClose();
      } catch (error) {
        console.error('Failed to download', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  

  if (!isOpen) return null; 
  if (width > 640)
  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[611px] flex flex-col gap-[28px] pt-[24px]" onClick={(e) => e.stopPropagation()}>
        <div className="gap-[28px] flex flex-col">
          <div className="flex gap-[16px] items-start justify-center">
              <div className="bg-[#CCEBDB] size-[56px] p-[8px] rounded-lg flex items-center justify-center">
                <Image
                  src="/modal-images/export.svg"
                  alt="Edit Name"
                  className="size-full"
                  width={32}
                  height={32}
                />
              </div>
            <div className="flex flex-col h-full">
              <h1 className="font-circular-medium text-[20px] sm:text-[24px] text-left">Export</h1>
              <p className="text-[18px] font-light text-[#717171]">Fill in your email details to download your expenses.</p>
            </div>
            <div className="flex">
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
              >
                <FaTimes className="w-[8px] h-[8px]" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[20px] px-[24px]">
              <input
                type="email"
                name="email"
                className="w-full h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal bg-white"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <p className="text-[#FF1925] text-sm font-circular-normal">
                  {errors.email}
                </p>
              )}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="border-gray-300 flex h-[62px] w-full items-center justify-between rounded-[9px] border bg-white p-[12px] text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[16px] font-circular-normal ${selectedDataType ? 'text-black' : 'text-[#B8B8B8]'}`}>
                        {selectedDataType || "Data Selection Type"}
                      </span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 w-[562px] overflow-y-auto">
                  <DropdownMenuItem onClick={() => setSelectedDataType("Sales Transaction")}>
                    Sales Transaction
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDataType("Top Selling Product")}>
                    Top Selling Product
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDataType("Profit and Loss Summary")}>
                    Profit and Loss Summary
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="border-gray-300 h-[62px] flex w-full items-center justify-between rounded-[9px] border bg-white p-[12px] text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[16px] font-circular-normal ${selectedDateRange ? 'text-black' : 'text-[#B8B8B8]'}`}>
                        {selectedDateRange  || "Date Range"}
                      </span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 w-[562px] overflow-y-auto">
                  <DropdownMenuItem onClick={() => setSelectedDateRange("Today")}>
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDateRange("This month")}>
                    This month
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDateRange("Last 7 days")}>
                    Last 7 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDateRange("Custom range")}>
                    Custom range
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="border-gray-300 h-[62px] flex w-full items-center justify-between rounded-[9px] border bg-white p-[12px] text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[16px] font-circular-normal ${selectedFormat ? 'text-black' : 'text-[#B8B8B8]'}`}>
                        {selectedFormat  || "Format"}
                      </span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 w-[562px] overflow-y-auto">
                  <DropdownMenuItem onClick={() => setSelectedFormat("CSV")}>
                    CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFormat("Excel")}>
                    Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFormat("PDF")}>
                    PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="md:bg-[#F6F8FA] md:border md:border-[#DEE5ED] rounded-bl-[12px] rounded-br-[12px] w-full p-[24px]">
              <div className="flex flex-col-reverse md:flex-row justify-end gap-4 w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full h-[48px] text-[16px] md:w-auto bg-white border md:border-[#1B1B1B] border-[#E50000] md:text-black text-[#FF000D] px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`w-full md:w-auto px-[24px] h-[48px] text-[16px] py-[12px] rounded-[12px] border ${
                    isFormValid() ? 'bg-black text-white border-black' : 'bg-[#D0D0D0] text-[#F1F1F1] border-[#B8B8B8]'
                  }`}
                  disabled={!isFormValid()}
                >
                  {isLoading ? 'Downloading...' : 'Download'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <Drawer isOpen={isOpen} onClose={handleClose}>
      <div className={`bg-white rounded-lg  w-full max-w-[611px] flex flex-col gap-[28px] pt-[24px] transition-all duration-500 ${animationClass}`} onClick={(e) => e.stopPropagation()}>
        <div className="gap-[28px] flex flex-col">
          <div className="flex gap-[16px] items-start justify-between border-b-2 pb-[13px]">
            <div className="flex flex-col h-full">
              <h1 className="font-circular-medium text-[20px] sm:text-[24px] text-left">Export data</h1>
            </div>
            <div className="flex">
              <button
                type="button"
                aria-label="Close"
                onClick={handleClose}
                className="p-[9px] border bg-[#E9EEF3] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
              >
                <FaTimes className="w-[13.18px] h-[13.18px]" />
              </button>
            </div>
          </div>
          <div className="pb-[55px] flex">

              <p className="text-[18px] text-center font-light text-[#717171]">Fill in your email details to download your expenses.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[20px] px-[13px] pb-[81.91px] ">
              <input
                type="email"
                name="email"
                className="w-full h-[42.49px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal bg-white"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <p className="text-[#FF1925] text-sm font-circular-normal">
                  {errors.email}
                </p>
              )}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="border-gray-300 flex h-[42.49px] w-full items-center justify-between rounded-[9px] border bg-white p-[12px] text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[16px] font-circular-normal ${selectedDataType ? 'text-black' : 'text-[#B8B8B8]'}`}>
                        {selectedDataType || "Data Selection Type"}
                      </span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 w-[562px] overflow-y-auto">
                  <DropdownMenuItem onClick={() => setSelectedDataType("Sales Transaction")}>
                    Sales Transaction
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDataType("Top Selling Product")}>
                    Top Selling Product
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDataType("Profit and Loss Summary")}>
                    Profit and Loss Summary
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="border-gray-300 h-[42.49px] flex w-full items-center justify-between rounded-[9px] border bg-white p-[12px] text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[16px] font-circular-normal ${selectedDateRange ? 'text-black' : 'text-[#B8B8B8]'}`}>
                        {selectedDateRange  || "Date Range"}
                      </span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 w-[562px] overflow-y-auto">
                  <DropdownMenuItem onClick={() => setSelectedDateRange("Today")}>
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDateRange("This month")}>
                    This month
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDateRange("Last 7 days")}>
                    Last 7 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDateRange("Custom range")}>
                    Custom range
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="border-gray-300 h-[42.49px] flex w-full items-center justify-between rounded-[9px] border bg-white p-[12px] text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[16px] font-circular-normal ${selectedFormat ? 'text-black' : 'text-[#B8B8B8]'}`}>
                        {selectedFormat  || "Format"}
                      </span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 w-[562px] overflow-y-auto">
                  <DropdownMenuItem onClick={() => setSelectedFormat("CSV")}>
                    CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFormat("Excel")}>
                    Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFormat("PDF")}>
                    PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="md:bg-[#F6F8FA] md:border md:border-[#DEE5ED] rounded-bl-[12px] rounded-br-[12px] w-full p-[24px]">
              <div className="flex flex-col-reverse md:flex-row justify-end gap-4 w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full h-[48px] text-[16px] md:w-auto bg-white border md:border-[#1B1B1B] border-black md:text-black text-black px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`w-full md:w-auto px-[24px] h-[48px] text-[16px] py-[12px] rounded-[12px] border ${
                    isFormValid() ? 'bg-black text-white border-black' : 'bg-[#D0D0D0] text-[#F1F1F1] border-[#B8B8B8]'
                  }`}
                  disabled={!isFormValid()}
                >
                  {isLoading ? 'Downloading...' : 'Download'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Drawer>
  );
};


export default ExportModal;