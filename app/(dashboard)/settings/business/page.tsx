'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LogoPhoto from '@/public/modal-images/Logo-Wrapper.png';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BuisnessPage() {
  return (
    <>
      <div>
        <div className='flex flex-row w-full justify-between items-center gap-4  md:border-b border-[#e9eaeb] pb-6'>
          <div className='w-full flex flex-col gap-1 text-[#181d27]'>
            <p className='text-xl font-circular-medium leading-7'>
              Business info
            </p>
            <p className='text-[#535862] text-base font-circular-light leading-5'>
              Update your business photo and details here.
            </p>
          </div>
          <div className='flex flex-row gap-3 mt-4 md:mt-0'>
            <Button
              variant='outline'
              className='px-6 py-3 text-base curpor-pointer'
            >
              Cancel
            </Button>
            <Button className=' px-6 py-3 text-base cursor-pointer'>
              Save
            </Button>
          </div>
        </div>

        <div className='flex flex-row w-full md:border-b border-[#e9eaeb] pb-6 pt-6'>
          <div className='w-1/2 md:flex flex-col gap-1 text-[#181d27] hidden'>
            <p className='text-base font-circular-medium'>Business logo</p>
            <p className='text-sm text-[#535862] leading-5 font-circular-light max-w-[280px] pr-2.5'>
              Upload your business logo and then choose where you want it to be
              displaced
            </p>
          </div>

          <div className='flex flex-col gap-5 items-start w-full'>
            <Image
              src={LogoPhoto}
              alt='profile'
              className='w-[full] h-[49px] '
            />
            <Button
              variant='outline'
              className='py-3 px-6 rounded-[12px] bg-white border border-[#1b1b1b] text-[#1b1b1b]'
            >
              <Plus className='w-6 h-6' />
              Change Photo
            </Button>
          </div>
        </div>
        <div className='flex-col flex '>
          <div className='flex flex-col w-full items-center justify-start gap-4  md:border-b border-[#e9eaeb] pb-6 mt-6'>
            <div className='flex w-full items-start md:flex-row flex-col gap-2 md:gap-4'>
              <p className='w-1/5'>Buisness Name</p>

              <Input
                className='md:w-1/3 w-full h-[68px] text-lg placeholder:text-[#B8B8B8] rounded-[9px]'
                type='text'
                placeholder='Rolland'
              />
            </div>
          </div>
        </div>
        <div className='flex-col flex '>
          <div className='flex flex-col w-full items-center justify-start gap-4  md:border-b border-[#e9eaeb] pb-6 mt-6'>
            <div className='flex w-full items-start md:flex-row flex-col gap-2 md:gap-4'>
              <p className='w-1/5'>Buisness type</p>

              <Input
                className='md:w-1/3 w-full h-[68px] text-lg placeholder:text-[#B8B8B8] rounded-[9px]'
                type='text'
                placeholder='Rolland'
              />
            </div>
          </div>
        </div>
        <div className='flex-col flex '>
          <div className='flex flex-col w-full items-center justify-start gap-4  md:border-b border-[#e9eaeb] pb-6 mt-6'>
            <div className='flex w-full items-start md:flex-row flex-col gap-2 md:gap-4'>
              <p className='w-1/5'>Contact information</p>

              <div className='flex flex-col w-full gap-2 md:gap-4 max-w-[625px]'>
                <div className='flex flex-col gap-1'>
                  <Label className='text-sm font-circular-medium text-[#181d27]'>
                    Email
                  </Label>
                  <Input
                    className='w-[350px] h-[68px] text-lg placeholder:text-[#B8B8B8] rounded-[9px]'
                    type='email'
                    placeholder='Shopdesk@gmail.com'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='text-sm font-circular-medium text-[#181d27]'>
                    Telephone
                  </Label>
                  <Input
                    className='w-[350px] h-[68px] text-lg placeholder:text-[#B8B8B8] rounded-[9px]'
                    type='number'
                    placeholder='+002-2345-2457-4321'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='text-sm font-circular-medium text-[#181d27]'>
                    Address
                  </Label>
                  <Input
                    className='w-full h-[68px] text-lg placeholder:text-[#B8B8B8] rounded-[9px]'
                    type='text'
                    placeholder='Km 124, Kingsley Jegede street, Off Ikeja bus- stop, Lagos, Nigeria'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <Button className='py-3 px-6 bg-[#FF000D] text-base hover:bg-[#FF000D] cursor-pointer'>
          Deactivate Account
        </Button>
      </div>
    </>
  );
}
