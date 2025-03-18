"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import PaginationFeature from "./paginationfeature";

// Define the SalesItem type outside the component
export type SalesItem = {
  id: string;
  item_name: string;
  price: number;
  quantity: number;
  total: number;
  date: string;
  customer?: string;
  payment_method?: string;
};

interface SalesTabProps {
  onAddSale: () => void;
}

const SalesTab = ({ onAddSale }: SalesTabProps) => {
  const [salesItems, setSalesItems] = useState<SalesItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
      setTimeout(() => {
      setSalesItems([]);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredItems = salesItems.filter((item) =>
    item.item_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalItems = isSearching ? filteredItems.length : salesItems.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const paginatedData = isSearching
    ? filteredItems.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : salesItems.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

  const salesColumns: ColumnDef<SalesItem>[] = useMemo(
    () => [
      {
        accessorKey: "item_name",
        header: "ITEM NAME",
        size: 200,
        cell: ({ row }) => (
          <div className="inline-block w-full overflow-hidden">
            <span className="block text-balance">{row.original.item_name}</span>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: "PRICE",
        cell: ({ row }) => (
          <div className="inline-block w-full overflow-hidden">
            <span className="block w-full overflow-x-clip">{`${row.original.price.toLocaleString()}`}</span>
          </div>
        ),
      },
      {
        accessorKey: "quantity",
        header: "QUANTITY",
        cell: ({ row }) => (
          <div className="inline-block w-full overflow-hidden">
            {row.original.quantity}
          </div>
        ),
      },
    ],
    []
  );

  const salesTable = useReactTable({
    data: paginatedData,
    columns: salesColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (count: number) => {
    setRowsPerPage(count);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="border shadow-md rounded-b-lg rounded-tr-lg relative rounded-bl-lg flex-1 overflow-auto w-full">
      {salesItems.length === 0 ? (
        <div className="relative">
          <Table className="border-collapse border-b min-w-[590px] table-fixed w-full">
            <TableHeader>
              <TableRow className="h-[50px]">
                <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/3 min-w-[120px] text-left border-b border-r">
                  ITEM NAME
                </TableHead>
                <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/3 min-w-[120px] text-center border-b border-r">
                  PRICE
                </TableHead>
                <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/3 min-w-[120px] text-center border-b border-r">
                  QUANTITY
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div className="w-full overflow-x-auto">
            <span className="w-full h-px bg-[#DEDEDE] block"></span>
            <div className="relative h-[80vh] w-full">
              <div className="absolute space-y-4 right-0 left-0 top-28 w-56 mx-auto text-center">
                <Image
                  src="/icons/empty-note-pad.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="mx-auto"
                />
                <p className="text-[#888888] text-sm">
                  You have not made any sales
                </p>
                <button
                  type="button"
                  onClick={onAddSale}
                  className="shadow-[4px_4px_4px_0px_rgba(77,95,113,0.12)] border border-[#DEDEDE] rounded-lg px-5 py-2 hover:cursor-pointer font-circular-normal text-[#2A2A2A]"
                >
                  + Record a Sale
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Table className="border-collapse border-b min-w-[590px] table-fixed">
            <TableHeader>
              {salesTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="h-[50px]">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-[#090F1C] font-circular-medium px-4 py-2 text-center border-b border-r min-w-[100px]"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowsPerPage }).map((_, index) => {
                const row = salesTable.getRowModel().rows[index] || null;

                return (
                  <TableRow key={index} className="h-[50px]">
                    {row
                      ? row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="px-4 py-3 text-center border-r"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))
                      : salesColumns.map((column) => (
                          <TableCell
                            key={column.id}
                            className="px-4 py-3 text-center border-r text-gray-400"
                          >
                            {""} {/* Placeholder for missing row */}
                          </TableCell>
                        ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={salesColumns.length} className="py-4">
                  <PaginationFeature
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default SalesTab;
