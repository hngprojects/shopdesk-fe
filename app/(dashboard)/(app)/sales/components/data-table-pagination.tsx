import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalPages = table.getPageCount();

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center">
          <Select
            value={viewType}
            onValueChange={(value: string) => {
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
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Flat">Flat / All Time</SelectItem>
            </SelectContent>
          </Select>
          View
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-8 px-2.5 border border-[#E2E8F0] bg-white hover:bg-[#E2E8F0]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="ml-2">Previous</span>
        </Button>

        <span className="flex items-center gap-1">
          <strong>
            {pageIndex + 1} of {totalPages}
          </strong>
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="h-8 px-2.5 border border-[#E2E8F0] bg-white hover:bg-[#E2E8F0]"
        >
          <span className="mr-2">Next</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
