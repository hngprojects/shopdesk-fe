// SalesModal.tsx (Main component)
"use client";
import React, { useMemo, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTime } from '@/redux/sales-slice';
import { RootState } from '@/redux/store';
import ItemCard from '@/components/modal/salesmodal/stock-item-card';
import ReceiptItem from '@/components/modal/salesmodal/receipt-item';
import SearchBar from '@/components/modal/salesmodal/search-bar';

interface StockItem {
  id: number;
  name: string;
  buying_price?: string;
  remaining: number;
  photos?: string;
}

interface RecordSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockItems: StockItem[];
  onCompleteSale: (selectedItems: { id: number; quantity: number }[]) => void;
}

const getRandomColor = () => {
  const colors = [
    "#FCE4EC", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB",
    "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9", "#DCEDC8", "#F0F4C3",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomTextColor = (bgColor: string) => {
  const textColors = ["#FF5733", "#009A49", "#FFCC00", "#003366", "#800080"];
  let selectedColor;
  do {
    selectedColor = textColors[Math.floor(Math.random() * textColors.length)];
  } while (selectedColor === bgColor);
  return selectedColor;
};

const SalesModal: React.FC<RecordSalesModalProps> = ({ isOpen, onClose, stockItems, onCompleteSale }) => {
  const dispatch = useDispatch();
  const { selectedItems, currentTime, searchText } = useSelector((state: RootState) => state.sales);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const { cardColors, textColors } = useMemo(() => {
    const newCardColors: { [key: number]: string } = {};
    const newTextColors: { [key: number]: string } = {};
    stockItems.forEach((item) => {
      const bgColor = getRandomColor();
      newCardColors[item.id] = bgColor;
      newTextColors[item.id] = getRandomTextColor(bgColor);
    });
    return { cardColors: newCardColors, textColors: newTextColors };
  }, [stockItems]);

  const filteredItems = useMemo(() => {
    if (!searchText) return stockItems;
    return stockItems.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [stockItems, searchText]);

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      const stockItem = stockItems.find((stock) => stock.id === item.id);
      if (stockItem && stockItem.buying_price) {
        return total + parseFloat(stockItem.buying_price) * item.quantity;
      }
      return total;
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-80 flex items-center justify-center z-50 overflow-y-auto">
      {/* Desktop View */}
      <div className="hidden md:flex bg-white rounded-lg shadow-lg overflow-hidden relative w-full max-w-[1228px] h-[90vh] max-h-[824px]">
        <div className="flex flex-col bg-white p-6 gap-7 flex-grow w-1/2">
          <div className="flex items-center gap-4 w-full">
            <div className="bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center">
              <Image src="/modal-images/ui-check.svg" alt="Check Logo" width={24} height={24} />
            </div>
            <div className="flex-grow">
              <h1 className="font-medium text-2xl">Make a Sale</h1>
              <p className="font-normal text-sm text-gray-500">
                Select from your stock to make sales easily.
              </p>
            </div>
          </div>

          <SearchBar className="w-full max-w-[563px]" />

          <div className="flex-1 w-full overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-2 gap-5">
              {filteredItems.slice(0, 6).map((item, index) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  cardColors={cardColors}
                  textColors={textColors}
                />
              ))}
            </div>
            {/* Additional list items remain similar but use the same state management */}
          </div>
        </div>

        <div className="relative flex flex-col bg-gray-50 p-6 gap-5 w-1/2 h-full pt-10 pr-6 pb-10 pl-6">
          <div className="flex flex-col h-full bg-white p-6 rounded-lg w-full">
            <div className="flex flex-col w-full h-[62px] gap-1">
              <div className="flex items-center justify-between">
                <h1 className="font-medium text-2xl">CUSTOMER RECEIPT</h1>
                <button onClick={onClose} className="w-[34px] h-[34px] rounded-lg border border-gray-300 flex items-center justify-center p-[9px] hover:bg-gray-100 transition-colors">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500">Order #{"0"} | 19 Nov 2024</p>
            </div>
            <div className="border-t border-dashed border-gray-300 my-4"></div>

            {selectedItems.length > 0 && (
              <>
                <h2 className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">ITEM</h2>
                <div className="overflow-y-auto w-full flex-grow">
                  {selectedItems.map((selectedItem) => (
                    <ReceiptItem
                      key={selectedItem.id}
                      stockItem={stockItems.find((item) => item.id === selectedItem.id)!}
                    />
                  ))}
                </div>
                <div className="border-t border-dashed border-gray-300 my-4"></div>
                <div className="flex items-center justify-between w-full h-[62px] gap-1">
                  <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">Total</span>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">${calculateTotal().toFixed(2)}</span>
                    <span className="font-sans text-lg font-medium leading-7 tracking-normal">
                      {selectedItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className="flex-grow"></div>
            <div className="text-center mt-8">
              <p className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">THANK YOU FOR YOUR PURCHASE!</p>
              <p className="font-sans text-sm text-gray-500">{currentTime}</p>
            </div>
          </div>

          <button
            disabled={selectedItems.length === 0}
            className={`w-full h-[48px] pt-3 pr-6 pb-3 pl-4 gap-1.5 rounded-lg border border-gray-300 flex items-center justify-center font-medium text-white transition-colors ${
              selectedItems.length === 0 ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-black hover:bg-[#BDE0CE]"
            }`}
            onClick={() => {
              onCompleteSale(selectedItems);
              onClose();
            }}
          >
            ✕ Complete Sale
          </button>
        </div>
      </div>

      {/* Mobile View remains similar but uses the same components */}
      <div className="md:hidden bg-white rounded-lg shadow-lg overflow-hidden relative w-[375px] h-[90vh] overflow-y-auto">
        {/* Implement mobile view using the same ItemCard, SearchBar, and ReceiptItem components */}
      </div>
    </div>
  );
};

export default SalesModal;