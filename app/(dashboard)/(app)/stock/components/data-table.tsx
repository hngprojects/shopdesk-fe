"use client";

import Sidebar from "@/components/functional/sidebar";
import AddStockModal from "@/components/modal/add-item";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { X } from "lucide-react";
import * as React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
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
    <div className="flex w-full h-full gap-6">
      <div
        className={`transition-all duration-200 ${
          isSidebarOpen ? "w-[calc(100%-365px)]" : "w-full"
        }`}
      >
        <div className="flex flex-col border border-gray-200 rounded-lg h-full overflow-hidden">
          <div className="p-4 border-b lg:border-0 lg:absolute lg:top-9 lg:-right-2">
            <DataTableToolbar table={table} />
          </div>

          <div className="flex-1 overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-r border-gray-200 last:border-r-0"
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
                      className="h-24 text-center text-red-500 flex gap-4"
                    >
                      <X /> <span>Error Fetching Stocks</span>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => handleRowClick(row.original)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-4 py-3 text-sm text-gray-800 border-b border-r border-gray-200 last:border-r-0"
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
                      className="h-24 text-center text-gray-500 border-b border-gray-200"
                    >
                      <EmptyStock
                        onClick={() => setIsAddStockModalOpen(true)}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="sticky bottom-0 bg-white px-4 py-3 border-t border-gray-200">
            <DataTablePagination table={table} />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && selectedRow && (
        <div className="w-[365px] flex-shrink-0">
          <Sidebar
            selectedItem={selectedRow}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      <AddStockModal
        isOpen={isAddStockModalOpen}
        onOpenChange={(open) => setIsAddStockModalOpen(open)}
      />
    </div>
  );
}
