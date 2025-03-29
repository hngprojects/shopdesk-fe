'use client';

import type { Table } from '@tanstack/react-table';

import AddStockModal from '@/components/modal/add-item';
// import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);

  return (
    <div className='flex items-center relative justify-between gap-5 lg:gap-0 xl:gap-5'>
      <div className='flex items-center lg:absolute lg:right-8 xl:-right-3 space-x-2'>
        <div className='flex items-center border rounded-xl justify-center w-full gap-2 border-neutral-75 bg-white px-2'>
          <Search
            className='text-[#667085]  text-lg'
            size={20}
            color='#667085'
          />
          <input
            placeholder='Search by item name'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='h-10 w-[327px] max-[800px]:w-full rounded-md focus:outline-0 px-2 text-lg placeholder:text-[#DEDEDE] lg:w-[220px] xl:w-[327px]'
          />
        </div>
        <button
        type='button'
        onClick={() => setIsAddStockModalOpen(true)}
        className='text-[#2A2A2A] cursor-pointer h-10 flex justify-center items-center bg-white border font-circular-normal border-[#1B1B1B] rounded-lg pr-6 pl-4 max-[400px]:text-sm text-nowrap max-[1000px]:hidden mr-2 disabled:opacity-50'
        // disabled={!isPremium && stockItems.length >= 10}
      >
        + Add New Stock
      </button>
        {/* {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
          />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title='Priority'
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <X />
          </Button>
        )} */}
      </div>


      <AddStockModal
        isOpen={isAddStockModalOpen}
        onOpenChange={(open) => setIsAddStockModalOpen(open)}
      />
    </div>
  );
}
