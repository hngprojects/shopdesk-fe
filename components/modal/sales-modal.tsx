"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, Plus, Minus, X } from "lucide-react";

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
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<{ id: number; quantity: number }[]>([]);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleItemClick = (itemId: number) => {
    setActiveItem(itemId);
    const existingItem = selectedItems.find((item) => item.id === itemId);
    if (existingItem) {
      setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } else {
      setSelectedItems([...selectedItems, { id: itemId, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

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

          <div className="relative w-full max-w-[563px]">
            <input
              type="text"
              placeholder="Search items by name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-12 rounded-lg pl-10 pr-4 border border-gray-300 focus:ring-2 focus:ring-[#CCEBDB] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          <div className="flex-1 w-full overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-2 gap-5">
              {filteredItems.slice(0, 6).map((item, index) => {
                const isActive = activeItem === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`relative flex flex-col items-center justify-center h-[270px] rounded-md border cursor-pointer font-circular-std font-medium text-lg leading-7 tracking-normal transition-all duration-200 overflow-hidden ${
                      isActive ? "border-2 border-[#D0D0D0]" : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#FFFFFF" : cardColors[item.id],
                      boxShadow: "0px 4px 4px 0px rgba(211, 211, 211, 0.33)",
                    }}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 flex items-center justify-between p-3 border-b ${
                        isActive ? "bg-[#f6f8fa] border-[#D0D0D0]" : "border-white"
                      }`}
                      style={{
                        color: isActive ? "#a0a0a0" : textColors[item.id],
                      }}
                    >
                      <span className="text-sm font-medium">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-medium">{`${item.remaining} left`}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                      <p className="text-3xl font-medium mb-2">{item.name}</p>
                      <p className="text-3xl font-normal">{item.buying_price ? `$${item.buying_price}` : "N/A"}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 space-y-2">
              {filteredItems.slice(6).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center justify-between py-2 rounded-md cursor-pointer ${
                    activeItem === item.id ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded border text-center flex items-center justify-center bg-gray-50">
                      {item.photos ? (
                        <div className="max-w-full max-h-full">
                          <Image
                            src={item.photos}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">No img</span>
                      )}
                    </div>
                    <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[#2A2A2A] text-lg font-medium leading-7 tracking-normal">
                      ${item.buying_price || "N/A"}
                    </span>
                    <span className="text-[#E9EEF3]">|</span>
                    <span className="font-sans text-[#2A2A2A] px-2 text-lg font-medium leading-7 tracking-normal">
                      {item.remaining} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col bg-gray-50 p-6 gap-5 w-1/2 h-full pt-10 pr-6 pb-10 pl-6">
          <div className="flex flex-col h-full bg-white p-6 rounded-lg w-full">
            <div className="flex flex-col w-full h-[62px] gap-1">
              <div className="flex items-center justify-between">
                <h1 className="font-medium text-2xl">CUSTOMER RECEIPT</h1>
                <button
                  onClick={onClose}
                  className="w-[34px] h-[34px] rounded-lg border border-gray-300 flex items-center justify-center p-[9px] hover:bg-gray-100 transition-colors"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Order #{"0"} | 19 Nov 2024
              </p>
            </div>
            <div className="border-t border-dashed border-gray-300 my-4"></div>

            {selectedItems.length > 0 && (
              <div className="w-full">
                <h2 className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                  ITEM
                </h2>
              </div>
            )}

            {selectedItems.length > 0 && (
              <div className="overflow-y-auto w-full flex-grow">
                {selectedItems.map((selectedItem) => {
                  const stockItem = stockItems.find((item) => item.id === selectedItem.id);
                  if (!stockItem) return null;

                  return (
                    <div key={selectedItem.id} className="flex items-center justify-between py-2">
                      <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                        {stockItem.name}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="font-sans text-lg font-medium leading-7 tracking-normal">
                          ${stockItem.buying_price || "N/A"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleQuantityChange(selectedItem.id, selectedItem.quantity - 1)}
                            disabled={selectedItem.quantity === 0}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] font-sans text-lg font-medium leading-7 tracking-normal">
                            {selectedItem.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(selectedItem.id, selectedItem.quantity + 1)}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {selectedItems.length > 0 && <div className="mt-4"></div>}

            {selectedItems.length > 0 && (
              <div className="border-t border-dashed border-gray-300 my-4"></div>
            )}

            {selectedItems.length > 0 && (
              <div className="flex items-center justify-between w-full h-[62px] gap-1">
                <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                  Total
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                    ${calculateTotal().toFixed(2)}
                  </span>
                  <span className="font-sans text-lg font-medium leading-7 tracking-normal">
                    {selectedItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex-grow"></div>

            <div className="text-center mt-8">
              <p className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                THANK YOU FOR YOUR PURCHASE!
              </p>
              <p className="font-sans text-sm text-gray-500">{currentTime}</p>
            </div>
          </div>

          <button
            disabled={selectedItems.length === 0}
            className={`w-full h-[48px] pt-3 pr-6 pb-3 pl-4 gap-1.5 rounded-lg border border-gray-300 flex items-center justify-center font-medium text-white transition-colors ${
              selectedItems.length === 0
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "bg-black hover:bg-[#BDE0CE]"
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

      {/* Mobile View */}
      <div className="md:hidden bg-white rounded-lg shadow-lg overflow-hidden relative w-[375px] h-[90vh] overflow-y-auto">
        <div className="flex flex-col bg-white p-6 gap-6">
          <div className="flex items-center justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <div className="bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center mb-[5px]">
                <Image src="/modal-images/ui-check.svg" alt="Check Logo" width={24} height={24} />
              </div>
              <h1 className="font-medium text-2xl">Make a Sale</h1>
            </div>
            <button
              onClick={onClose}
              className="w-[34px] h-[34px] rounded-lg border border-gray-300 flex items-center justify-center p-[9px] hover:bg-gray-100 transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative w-[280px] h-[48px]">
              <input
                type="text"
                placeholder="Search items by name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full h-full rounded-lg pl-10 pr-4 border border-gray-300 focus:ring-2 focus:ring-[#CCEBDB] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            <button className="w-[48px] h-[48px] rounded-lg border border-gray-300 flex items-center justify-center p-[9px] hover:bg-gray-100 transition-colors">
              <span className="text-gray-500">+</span>
            </button>
          </div>

          <div className="flex-1 w-full overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-2 gap-5">
              {filteredItems.slice(0, 8).map((item, index) => {
                const isActive = activeItem === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`relative flex flex-col items-center justify-center h-[270px] rounded-md border cursor-pointer font-circular-std font-medium text-lg leading-7 tracking-normal transition-all duration-200 overflow-hidden ${
                      isActive ? "border-2 border-[#D0D0D0]" : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#FFFFFF" : cardColors[item.id],
                      boxShadow: "0px 4px 4px 0px rgba(211, 211, 211, 0.33)",
                    }}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 flex items-center justify-between p-3 border-b ${
                        isActive ? "bg-[#f6f8fa] border-[#D0D0D0]" : "border-white"
                      }`}
                      style={{
                        color: isActive ? "#a0a0a0" : textColors[item.id],
                      }}
                    >
                      <span className="text-sm font-medium">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-medium">{`${item.remaining} left`}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                      <p className="text-3xl font-medium mb-2">{item.name}</p>
                      <p className="text-3xl font-normal">{item.buying_price ? `$${item.buying_price}` : "N/A"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col bg-gray-50 p-6 gap-5">
          <div className="flex flex-col h-full bg-white p-6 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)] w-full">
            <div className="flex flex-col w-full h-[62px] gap-1">
              <div className="flex items-center justify-between">
                <h1 className="font-medium text-2xl">CUSTOMER RECEIPT</h1>
                <button
                  onClick={onClose}
                  className="hidden sm:flex w-[34px] h-[34px] rounded-lg border border-gray-300 items-center justify-center p-[9px] hover:bg-gray-100 transition-colors"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Order #{selectedItems.length > 0 ? selectedItems.length : "0"} | 19 Nov 2024
              </p>
            </div>
            <div className="border-t border-dashed border-gray-300 h-[20px]"></div>

            {selectedItems.length > 0 && (
              <div className="w-full">
                <h2 className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                  ITEM
                </h2>
              </div>
            )}

            {selectedItems.length > 0 && (
              <div className="overflow-y-auto w-full flex-grow">
                {selectedItems.map((selectedItem) => {
                  const stockItem = stockItems.find((item) => item.id === selectedItem.id);
                  if (!stockItem) return null;

                  return (
                    <div key={selectedItem.id} className="flex items-center justify-between py-2">
                      <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                        {stockItem.name}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="font-sans text-lg font-medium leading-7 tracking-normal">
                          ${stockItem.buying_price || "N/A"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleQuantityChange(selectedItem.id, selectedItem.quantity - 1)}
                            disabled={selectedItem.quantity === 0}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] font-sans text-lg font-medium leading-7 tracking-normal">
                            {selectedItem.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(selectedItem.id, selectedItem.quantity + 1)}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {selectedItems.length > 0 && <div className="mt-4"></div>}

            {selectedItems.length > 0 && (
              <div className="border-t border-dashed border-gray-300 h-[20px]"></div>
            )}

            {selectedItems.length > 0 && (
              <div className="flex items-center justify-between w-full h-[62px] gap-1">
                <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                  Total
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                    ${calculateTotal().toFixed(2)}
                  </span>
                  <span className="font-sans text-lg font-medium leading-7 tracking-normal">
                    {selectedItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex-grow"></div>

            <div className="text-center mt-8">
              <p className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
                THANK YOU FOR YOUR PURCHASE!
              </p>
              <p className="font-sans text-sm text-gray-500">{currentTime}</p>
            </div>
          </div>

          <button
            disabled={selectedItems.length === 0}
            className={`w-full h-[48px] pt-3 pr-6 pb-3 pl-4 gap-1.5 rounded-lg border border-gray-300 flex items-center justify-center font-medium text-white transition-colors ${
              selectedItems.length === 0
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "bg-black hover:bg-[#BDE0CE]"
            }`}
            onClick={() => {
              onCompleteSale(selectedItems); 
              onClose();
            }}
          >
            <span
              className="hidden md:flex w-[15px] h-[15px] items-center justify-center border-[1.4px] border-white rounded-full"
              style={{ top: "1.5px", left: "1.5px" }}
            >
              X
            </span>
            <span className="ml-1 font-circular font-medium text-[16px] leading-[24px] tracking-[0%]">
              Complete Sale
            </span>
          </button>

          <button
            className="w-full h-[48px] mt-4 rounded-lg border border-[#E50000] flex items-center justify-center font-medium text-[#E50000] hover:bg-gray-100 transition-colors md:hidden"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesModal;