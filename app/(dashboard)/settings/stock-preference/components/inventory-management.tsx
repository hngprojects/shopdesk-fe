import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { CustomDropdown } from './custom-dropdown';

export const InventoryManagement = () => (
  <div className='flex flex-col gap-5 w-full max-w-[651px] h-[393px]'>
    <p className='font-circular-medium text-[#A0A0A0] not-last text-lg leading-6 font-[400] text-[16px]'>
      Inventory Management
    </p>
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row items-center justify-between border-b pb-4'>
        <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
          Low Stock Alerts
        </p>
        <ToggleSwitch checked={false} onChange={() => {}} />
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
        <ToggleSwitch checked={false} onChange={() => {}} />
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
