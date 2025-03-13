import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type PaginationProps = {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
};

const PaginationFeature = ({
  totalItems,
  currentPage,
  itemsPerPage,
  totalPages,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const itemsPerPageOptions = [5, 10, 15, 25, 50];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayedItemsCount = endIndex - startIndex;

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="w-full flex flex-col min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between gap-2 text-[#32475C99]">
      <span className="text-sm flex items-center justify-center flex-wrap whitespace-nowrap">
        <span className="max-[640px]:hidden">
          You have <span className="font-medium mx-1 text-[#2A2A2A]">{totalItems}</span>
          stock
        </span>
        (Displaying{""}
        <span className="font-medium mx-1 text-[#2A2A2A]">
          {displayedItemsCount > 0 ? `${startIndex + 1}-${endIndex}` : 0}
        </span>{" "}
        of <span className="font-medium mx-1 text-[#2A2A2A]">{totalItems}</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center font-medium mx-1 text-[#2A2A2A]">
            {itemsPerPage} <ChevronDown className="w-3 h-3 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {itemsPerPageOptions.map((count) => (
              <DropdownMenuItem
                key={count}
                onClick={() => onItemsPerPageChange(count)}
                className={itemsPerPage === count ? "bg-gray-100" : ""}
              >
                {count}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        per page)
      </span>

      <div>
        {totalPages > 1 && (
          <Pagination className="mt-2 md:mt-0">
            <PaginationContent className="flex-wrap">
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => handlePageClick(e, currentPage - 1)}
                  />
                </PaginationItem>
              )}

              {currentPage > 2 && (
                <PaginationItem className="hidden sm:inline-flex">
                  <PaginationLink onClick={(e) => handlePageClick(e, 1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage > 3 && (
                <PaginationItem className="hidden md:inline-flex">
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={(e) => handlePageClick(e, currentPage - 1)}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink isActive onClick={(e) => e.preventDefault()}>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => handlePageClick(e, currentPage + 1)}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 2 && (
                <PaginationItem className="hidden md:inline-flex">
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage < totalPages - 1 && (
                <PaginationItem className="hidden sm:inline-flex">
                  <PaginationLink
                    onClick={(e) => handlePageClick(e, totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    className="border border-[#DEE5ED] py-2"
                    pageNum = {currentPage}
                    onClick={(e) => handlePageClick(e, currentPage + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default PaginationFeature;
