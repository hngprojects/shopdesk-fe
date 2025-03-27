'use client'
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const StockHeader = () => (
  <div className='flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 border-b border-[#e9eaeb] pb-6'>
    <div className='flex flex-col gap-1 text-[#181d27]'>
      <p className='text-xl font-circular-medium leading-7'>Stock Preference</p>
      <p className='text-[#535862] font-circular-light leading-5 text-base'>
        Customize your store settings to optimize your business operations.
      </p>
    </div>
    <div className='flex flex-row gap-3 self-end md:self-auto'>
      <Button variant='outline' className='px-6 py-3 text-base cursor-pointer'>
        Cancel
      </Button>
      <Button className='px-6 py-3 text-base cursor-pointer'>Save</Button>
    </div>
  </div>
);

const CustomDropdown = ({
  options,
  defaultValue,
  selectWidth = '352px',
}: {
  options: { label: string; value: string }[];
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

const CurrencySelection = () => (
  <div className='flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full h-[249px] gap-16'>
    <div className='flex flex-col justify-start w-[30%] min-w-[120px]'>
      <p className='font-circular-medium text-[#414651] text-base leading-5 font-[450]'>
        Currency Selection
      </p>
    </div>
    <div className='flex flex-col gap-2 flex-1'>
      <CustomDropdown
        options={[
          { value: 'NGN', label: 'NGN – Nigerian Naira (₦)' },
          { value: 'USD', label: 'USD – US Dollar ($)' },
          { value: 'ZAR', label: 'ZAR – South African Rand (R)' },
        ]}
        defaultValue='NGN'
        selectWidth='358px'
      />
      <p className='font-circular-light text-[#535862] text-xs leading-5 font-[300] max-w-[358px]'>
        Changing the store currency will update how prices are displayed but
        will not automatically convert existing product prices. Ensure you
        update your pricing accordingly.
      </p>
    </div>
  </div>
);

const PaymentOptions = () => (
  <div className='flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full max-w-[590px] h-[114px] justify-between'>
    <div className='flex flex-col justify-start w-[30%] min-w-[120px]'>
      <p className='font-circular-medium text-[#414651] text-base leading-5 font-[450]'>
        Payment Options
      </p>
    </div>
    <div className='flex flex-col gap-2 flex-1'>
      <div className='flex flex-col gap-3 ml-16'>
        {[
          { id: 'checkbox1', label: 'Bank Transfer' },
          { id: 'checkbox2', label: 'PayPal' },
          { id: 'checkbox3', label: 'Stripe' },
        ].map((option) => (
          <div key={option.id} className='flex flex-row items-center gap-3'>
            <input
              type='checkbox'
              id={option.id}
              className='w-4 h-4 border border-[#e9eaeb] rounded-lg cursor-pointer accent-[#009A49]'
            />
            <label
              htmlFor={option.id}
              className='font-circular-light text-[#535862] text-base leading-5 font-[300]'
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AccountDetails = () => (
  <div className='flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full max-w-[590px] h-[68px] justify-between pb-4'>
    <div className='flex flex-col justify-start w-[30%] min-w-[120px]'>
      <p className='font-circular-medium text-[#414651] text-base leading-5 font-[400]'>
        Account Details
      </p>
    </div>
    <div className='flex flex-col flex-1'>
      <input
        type='text'
        className='w-full max-w-[328px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 ml-16 font-circular-light text-[#535862] text-base leading-5 font-[400]'
      />
    </div>
  </div>
);

const ToggleSwitch = () => (
  <label className='relative inline-flex items-center cursor-pointer'>
    <input type='checkbox' className='sr-only peer' />
    <div className='w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#009A49] transition-colors mr-77' />
    <span className='absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:translate-x-5 transition-transform' />
  </label>
);

const TaxSettings = () => (
  <div className='flex flex-col gap-5 w-full max-w-[653px] h-[249px]'>
    <div className='flex flex-row items-center justify-between gap-5'>
      <p className='font-circular-medium text-[#414651] text-base leading-5 font-[400]'>
        Tax Settings
      </p>
      <ToggleSwitch />
    </div>
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4'>
        <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
          Tax Percentage (%)
        </p>
        <input
          type='number'
          className='w-full sm:w-[352px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[400]'
          placeholder='0'
        />
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4'>
        <p className='font-circular-light text-[#535862] text-base leading-5 font-[300]'>
          Tax Type
        </p>
        <CustomDropdown
          options={[
            { value: 'VAT', label: 'VAT' },
            { value: 'Sales Tax', label: 'Sales Tax' },
          ]}
          defaultValue='VAT'
          selectWidth='352px'
        />
      </div>
    </div>
  </div>
);

const InventoryManagement = () => (
  <div className='flex flex-col gap-5 w-full max-w-[651px] h-[393px]'>
    <p className='font-circular-medium text-[#A0A0A0] not-last text-lg leading-6 font-[400] text-[16px]'>
      Inventory Management
    </p>
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row items-center justify-between border-b pb-4'>
        <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
          Low Stock Alerts
        </p>
        <ToggleSwitch />
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4'>
        <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
          Low Stock Threshold
        </p>
        <input
          type='number'
          className='w-full sm:w-[352px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[400]'
          placeholder='10'
        />
      </div>
      <div className='flex flex-row items-center justify-between border-b pb-4'>
        <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
          Auto-Restock
        </p>
        <ToggleSwitch />
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
          Restock Frequency
        </p>
        <CustomDropdown
          options={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
          defaultValue='Daily'
          selectWidth='352px'
        />
      </div>
    </div>
  </div>
);

function StockPreference() {
  return (
    <div className='flex flex-col gap-6 w-full max-w-[1307px]'>
      <StockHeader />
      <div className='flex flex-col lg:flex-row gap-[64px] w-full'>
        <div className='left-side flex flex-col gap-8 w-full max-w-[590px]'>
          <CurrencySelection />
          <PaymentOptions />
          <AccountDetails />
        </div>
        <div className='right-side flex flex-col gap-5 w-full max-w-[653px] mt-8 lg:mt-0'>
          <TaxSettings />
          <InventoryManagement />
        </div>
      </div>
    </div>
  );
}

export default StockPreference;
