"use client";
import { useState, useRef, useEffect } from 'react'
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

interface EditItemModal {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditItemModal({ isOpen, onClose }: EditItemModal) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCurrencyModalOpen, setCurrencyModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null)
  const sellingPriceDivRef = useRef<HTMLDivElement>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [productName, setProductName] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [quantity, setQuantity] = useState(0);
  const [selectedSellingCurrency, setSelectedSellingCurrency] = useState(
    currencies[0]
  );
//this is a validation for testing display of errors
const validateForm = () => {
  const newErrors: { [key: string]: string } = {}
  if (!productName) newErrors.productName = 'Product Name is required.' 
  if (!sellingPrice) newErrors.sellingPrice = 'Selling Price is required.'
  if (quantity === 0) newErrors.quantity = 'Quantity must be greater than 0.'
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFormValid = () => {
    return productName && sellingPrice && quantity > 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      //submit logic
    }
  }
  const toggleCurrencyModal = () => {
    setCurrencyModalOpen((prev) => !prev)
  }

  const handleCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedSellingCurrency(currency)
    setCurrencyModalOpen(false)
  }
//close modal when outside of div is clicked
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      sellingPriceDivRef.current &&
      !sellingPriceDivRef.current.contains(event.target as Node)
    ) {
      setCurrencyModalOpen(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [])
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4">
      <div className="bg-white  rounded-lg shadow-lg w-full max-w-[720px] flex flex-col gap-[28px]">
        <div className="p-6 gap-5 flex flex-col">
          <div className="flex gap-2.5">
            <div className="flex p-2 ">
              <div className="bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center">
              <picture>
                  <source
                    srcSet="/modal-images/icon.svg"
                    media="(max-width: 639px)"
                  />

                  <source
                    srcSet="/modal-images/ui-box.svg"
                    media="(min-width: 640px)"
                  />

                  <Image
                    src="/modal-images/ui-box-large.svg"
                    alt="add stock image"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    width={24}
                    height={24}
                  />
                </picture>
              </div>
            </div>
            <div className="flex-grow h-full p-2">
              <h1 className="font-circular-medium text-[24px] text-left">
                Edit Stock
              </h1>
            
            </div>
            <div className=" flex-shrink-0">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="item-name"
                className="block text-left font-medium text-[#717171] text-[14px]"
              >
                Product Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="item-name"
                className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal bg-white"
                placeholder="Item Name"
                onChange={(e) => setProductName(e.target.value)}
                required
                value={'soface recliners'}
              />
            </div>
            <div className="flex flex-col gap-[8px] flex-1">
                <label className="font-circular-normal text-[14px] text-[#717171] text-left">
                  Selling Price <span className="text-[#FF1925]">*</span>
                </label>
                <div
                  ref={sellingPriceDivRef}
                  className="flex border gap-[8px] rounded-[9px] m-1 relative h-[48px] md:h-[62px]"
                >
                  <div
                    className="p-2 flex gap-[8px] items-center cursor-pointer"
                    onClick={toggleCurrencyModal}
                  >
                    <Image
                      src={selectedSellingCurrency.flag}
                      alt={`${selectedSellingCurrency.name} Flag`}
                      className="w-5 h-5 md:w-6 md:h-6"
                      width={20}
                      height={20}
                    />
                    <span className="text-[20px] text-center text-[#595959]">
                      {selectedSellingCurrency.symbol}
                    </span>
                    <FaChevronDown className="w-[10px] h-[10px] text-[#888888]" />
                  </div>
                  <div className="h-8 border border-gray self-center"></div>
                  <div>
                    <input
                      type="text"
                      name="selling-price"
                      className="w-full h-full p-[12px] outline-none  placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal"
                      placeholder="Amount"
                      value={'$ 50'}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      required
                    />
                  </div>

                  {isCurrencyModalOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-[calc(100%-10px)] right-3 w-[298px] bg-white rounded-lg backdrop-blur-sm border shadow-lg z-10"
                    >
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

                      <div className="h-[200px] overflow-y-auto custom-scrollbar px-[20px] py-3 ">
                        {filteredCurrencies.map((currency) => (
                          <div
                            key={currency.code}
                            className="flex items-center p-2 hover:bg-gray-100 w-full cursor-pointer"
                            onClick={() => handleCurrencySelect(currency)}
                          >
                            <img
                              src={currency.flag}
                              alt={`${currency.name} Flag`}
                              className="w-8 h-8 rounded-full object-cover mr-3"
                            />
                            <div>
                              <p className="text-[14px] font-circular-normal">
                                {currency.name} ({currency.code}){' '}
                                <span className="ml-2">{currency.symbol}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* {errors.sellingPrice && (
                  <p className="text-[#FF1925] text-sm font-circular-normal">
                    {errors.sellingPrice}
                  </p>)} */}
                
              </div>
              <div className="flex flex-col gap-[8px]">
              <label className="font-circular-normal text-[14px] text-[#1B1B1B] text-left">
                Quantity <span className="text-[#FF1925]">*</span>
              </label>
              <div className="flex items-center gap-[8px]">
                <button
                  className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] flex items-center justify-center border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
                  onClick={decrement}
                >
                  <FaMinus className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <div className="flex-grow relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal text-center"
                    placeholder="Quantity"
                    value={40}
                    onChange={(e) => {
                      const value = e.target.value

                      if (/^\d*$/.test(value)) {
                        setQuantity(value === '' ? 0 : parseInt(value, 10))
                        setErrors((prev) => ({ ...prev, quantity: '' }))
                      } else {
                        setErrors((prev) => ({
                          ...prev,
                          quantity: 'Please enter a valid number.',
                        }))
                      }
                    }}
                    required
                  />
                </div>

                <button
                  className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] flex items-center justify-center border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
                  onClick={increment}
                >
                  <FaPlus className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
              {errors.quantity && (
                <p className="text-[#FF1925] text-[14px] font-circular-normal text-left mt-1">
                  {errors.quantity}
                </p>
              )}
            </div>
              
          </form>
        </div>
        <div className="md:bg-[#F6F8FA] md:border md:border-[#DEE5ED] rounded-bl-[12px] rounded-br-[12px] w-full p-4">
          <div className="flex flex-col-reverse md:flex-row justify-end gap-4 w-full">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto bg-white border md:border-[#1B1B1B] border-[#E50000] md:text-black text-[#FF000D] px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]"
            >
              Cancel
            </button>
            <button
              //submit button (should be inside form ,will change after design changes)
              type="submit"
              className={`w-full md:w-auto px-[24px] py-[12px] rounded-[12px] border ${
                isFormValid()
                  ? 'bg-black text-white border-black'
                  : 'bg-[#D0D0D0] text-[#F1F1F1] border-[#B8B8B8]'
              }`}
              disabled={!isFormValid()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
