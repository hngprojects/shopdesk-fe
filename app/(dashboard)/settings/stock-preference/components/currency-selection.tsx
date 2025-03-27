import { CustomDropdown } from './custom-dropdown';

export const CurrencySelection = () => (
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
