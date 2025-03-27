"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import AddItemModal from "@/components/modal/add-item";
import { useStore } from "@/store/useStore";

const DashboardActions = () => {
  const {
    stockItems,
    isPremium,
    setStockItems,
    setIsSearching,
    setSearchText,
  } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  console.log("stockItems", stockItems);

  if (!stockItems || stockItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-2 max-[800px]:mb-4 max-[640px]:self-end flex items-center justify-center max-[1000px]:flex-row-reverse max-[800px]:w-full">
      <div className="relative group inline-block">
        {/* Tooltip */}
        {!isPremium && stockItems.length >= 10 && (
          <div className="z-50 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md px-3 py-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            Upgrade to Premium to add more.
            <a href="/pricing" className="text-blue-400 underline ml-1 ">
              Upgrade now
            </a>
          </div>
        )}

        {/* Button */}
        <button
          onClick={openModal}
          className="btn-primary max-[400px]:text-sm text-nowrap max-[1000px]:hidden mr-2 disabled:opacity-50"
          disabled={!isPremium && stockItems.length >= 10}
        >
          + Add New
        </button>
      </div>
      <button
        onClick={openModal}
        className="btn-primary max-[400px]:text-sm text-nowrap min-[1000px]:hidden ml-2"
      >
        +
      </button>

      <div className="relative max-[800px]:w-full">
        <input
          type="text"
          className="h-12 border w-[327px] max-[800px]:w-full rounded-md focus:outline-2 focus:outline-[#009A49] px-10"
          onChange={(event) => {
            setIsSearching(true);
            setSearchText(event.target.value);
            if (!event.target.value) {
              setIsSearching(false);
            }
          }}
        />

        <Search className="text-[#667085] absolute top-3 left-3 " />
      </div>

      <div className="z-10">
        <AddItemModal
          isOpen={isOpen}
          onClose={closeModal}
          onSave={(newItem) => {
            setStockItems((prev: any) => [newItem, ...prev]); // Inserts new items at the top
            closeModal();
          }}
        />
      </div>
    </div>
  );
};

export default DashboardActions;
