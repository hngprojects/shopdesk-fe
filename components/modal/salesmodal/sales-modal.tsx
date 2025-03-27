'use client';
import type React from 'react';
import { useMemo, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

import {
  updateCurrentTime,
  setActiveItem,
  setSelectedItems,
} from '@/redux/slicer';
import ItemCard from '@/components/modal/salesmodal/stock-item-card';
import ReceiptItem from '@/components/modal/salesmodal/receipt-item';
import SearchBar from '@/components/modal/salesmodal/search-bar';
import type { StockItem } from '@/types/stocks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface RecordSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockItems: StockItem[];
  onCompleteSale: (selectedItems: StockItem[]) => void;
}

const getRandomColor = () => {
  const colors = [
    '#FCE4EC',
    '#F8BBD0',
    '#E1BEE7',
    '#D1C4E9',
    '#C5CAE9',
    '#BBDEFB',
    '#B3E5FC',
    '#B2EBF2',
    '#B2DFDB',
    '#C8E6C9',
    '#DCEDC8',
    '#F0F4C3',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomTextColor = (bgColor: string) => {
  const textColors = ['#FF5733', '#009A49', '#FFCC00', '#003366', '#800080'];
  let selectedColor: string;
  do {
    selectedColor = textColors[Math.floor(Math.random() * textColors.length)];
  } while (selectedColor === bgColor);
  return selectedColor;
};

const SalesModal: React.FC<RecordSalesModalProps> = ({
  isOpen,
  onClose,
  stockItems,
  onCompleteSale,
}) => {
  const dispatch = useAppDispatch();
  const { selectedItems, currentTime, searchText } = useAppSelector(
    (state) => state.sales
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const { cardColors, textColors } = useMemo(() => {
    const newCardColors: { [key: number]: string } = {};
    const newTextColors: { [key: number]: string } = {};
    for (const item of stockItems) {
      const bgColor = getRandomColor();
      (newCardColors as Record<number, string>)[Number(item.id)] = bgColor;
      (newTextColors as Record<number, string>)[Number(item.id)] =
        getRandomTextColor(bgColor);
    }
    return { cardColors: newCardColors, textColors: newTextColors };
  }, [stockItems]);

  const filteredItems = useMemo(() => {
    if (!searchText) {
      return stockItems;
    }
    return stockItems.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [stockItems, searchText]);

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      const stockItem = stockItems.find((stock) => stock.id === item.id);
      if (stockItem?.sell_price) {
        // Remove any non-numeric characters except decimal point
        const cleanedPrice = stockItem.sell_price.replace(/[^0-9.]/g, '');
        const price = Number.parseFloat(cleanedPrice);
        if (!Number.isNaN(price)) {
          return total + price * item.quantity;
        }
      }
      return total;
    }, 0);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cardLimit = isMobile ? 8 : 6;

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-[#24242433] bg-opacity-80 flex items-center justify-center z-50 overflow-y-auto'>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-[1228px] h-[90vh] max-h-[824px] flex flex-col md:flex-row overflow-y-auto'>
        <div className='flex flex-col bg-white p-6 gap-7 flex-grow w-full md:w-1/2'>
          <div className='flex items-center gap-4 w-full'>
            <div className='bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center'>
              <Image
                src='/modal-images/ui-check.svg'
                alt='Check Logo'
                width={24}
                height={24}
              />
            </div>
            <div className='flex-grow'>
              <h1 className='font-medium text-2xl'>Make a Sale</h1>
              <p className='font-normal text-sm text-gray-500'>
                Select from your stock to make sales easily.
              </p>
            </div>
            <button
              type='button'
              onClick={onClose}
              className='w-[34px] h-[34px] rounded-lg border border-gray-300 flex items-center justify-center p-[9px] hover:bg-gray-100 transition-colors md:hidden'
            >
              <X size={16} className='text-gray-500' />
            </button>
          </div>

          <SearchBar className='w-full max-w-[563px]' />

          <div className='flex-1 w-full overflow-y-auto pr-2 custom-scrollbar'>
            <div className='grid grid-cols-2 gap-5 md:grid-cols-2'>
              {filteredItems.slice(0, cardLimit).map((item, index) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  cardColors={cardColors}
                  textColors={textColors}
                />
              ))}
            </div>

            <div className='mt-4 space-y-2'>
              {filteredItems.slice(cardLimit).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    dispatch(setActiveItem(Number(item.id)));
                    const existingItem = selectedItems.find(
                      (i) => i.id === item.id
                    );
                    if (existingItem) {
                      dispatch(
                        setSelectedItems(
                          selectedItems.filter((i) => i.id !== item.id)
                        )
                      );
                    } else {
                      dispatch(
                        setSelectedItems([
                          ...selectedItems,
                          { ...item, quantity: 1 },
                        ])
                      );
                    }
                  }}
                  onKeyDown={() => {
                    dispatch(setActiveItem(Number(item.id)));
                    const existingItem = selectedItems.find(
                      (i) => i.id === item.id
                    );
                    if (existingItem) {
                      dispatch(
                        setSelectedItems(
                          selectedItems.filter((i) => i.id !== item.id)
                        )
                      );
                    } else {
                      dispatch(
                        setSelectedItems([
                          ...selectedItems,
                          { ...item, quantity: 1 },
                        ])
                      );
                    }
                  }}
                  className={`flex items-center justify-between py-2 rounded-md cursor-pointer ${
                    selectedItems.some((i) => i.id === item.id)
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded border text-center flex items-center justify-center bg-gray-50'>
                      {item.photos ? (
                        <div className='relative w-full h-full'>
                          <Image
                            src={item.photos}
                            alt={item.name}
                            fill
                            className='object-cover rounded'
                          />
                        </div>
                      ) : (
                        <span className='text-gray-300 text-xs'>No img</span>
                      )}
                    </div>
                    <span className='font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal'>
                      {item.name}
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='font-sans text-[#2A2A2A] text-lg font-medium leading-7 tracking-normal'>
                      {item.sell_price || 'N/A'}
                    </span>
                    <span className='text-[#E9EEF3]'>|</span>
                    <span className='font-sans text-[#2A2A2A] px-2 text-lg font-medium leading-7 tracking-normal'>
                      {item.remaining} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='relative flex flex-col bg-gray-50 p-6 gap-5 w-full md:w-1/2 h-full pt-10 pr-6 pb-10 pl-6'>
          <div className='flex flex-col h-full bg-white p-6 rounded-lg w-full'>
            <div className='flex flex-col w-full h-[62px] gap-1'>
              <div className='flex items-center justify-between'>
                <h1 className='font-medium text-2xl'>CUSTOMER RECEIPT</h1>
                <button
                  type='button'
                  onClick={onClose}
                  className='w-[34px] h-[34px] rounded-lg border border-gray-300 flex items-center justify-center p-[9px] hover:bg-gray-100 transition-colors hidden md:flex'
                >
                  <X size={16} className='text-gray-500' />
                </button>
              </div>
              <p className='text-sm text-gray-500'>
                Order #{'0'} | 19 Nov 2024
              </p>
            </div>
            <div className='border-t border-dashed border-gray-300 my-4' />

            {selectedItems.length > 0 && (
              <>
                <h2 className='font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal'>
                  ITEM
                </h2>
                <div className='overflow-x-auto w-full h-[200px]'>
                  {selectedItems.map((selectedItem) => (
                    <ReceiptItem
                      key={selectedItem.id}
                      stockItem={
                        // biome-ignore lint/style/noNonNullAssertion: <explanation>
                        stockItems.find(
                          (item) => item.id === selectedItem.id.toString()
                        )!
                      }
                    />
                  ))}
                </div>
                <div className='border-t border-dashed border-gray-300 my-4' />
                <div className='flex items-center justify-between w-full h-[62px] gap-1'>
                  <span className='font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal'>
                    Total
                  </span>
                  <div className='flex items-center px-10 gap-6'>
                    <span className='font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal'>
                      ₦
                      {calculateTotal() > 0
                        ? calculateTotal().toFixed(2)
                        : '0.00'}{' '}
                    </span>
                    <span className='font-sans text-lg font-medium leading-7 px-6 tracking-normal'>
                      {selectedItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className='flex-grow' />
            <div className='text-center mt-8'>
              <p className='font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal'>
                THANK YOU FOR YOUR PURCHASE!
              </p>
              <p className='font-sans text-sm text-gray-500'>{currentTime}</p>
            </div>
          </div>

          <button
            type='button'
            disabled={selectedItems.length === 0}
            className={`w-full h-[48px] pt-3 pr-6 pb-3 pl-4 gap-1.5 rounded-lg border border-gray-300 flex items-center justify-center font-medium text-white transition-colors ${
              selectedItems.length === 0
                ? 'bg-gray-300 cursor-not-allowed opacity-50'
                : 'bg-black hover:bg-[#BDE0CE]'
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
    </div>
  );
};

export default SalesModal;
