"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaChevronDown,
  FaSearch,
  FaMinus,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const currencies = [
  {
    name: "Nigerian Naira",
    code: "NGN",
    symbol: "₦",
    flag: "/modal-images/nigeria-flag.svg",
  },
  {
    name: "Egyptian Pound",
    code: "EGP",
    symbol: "ج.م",
    flag: "/modal-images/egypt-flag.svg",
  },
  {
    name: "Ethiopian Birr",
    code: "ETB",
    symbol: "Br",
    flag: "/modal-images/ethiopia-flag.svg",
  },
  {
    name: "Ghanaian Cedi",
    code: "GHS",
    symbol: "₵",
    flag: "/modal-images/ghana-flag.svg",
  },
  {
    name: "Indian Rupee",
    code: "INR",
    symbol: "₹",
    flag: "/modal-images/india-flag.svg",
  },
  {
    name: "Kenyan Shilling",
    code: "KES",
    symbol: "KSh",
    flag: "/modal-images/kenya-flag.svg",
  },
];

interface ShopDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShopDeskModal({ isOpen, onClose }: ShopDeskModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCurrencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    "cost" | "selling" | null
  >(null);
  const [quantity, setQuantity] = useState(0);
  const [selectedCostCurrency, setSelectedCostCurrency] = useState(
    currencies[0]
  );
  const [selectedSellingCurrency, setSelectedSellingCurrency] = useState(
    currencies[0]
  );

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCurrencyModal = (dropdown: "cost" | "selling") => {
    setActiveDropdown(dropdown);
    setCurrencyModalOpen(!isCurrencyModalOpen);
  };

  const handleCurrencySelect = (currency: (typeof currencies)[0]) => {
    if (activeDropdown === "cost") {
      setSelectedCostCurrency(currency);
    } else if (activeDropdown === "selling") {
      setSelectedSellingCurrency(currency);
    }
    setCurrencyModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[720px] flex flex-col gap-[28px]">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="flex p-2">
            <div className="bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center">
              <Image
                src="/modal-images/ui-box.svg"
                alt="add stock image"
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="flex-grow h-full p-2">
            <h1 className="font-circular-medium text-[24px] text-left">
              Add New Stock
            </h1>
            <p className="font-circular-normal text-[16px] text-[#717171] text-left">
              Always know the items you have available.
            </p>
          </div>
          <div className="hidden sm:block flex-shrink-0">
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <form className="flex flex-col gap-[20px]">
          <input
            type="text"
            name="item-name"
            className="w-full rounded-[9px] p-[16px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#CCEBDB] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[20px] font-circular-normal"
            placeholder="Item Name"
            required
          />

          <div className="grid sm:grid-cols-2 gap-2">
            <div className="flex border gap-2 rounded-[9px] m-1 relative flex-1">
              <div
                className="p-2 flex gap-[8px] items-center cursor-pointer"
                onClick={() => toggleCurrencyModal("cost")}
              >
                <Image
                  src={selectedCostCurrency.flag}
                  alt={`${selectedCostCurrency.name} Flag`}
                  className=""
                  width={50}
                  height={50}
                />
                <span className="text-[20px] text-center text-[#595959]">
                  {selectedCostCurrency.symbol}
                </span>
                <FaChevronDown className="w-[30px] h-[20px]" />
              </div>
              <div className="h-8 border border-gray self-center"></div>
              <div>
                <input
                  type="text"
                  name="cost-price"
                  className="p-[16px] outline-none placeholder:text-[#B8B8B8] text-[20px] font-circular-normal"
                  placeholder="Cost price / unit"
                  required
                />
              </div>

              {isCurrencyModalOpen && activeDropdown === "cost" && (
                <div className="absolute top-full left-0 mt-2 m-2 max-w-[300px] bg-white rounded-lg backdrop-blur-sm border">
                  <div className="relative w-full p-4">
                    <input
                      type="text"
                      name="item-name"
                      className="w-full rounded-[10px] p-2 pl-[48px] outline-none placeholder:text-[#B8B8B8] text-[16px] border bg-white"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                    <FaSearch className="absolute left-[32px] top-1/2 transform -translate-y-1/2 text-[#B8B8B8] w-[20px] h-[20px]" />
                  </div>

                  <div className="h-[200px] overflow-y-auto px-4">
                    {filteredCurrencies.map((currency) => (
                      <div
                        key={currency.code}
                        className="flex items-center p-2 hover:bg-gray-200 cursor-pointer border-b-1 px-2"
                        onClick={() => handleCurrencySelect(currency)}
                      >
                        <img
                          src={currency.flag}
                          alt={`${currency.name} Flag`}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                        <div>
                          <p className="text-[14px] font-circular-normal">
                            {currency.name} ({currency.code}){" "}
                            <span className="ml-2">{currency.symbol}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex border gap-2 rounded-[9px] m-1 relative flex-1">
              <div
                className="p-2 flex gap-[8px] items-center cursor-pointer"
                onClick={() => toggleCurrencyModal("selling")}
              >
                <Image
                  src={selectedSellingCurrency.flag}
                  alt={`${selectedSellingCurrency.name} Flag`}
                  className=""
                  width={50}
                  height={50}
                />
                <span className="text-[20px] text-center text-[#595959]">
                  {selectedSellingCurrency.symbol}
                </span>
                <FaChevronDown className="w-[30px] h-[20px]" />
              </div>
              <div className="h-8 border border-gray self-center"></div>
              <div>
                <input
                  type="text"
                  name="selling-price"
                  className="p-[16px] outline-none placeholder:text-[#B8B8B8] text-[20px] font-circular-normal"
                  placeholder="Selling price / unit"
                  required
                />
              </div>

              {isCurrencyModalOpen && activeDropdown === "selling" && (
                <div className="absolute top-full right-0 mt-2 w-[298px] bg-white rounded-lg backdrop-blur-sm border">
                  <div className="relative w-full p-4">
                    <input
                      type="text"
                      name="item-name"
                      className="w-full rounded-[10px] p-2 pl-[48px] outline-none placeholder:text-[#B8B8B8] text-[16px] border bg-white"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                    <FaSearch className="absolute left-[32px] top-1/2 transform -translate-y-1/2 text-[#B8B8B8] w-[20px] h-[20px]" />
                  </div>

                  <div className="h-[200px] overflow-y-auto custom-scrollbar px-[20px] hover:bg-gray-200">
                    {filteredCurrencies.map((currency) => (
                      <div
                        key={currency.code}
                        className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                        onClick={() => handleCurrencySelect(currency)}
                      >
                        <img
                          src={currency.flag}
                          alt={`${currency.name} Flag`}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                        <div>
                          <p className="text-[14px] font-circular-normal">
                            {currency.name} ({currency.code}){" "}
                            <span className="ml-2">{currency.symbol}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              aria-label="Decrease Quantity"
              className="p-5 border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
              onClick={decrement}
            >
              <FaMinus className="flex items-center justify-center rounded-lg cursor-pointer" />
            </button>

            <div className="flex-grow text-center content-center border rounded-[10px] p-4">
              <span className="text-[20px] text-[#B8B8B8] font-circular-normal">
                {quantity === 0 ? "Quantity Available" : quantity}
              </span>
            </div>

            <button
              type="button"
              aria-label="Increase Quantity"
              className="p-5 border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
              onClick={increment}
            >
              <FaPlus className="flex items-center h-full w-full justify-center rounded-lg cursor-pointer" />
            </button>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-[#1B1B1B] text-black px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#D0D0D0] border border-#B8B8B8 text-white px-[24px] py-[12px] rounded-[12px]"
            >
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
