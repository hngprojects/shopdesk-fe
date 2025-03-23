'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { Stock } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { EditableCell } from './editable-cell';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
<<<<<<< HEAD
=======

>>>>>>> ca12451 (update: columns)

export const columns: ColumnDef<Stock>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='h-full p-2 w-full flex items-center justify-center'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='trans '
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='absolute left-1/2 -translate-x-1/2 bottom-1/3 -translate-y-1/2'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ITEM NAME' />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('name');
      return (
        <EditableCell
          value={value}
          onChange={(val) => {
            row.original.name = val;
            // Optional: sync this update to local state or backend
          }}
        />
      );
    },
  },
  {
    accessorKey: 'buying_price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SELL PRICE' />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('buying_price');

      return (
        <EditableCell
          value={value}
          currency={row.original.currency_code}
          onChange={(val) => {
            row.original.buying_price = val;
          }}
        />
      );
    },
  },
  {
    accessorKey: 'available',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='AVAILABLE' />
    ),
    cell: ({ row }) => {
<<<<<<< HEAD
      const value = row.original.quantity;

      console.log(value, 'value');
=======
      const value = row.getValue<string>('quantity');
>>>>>>> ca12451 (update: columns)

      return (
        <EditableCell
          value={value}
          onChange={(val) => {
            row.original.quantity = val;
          }}
        />
      );
    },
  },
  {
    accessorKey: 'sales',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className='flex items-center justify-center'
      >
        <Button className='bg-[#F6F8FA] hover:bg-[#F6F8FA]/80 duration-150 transition-all rounded-[6px] border border-[#DEE5ED] uppercase text-lg text-[#090F1C] py-1.5 px-4 h-auto'>
          SHOW SALES
        </Button>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('available');
      return (
        <EditableCell
          value={value}
          onChange={(val) => {
            row.original.available = val;
          }}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'profitGroup',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className='flex items-center justify-center'
      >
        <Button className='bg-[#F6F8FA] hover:bg-[#F6F8FA]/80 duration-150 transition-all rounded-[6px] border border-[#DEE5ED] uppercase text-lg text-[#090F1C] py-1.5 px-4 h-auto'>
          SHOW PROFIT
        </Button>
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('available');
      return (
        <EditableCell
          value={value}
          onChange={(val) => {
            row.original.available = val;
          }}
        />
      );
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    header: ({ column }) => {
      return (
        <div
          className='h-full py-5 px-4 flex items-center justify-center bg-transparent hover:bg-black/10 transition-all duration-150 shadow-none cursor-pointer'
          title='Add new Column'
        >
          <div className='py-1.5 px-2'>
            <Icons.plus className='shrink-0' />
          </div>
        </div>
      );
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
