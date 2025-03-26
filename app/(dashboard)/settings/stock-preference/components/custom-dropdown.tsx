"use client";

import { useState } from 'react';

export const CustomDropdown = ({
  options,
  defaultValue,
  selectWidth = '352px',
}: {
  options: { value: string; label: string }[];
  defaultValue: string;
  selectWidth: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  return (
    <div
      className='relative w-full sm:w-[352px]'
      style={{ maxWidth: selectWidth }}
    >
      <div
        className='w-full h-[62px] border border-[#e9eaeb] rounded-[12px] p-2 font-circular-light text-[#535862] text-base leading-5 font-[400] bg-white cursor-pointer flex items-center justify-between'
        style={{ maxWidth: selectWidth }}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>icon</title>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </div>
      {isOpen && (
        <div className='absolute right-0 w-[239px] bg-white border border-[#e9eaeb] rounded-[12px] mt-1 z-10 overflow-hidden'>
          {options.map((option) => (
            <div
              key={option.value}
              className={`w-[239px] h-[52px] px-4 py-4 border-b border-[#e9eaeb] last:border-b-0 font-circular-light text-[#535862] text-base leading-5 font-[400] cursor-pointer ${
                selected === option.label
                  ? 'bg-[#E9EEF3]'
                  : 'hover:bg-[#E9EEF3]'
              }`}
              onClick={() => {
                setSelected(option.label);
                setIsOpen(false);
              }}
              onKeyDown={() => {
                setSelected(option.label);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
