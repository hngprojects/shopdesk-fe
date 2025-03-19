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
      {/* Items per page and count */}
      <span className="text-sm flex items-center justify-center flex-wrap whitespace-nowrap">
        <span>
          You have<span className="font-medium mx-1 text-[#2A2A2A]">{totalItems}</span>
        </span>
        stock (Displaying{""}
        {/* <span className="font-medium mx-1 text-[#2A2A2A]">
          {displayedItemsCount > 0 ? `${startIndex + 1}-${endIndex}` : 0}
        </span>{" "}
        of <span className="font-medium mx-1 text-[#2A2A2A]">{totalItems}</span> */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center font-medium mx-1 text-[#2A2A2A]">
            {itemsPerPage}  
            <svg
             className="w-3 h-3 ml-1 text-[#32475C8A]"
             viewBox="0 0 10 10"
             fill="currentColor"
           >
             <path d="M5 7L1 3h8z" />
           </svg>

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

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="w-full min-[500px]:w-auto">
          <Pagination className="w-full">
            <PaginationContent className="w-full flex justify-between min-[500px]:justify-center gap-1">
              {/* Previous button */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => handlePageClick(e, currentPage - 1)}
                  />
                </PaginationItem>
              )}

              {/* First page */}
              {currentPage > 2 && (
                <PaginationItem className="hidden sm:inline-flex">
                  <PaginationLink onClick={(e) => handlePageClick(e, 1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis before current page */}
              {currentPage > 3 && (
                <PaginationItem className="hidden md:inline-flex">
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Previous page */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={(e) => handlePageClick(e, currentPage - 1)}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Current page */}
              <PaginationItem>
                <PaginationLink isActive onClick={(e) => e.preventDefault()}>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              {/* Next page */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    onClick={(e) => handlePageClick(e, currentPage + 1)}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis after current page */}
              {currentPage < totalPages - 2 && (
                <PaginationItem className="hidden md:inline-flex">
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Last page */}
              {currentPage < totalPages - 1 && (
                <PaginationItem className="hidden sm:inline-flex">
                  <PaginationLink
                    onClick={(e) => handlePageClick(e, totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Next button */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    pageNum = {currentPage}
                    onClick={(e) => handlePageClick(e, currentPage + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default PaginationFeature;