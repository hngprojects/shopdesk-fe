'use client';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaSearch, FaTimes } from 'react-icons/fa';
import { currencies } from '../add-item';
import type { Currency, StockItem } from '@/types/stocks';
//import { editPrice } from '@/services/stock'

interface EditPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: StockItem | null;
  onSave: (updatedPrice: number) => void;
  openSuccessModal: () => void;
}

export default function EditPriceModal({
  isOpen,
  onClose,
  item,
}: EditPriceModalProps) {
  if (!(isOpen && item)) {
    return null; // Don't render if modal is closed or item is null
  }

  const [price, setPrice] = useState(item.buying_price);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCurrencyModalOpen, setCurrencyModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sellingPriceDivRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedSellingCurrency, setSelectedSellingCurrency] = useState(
    currencies.find((currency) => currency.code === item.currency_code) ||
      currencies[0]
  );

  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFormValid = () => {
    return price > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
  };

  // Close modal when outside of div is clicked
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        sellingPriceDivRef.current &&
        !sellingPriceDivRef.current.contains(event.target as Node)
      ) {
        setCurrencyModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCurrencyModal = () => {
    setCurrencyModalOpen((prev) => !prev);
  };

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedSellingCurrency(currency);
    setCurrencyModalOpen(false);
  };

  return (
    <div className='fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-lg  border border-[#A0A0A0] w-full max-w-[564px] flex flex-col gap-[28px]'>
        <div className='p-6 gap-5 flex flex-col'>
          <div className='flex gap-2.5'>
            <div className='flex p-2 '>
              <div className='bg-[#CCEBDB] max-w-[48px] max-h-[48px] p-[8px] rounded-[8px] flex items-center justify-center'>
                <Image
                  src='/modal-images/bank.svg'
                  alt='Edit Price'
                  className='w-5 h-5 sm:w-6 sm:h-6'
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className='flex-grow h-full p-2'>
              <h1 className='font-circular-medium text-[24px] text-left'>
                Edit Your Stock Price
              </h1>
            </div>
            <div className='flex-shrink-0'>
              <button
                type='button'
                aria-label='Close'
                onClick={onClose}
                className='p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]'
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[20px]'>
            <div
              ref={sellingPriceDivRef}
              className='flex border gap-[8px] rounded-[9px] m-1 relative h-[48px] md:h-[62px]'
            >
              <div
                className='p-2 flex gap-[8px] items-center cursor-pointer'
                onClick={toggleCurrencyModal}
                onKeyDown={toggleCurrencyModal}
              >
                <Image
                  src={selectedSellingCurrency.flag}
                  alt={`${selectedSellingCurrency.name} Flag`}
                  className='w-5 h-5 md:w-6 md:h-6'
                  width={20}
                  height={20}
                />
                <span className='text-[20px] text-center text-[#595959]'>
                  {selectedSellingCurrency.symbol}
                </span>
                <FaChevronDown className='w-[24px] h-[24px] text-black' />
              </div>
              <div className='h-8 border border-gray self-center' />
              <div className='w-full'>
                <input
                  type='number'
                  name='price'
                  className='w-full h-full p-3 outline-none placeholder:text-[#B8B8B8] text-[#2A2A2A] text-base font-circular-normal'
                  placeholder='Amount'
                  value={price === 0 ? '' : price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setPrice(value === '' ? 0 : Number.parseFloat(value));
                      setErrors((prev) => ({ ...prev, price: '' }));
                    } else {
                      setErrors((prev) => ({
                        ...prev,
                        price: 'Please enter a valid number.',
                      }));
                    }
                  }}
                  required
                />
              </div>

              {isCurrencyModalOpen && (
                <div
                  ref={dropdownRef}
                  className='absolute top-full left-0 w-[298px] bg-white rounded-lg backdrop-blur-sm border shadow-lg z-10'
                >
                  <div className='relative w-full p-4'>
                    <input
                      type='text'
                      name='item-name'
                      className='w-full rounded-[10px] p-2 pl-[48px] outline-none placeholder:text-[#B8B8B8] text-[16px] border bg-white'
                      placeholder='Search'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                    <FaSearch className='absolute left-[32px] top-1/2 transform -translate-y-1/2 text-[#B8B8B8] w-[20px] h-[20px]' />
                  </div>

                  <div className='h-[200px] overflow-y-auto custom-scrollbar px-[20px] py-3 '>
                    {filteredCurrencies.map((currency) => (
                      <div
                        key={currency.code}
                        className='flex items-center p-2 hover:bg-gray-100 w-full cursor-pointer'
                        onClick={() => handleCurrencySelect(currency)}
                        onKeyDown={() => handleCurrencySelect(currency)}
                      >
                        <img
                          src={currency.flag}
                          alt={`${currency.name} Flag`}
                          className='w-8 h-8 rounded-full object-cover mr-3'
                        />
                        <div>
                          <p className='text-[14px] font-circular-normal'>
                            {currency.name} ({currency.code}){' '}
                            <span className='ml-2'>{currency.symbol}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {errors.price && (
              <p className='text-[#FF1925] text-sm font-circular-normal'>
                {errors.price}
              </p>
            )}

            <div className='md:bg-[#F6F8FA] md:border md:border-[#DEE5ED] rounded-bl-[12px] rounded-br-[12px] w-full p-4'>
              <div className='flex flex-col-reverse md:flex-row justify-end gap-4 w-full'>
                <button
                  type='button'
                  onClick={onClose}
                  className='w-full md:w-auto bg-white border md:border-[#1B1B1B] border-[#E50000] md:text-black text-[#FF000D] px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]'
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  className={`w-full md:w-auto px-[24px] py-[12px] rounded-[12px] border ${
                    isFormValid()
                      ? 'bg-black text-white border-black'
                      : 'bg-[#D0D0D0] text-[#F1F1F1] border-[#B8B8B8]'
                  }`}
                  disabled={!isFormValid()}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
