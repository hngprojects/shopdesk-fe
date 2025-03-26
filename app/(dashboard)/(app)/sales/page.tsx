'use client';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  type Column,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { columns, type Sale } from './components/columns';
import { DataTable } from './components/data-table';
import { DataTablePagination } from './components/data-table-pagination';
import { processDataIntoGroups, sampleData } from './data/data';

export default function SalesPage() {
  const [groupedData, setGroupedData] = useState<
    { timeKey: string; items: Sale[]; total: Sale }[]
  >([]);
  const [viewType, setViewType] = React.useState<'Daily' | 'Weekly' | 'Flat'>(
    'Daily'
  );

  useEffect(() => {
    setGroupedData(processDataIntoGroups(sampleData));
  }, []);

  // Create a table instance for pagination
  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <React.Fragment>
      <div className='p-8'>
        {/* Standalone header */}
        <div className='min-w-[900px] border border-gray-200 rounded-lg mb-4'>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={Math.random() * 10000000}>
                    {typeof column.header === 'function'
                      ? column.header({
                          column: column as Column<Sale, unknown>,
                          header: typeof column.header === 'function'
                            ? column.header({
                                column: column as Column<Sale, unknown>,
                                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                                header: {} as any, // Replace with appropriate Header<Sale, unknown> if available
                                table: table,
                              })
                            : column.header,
                          table: table,
                        })
                      : column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        {/* Tables for each time group */}
        <div className='space-y-4'>
          {groupedData.map((group) => (
            <div
              key={group.timeKey}
              className='border border-gray-200 rounded-lg mt-10 '
            >
              <DataTable
                data={[group.total, ...group.items]}
                columns={columns}
                showHeader={false}
              />
            </div>
          ))}
        </div>

        {/* Pagination at the bottom */}
        <div className='min-w-[900px] border border-gray-200 rounded-lg mt-4'>
          <div className='px-4 py-3'>
            <DataTablePagination
              table={table}
              viewType={viewType}
              setViewType={setViewType}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
