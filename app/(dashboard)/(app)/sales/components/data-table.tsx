"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  error?: string | null;
  onRowHover?: (rowId: string) => void;
  onRowLeave?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  error,
  onRowHover,
  onRowLeave,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col min-w-[900px] overflow-x-auto">
        <Table>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading sales...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                // row.original.isSpacer ? (
                //   <TableRow key={row.id} className='h-7'>
                //     <TableCell
                //       colSpan={columns.length}
                //       className='border-none bg-transparent h-15 border-r-0 border-l-0'
                //     />
                //   </TableRow>
                // ) : (
                <TableRow
                  key={row.id}
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  data-state={row.getIsSelected() && "selected"}
                  onMouseEnter={() => row.index === 0 && onRowHover?.(row.id)}
                  onMouseLeave={onRowLeave}
                  className="hover:bg-gray-50 cursor-pointer overflow-x-auto grid grid-cols-4 border-b border-gray-200 first:h-11 "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-800 border-r overflow-y-auto border-gray-200 last:border-r-0 h-11"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
              // )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
