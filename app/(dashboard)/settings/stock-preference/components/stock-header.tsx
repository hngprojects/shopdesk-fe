import { Button } from '@/components/ui/button';

export const StockHeader = () => (
  <div className='flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 border-b border-[#e9eaeb] pb-6'>
    <div className='flex flex-col gap-1 text-[#181d27]'>
      <p className='text-xl font-circular-medium leading-7'>Store Preference</p>
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
