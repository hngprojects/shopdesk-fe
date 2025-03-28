import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPageNumbers } from "./data/paginationUtils";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  viewType: "Daily" | "Weekly" | "Flat";
  setViewType: (type: "Daily" | "Weekly" | "Flat") => void;
}

export function DataTablePagination<TData>({
  table,
  viewType,
  setViewType,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pages = getPageNumbers(pageIndex + 1, pageCount);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        You have made{" "}
        <span className="text-[#2A2A2A]">
          {table.getFilteredRowModel().rows.length}
        </span>{" "}
        {table.getFilteredRowModel().rows.length > 1 ? "sales" : "sale"}{" "}
        <span className="inline-flex items-center">
          (Displaying{" "}
          <Select
            value={viewType}
            onValueChange={(value) => {
              setViewType(value as "Daily" | "Weekly" | "Flat");
            }}
          >
            <SelectTrigger className="h-8 w-auto p-0 border-none shadow-none focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
              <span className="flex items-center ml-1 text-[#2A2A2A]">
                {viewType === "Flat" ? "Flat / All Time" : viewType}
                <img
                  src="/icons/downarrow.png"
                  alt="chevron-down"
                  className="h-2 w-2 mx-1"
                />
              </span>
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem value="Daily" className="text-[#2A2A2A]">
                Daily
              </SelectItem>
              <SelectItem value="Weekly" className="text-[#2A2A2A]">
                Weekly
              </SelectItem>
              <SelectItem value="Flat" className="text-[#2A2A2A]">
                Flat / All Time
              </SelectItem>
            </SelectContent>
          </Select>
          )
        </span>
      </div>
      <div className="flex items-center">
        {/* Previous button */}
        {pageIndex > 0 && (
          <Button
            variant="outline"
            className="h-8 px-2.5 border border-[#E2E8F0] bg-white hover:bg-[#E2E8F0]"
            onClick={() => table.previousPage()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="ml-2">Previous</span>
          </Button>
        )}

        {/* Page numbers */}
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-sm">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant="outline"
              className={`h-8 px-3 border ${
                pageIndex + 1 === page
                  ? "bg-white text-[#2A2A2A] border-[#E2E8F0] font-bold"
                  : "border-[#E2E8F0] bg-white hover:bg-[#E2E8F0]"
              }`}
              onClick={() =>
                table.setPageIndex(typeof page === "number" ? page - 1 : 0)
              }
            >
              {page}
            </Button>
          )
        )}

        {/* Next button */}
        {pageIndex < pageCount - 1 && (
          <Button
            variant="outline"
            className="h-8 px-2.5 border border-[#E2E8F0] bg-white hover:bg-[#E2E8F0]"
            onClick={() => table.nextPage()}
          >
            <span className="mr-2">Next</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
