"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Sidebar from "@/components/functional/sidebar";
import AddStockModal from "@/components/modal/add-item";
import { DataTablePagination } from "./data-table-pagination";
import EmptyStock from "./empty-stock-state";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  error?: boolean | null;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  error,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedRow, setSelectedRow] = React.useState<TData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = React.useState(false);

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

  const handleRowClick = (row: TData) => {
    setSelectedRow(row);
    setIsSidebarOpen(true);
  };

  return (
    <div className="flex space-x-4 w-full h-full">
      {/* Main table container */}
      <div className="flex-1 flex flex-col min-w-[900px] border-l-0 border border-gray-200 rounded-br-lg rounded-bl-lg rounded-tr-lg overflow-x-auto">
        {/* <div className="p-4 border-b">
          <DataTableToolbar table={table} />
        </div> */}

        {/* Table wrapper with scroll */}
        <div className="flex-1 overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-white min-w-full">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-4 py-3 text-left min-w-full text-sm font-medium text-gray-700 border-b border-r border-gray-200 last:border-r-0"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-white">
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Loading stocks...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-red-500 oveflow-x-auto"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleRowClick(row.original)}
                    className="hover:bg-gray-50 cursor-pointer oveflow-x-auto last:border-b-0 last:border-white"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-3 text-sm text-gray-800 border-b border-r border-gray-200 last:border-r-0 "
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500 border-b border-gray-200 "
                  >
                    {/* Empty Stock State */}
                    <EmptyStock onClick={() => setIsAddStockModalOpen(true)} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="sticky bottom-0 bg-white px-4 py-3">
          <DataTablePagination table={table} />
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && selectedRow && (
        <Sidebar
          selectedItem={selectedRow}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <AddStockModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        onSave={() => {}}
      />
    </div>
  );
}
