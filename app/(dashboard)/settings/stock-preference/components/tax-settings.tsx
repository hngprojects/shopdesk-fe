import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { CustomDropdown } from './custom-dropdown';

export const TaxSettings = () => (
  <div className='flex flex-col gap-5 w-full max-w-[653px] h-[249px]'>
    <div className='flex flex-row items-center justify-between gap-5'>
      <p className='font-circular-medium text-[#414651] text-base leading-5 font-[400]'>
        Tax Settings
      </p>
      <ToggleSwitch checked={false} onChange={() => {}} />
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
