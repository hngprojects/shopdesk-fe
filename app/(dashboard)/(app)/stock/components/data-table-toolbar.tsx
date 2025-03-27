'use client';

import type { Table } from '@tanstack/react-table';

import { DataTableViewOptions } from './data-table-view-options';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import AddStockModal from '@/components/modal/add-item';
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
    <div className='flex items-center justify-between'>
      <div />
      <div className='flex flex-1 items-center space-x-2'>
        <div className='relative'>
          <Search
            className='text-[#667085] absolute top-3 left-3 text-lg'
            size={20}
            color='#667085'
          />
          <Input
            placeholder='Search by item name'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='h-12 border w-[327px] max-[800px]:w-full rounded-md focus:outline-2 focus:outline-[#009A49] pl-10 text-lg placeholder:text-[#DEDEDE]'
          />
        </div>
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
      <button
        type='button'
        onClick={() => setIsAddStockModalOpen(true)}
        className='text-[#2A2A2A] cursor-pointer bg-white py-3 border font-circular-normal border-[#1B1B1B] rounded-[12px] pr-6 pl-4 max-[400px]:text-sm text-nowrap max-[1000px]:hidden mr-2 disabled:opacity-50'
        // disabled={!isPremium && stockItems.length >= 10}
      >
        + Add New Stock
      </button>

      <AddStockModal
        isOpen={isAddStockModalOpen}
        onOpenChange={(open) => setIsAddStockModalOpen(open)}
      />
    </div>
  );
}
