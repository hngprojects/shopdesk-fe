"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Search, Plus, X, Loader2 } from "lucide-react";
import { FaSortDown } from "react-icons/fa";
import { StockItem } from "../page";
import Sidebar from "@/components/functional/sidebar";
import PaginationFeature from "@/components/functional/paginationfeature";
import AddItemModal from "@/components/modal/add-item";
import ImageUploader from "@/components/modal/add-image";
import box from "@/public/icons/box.svg";
import { useStore } from "@/store/useStore";
import { getAccessToken } from "@/app/api/token";

// Add the ColumnMeta interface declaration
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    className?: string;
    updateData?: (rowIndex: number, key: string, value: string) => void;
  }
}

interface TableContentProps {
  stockItems: StockItem[];
  setStockItems: React.Dispatch<React.SetStateAction<StockItem[]>>;
  handleInputChange?: (field: keyof StockItem, value: string) => void;
  handleInlineEdit?: (item: StockItem, field?: keyof StockItem) => void;
  handleSaveInline?: () => Promise<void>;
  editedItem?: StockItem | null;
  isEditingTransition?: string | null;
  activeField?: keyof StockItem | null;
  cancelEdit?: () => void;
}

function TableContent({
  stockItems,
  setStockItems,
  handleInputChange: externalHandleInputChange,
  handleInlineEdit: externalHandleInlineEdit,
  handleSaveInline: externalHandleSaveInline,
  editedItem: externalEditedItem,
  isEditingTransition: externalIsEditingTransition,
  activeField: externalActiveField,
  cancelEdit: externalCancelEdit,
}: TableContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showSales, setShowSales] = useState(false);
  const [showProfit, setShowProfit] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [currentItem, setCurrentItem] = useState<StockItem | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editedItem, setEditedItem] = useState<StockItem | null>(null);
  const [isEditingTransition, setIsEditingTransition] = useState<string | null>(
    null
  );
  const [activeField, setActiveField] = useState<keyof StockItem | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = stockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.sku && item.sku.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Use external state values if provided, otherwise use local state
  const effectiveEditedItem =
    externalEditedItem !== undefined ? externalEditedItem : editedItem;
  const effectiveIsEditingTransition =
    externalIsEditingTransition !== undefined
      ? externalIsEditingTransition
      : isEditingTransition;
  const effectiveActiveField =
    externalActiveField !== undefined ? externalActiveField : activeField;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleRowClick = (item: StockItem) => {
    // Don't open sidebar if we're currently editing
    if (effectiveEditedItem !== null) {
      return;
    }
    setSelectedItem(item);
    setIsSidebarOpen(true);
  };

  const handleSaveEdit = (updatedItem: StockItem) => {
    setStockItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem({ ...updatedItem });
  };

  const handleSaveImages = (images: { id: string; src: string }[]) => {
    if (!currentItem) return;

    const updatedItems = stockItems.map((item) => {
      if (item.id === currentItem.id) {
        return {
          ...item,
          image: images.length > 0 ? images[0] : null,
          images: images,
        };
      }
      return item;
    });

    setStockItems(updatedItems);
    setImageModalOpen(false);
    setCurrentItem(null);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (count: number) => {
    setRowsPerPage(count);
    setCurrentPage(1);
  };

  // Functions to toggle sales and profit view
  const toggleSales = () => {
    if (isSidebarOpen) {
      alert("First close the sidebar to view Sales.");
      return;
    }
    setShowSales((prev) => !prev);
  };

  const toggleProfit = () => {
    if (isSidebarOpen) {
      alert("First close the sidebar to view Profit.");
      return;
    }
    setShowProfit((prev) => !prev);
  };

  // Adding the missing functions for inline editing
  const handleInlineEdit = useCallback(
    (item: StockItem, field: keyof StockItem = "name") => {
      if (externalHandleInlineEdit) {
        externalHandleInlineEdit(item, field);
      } else {
        setIsEditingTransition(item.id);
        setEditedItem({ ...item });
        setActiveField(field);
        setIsEditingTransition(null);
      }
    },
    [externalHandleInlineEdit]
  );

  const handleInputChange = useCallback(
    (field: keyof StockItem, value: string) => {
      if (externalHandleInputChange) {
        externalHandleInputChange(field, value);
      } else if (editedItem) {
        setEditedItem((prev) => ({
          ...prev!,
          [field]:
            field === "quantity" || field === "buying_price"
              ? Number(value)
              : value,
        }));
        setActiveField(field);
      }
    },
    [editedItem, externalHandleInputChange]
  );

  const handleSaveInline = async () => {
    if (externalHandleSaveInline) {
      await externalHandleSaveInline();
    } else {
      if (!editedItem) return;

      const organization_id = useStore.getState().organizationId;
      try {
        const token = await getAccessToken();
        setIsEditingTransition(editedItem.id);

        const response = await fetch("/api/stocks/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            organization_id: organization_id,
            stock_id: editedItem.id,
            name: editedItem.name,
            buying_price: editedItem.buying_price,
            quantity: editedItem.quantity,
            currency_code: editedItem.currency_code,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update stock item");
        }

        setStockItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editedItem.id ? { ...item, ...editedItem } : item
          )
        );

        setEditedItem(null);
      } catch (error) {
        console.error("Error saving changes:", error);
        alert("Failed to save changes. Please try again.");
      } finally {
        setIsEditingTransition(null);
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <span className="!px-4 flex flex-start font-circular-medium text-[18px] leading-[28px] tracking-normal text-center w-full">
            ITEM NAME
          </span>
        ),
        cell: ({ row }: any) => {
          const isEditingThisRow = effectiveEditedItem?.id === row.original.id;
          const isTransitioning =
            effectiveIsEditingTransition === row.original.id;

          // Prevent the cell from triggering row click
          const handleCellClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            if (!isEditingThisRow) {
              handleInlineEdit(row.original, "name");
            }
          };

          return (
            <div
              className="w-full h-full flex items-center overflow-hidden editable-cell hover:bg-gray-50 hover:cursor-pointer"
              onClick={handleCellClick}
              title="Click to edit"
              data-editable="true"
            >
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <input
                  ref={nameInputRef}
                  value={effectiveEditedItem?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") handleSaveInline();
                    if (e.key === "Escape" && externalCancelEdit)
                      externalCancelEdit();
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="no-spinner w-full h-full min-w-0 border text-left box-border p-2 focus:outline-[#009A49]"
                />
              ) : (
                <span
                  className="block text-balance py-2 pl-4 capitalize"
                  onClick={handleCellClick}
                  data-editable="true"
                >
                  {row.original.name}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "sell_price",
        header: () => (
          <span className="!px-4 font-circular-medium text-[18px] leading-[28px] tracking-normal text-center">
            SELLING PRICE
          </span>
        ),
        cell: ({ row }: any) => {
          const isEditingThisRow =
            effectiveEditedItem?.id === row.original.id &&
            effectiveActiveField === "buying_price";
          const isTransitioning =
            effectiveIsEditingTransition === row.original.id;

          // Prevent the cell from triggering row click
          const handleCellClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            if (!isEditingThisRow) {
              handleInlineEdit(row.original, "buying_price");
            }
          };

          return (
            <div
              className="w-full h-full flex items-center overflow-hidden editable-cell hover:bg-gray-50 hover:cursor-pointer"
              onClick={handleCellClick}
              title="Click to edit"
              data-editable="true"
            >
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <input
                  ref={priceInputRef}
                  value={effectiveEditedItem?.buying_price || ""}
                  onChange={(e) =>
                    handleInputChange("buying_price", e.target.value)
                  }
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") handleSaveInline();
                    if (e.key === "Escape" && externalCancelEdit)
                      externalCancelEdit();
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="no-spinner w-full h-full min-w-0 border text-center box-border p-2 focus:outline-[#009A49]"
                  type="number"
                />
              ) : (
                <span
                  className="block w-full overflow-x-clip"
                  onClick={handleCellClick}
                  data-editable="true"
                >
                  {`${row.original.currency_code || ""} ${
                    row.original.buying_price?.toLocaleString() || ""
                  }`}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "available",
        header: () => (
          <span className="!px-4 font-circular-medium text-[18px] leading-[28px] tracking-normal text-center">
            AVAILABLE
          </span>
        ),
        cell: ({ row }: any) => {
          const isEditingThisRow =
            effectiveEditedItem?.id === row.original.id &&
            effectiveActiveField === "quantity";
          const isTransitioning =
            effectiveIsEditingTransition === row.original.id;

          // Prevent the cell from triggering row click
          const handleCellClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            if (!isEditingThisRow) {
              handleInlineEdit(row.original, "quantity");
            }
          };

          return (
            <div
              className="w-full h-full flex items-center overflow-hidden editable-cell hover:bg-gray-50 hover:cursor-pointer"
              onClick={handleCellClick}
              title="Click to edit"
              data-editable="true"
            >
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <input
                  ref={quantityInputRef}
                  value={effectiveEditedItem?.quantity || ""}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") handleSaveInline();
                    if (e.key === "Escape" && externalCancelEdit)
                      externalCancelEdit();
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="no-spinner w-full h-full min-w-0 border text-center box-border p-2 focus:outline-[#009A49]"
                  type="number"
                />
              ) : (
                <span
                  className="block w-full text-center overflow-x-clip"
                  onClick={handleCellClick}
                  data-editable="true"
                >
                  {row.original.quantity}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "sales",
        header: () =>
          showSales ? (
            <div className="bg-[#CCEBDB] relative w-full h-full">
              <div className="flex justify-between items-center max-w-[356px] py-4">
                <span className="text-[#595959] font-circular-medium text-[14px] text-center w-full">
                  SALES
                </span>
                <button
                  onClick={toggleSales}
                  className="rounded-[6px] border border-green-200 hover:bg-gray-200"
                >
                  <X className="rounded-[6px] py-[4px] px-[8px] bg-white w-full h-full" />
                </button>
              </div>

              <div className="grid grid-cols-5 text-center border-t border-[#B2E1C8]">
                {["MON", "TUE", "WED", "THU", "FRI"].map((day, index) => (
                  <div
                    key={day}
                    className={`flex items-center justify-center text-[12px] gap-1 text-gray-700 font-circular-medium py-[9px] ${
                      index !== 4 ? "border-r border-[#B2E1C8]" : ""
                    }`}
                  >
                    {day}
                    <FaSortDown className="w-[13px] h-[13px] text-[#83838B] mb-1" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full p-4">
              <button
                onClick={toggleSales}
                className="bg-[#F6F8FA] border border-[#DEE5ED] rounded-[6px] font-circular-medium text-[#090F1C] py-2 px-4"
              >
                SHOW SALES
              </button>
            </div>
          ),
        cell: ({ row }: any) =>
          showSales ? (
            <div className="grid grid-cols-5 h-full w-full px-0">
              {["mon", "tue", "wed", "thu", "fri"].map((day) => (
                <input
                  key={day}
                  type="number"
                  className="no-spinner w-full h-full border-r px-2 py-1 text-center focus:outline-[#009A49]"
                />
              ))}
            </div>
          ) : null,
      },
      {
        accessorKey: "profitGroup",
        header: () =>
          showProfit ? (
            <div className="relative w-full h-full border border-[#CCEAFF]">
              <div className="bg-[#E5F4FF] flex justify-between items-center max-w-[356px] p-3">
                <span className="text-[#595959] font-circular-medium text-[14px] text-center w-full">
                  PROFIT
                </span>
                <button
                  onClick={toggleProfit}
                  className="rounded-[6px] border border-green-200 hover:bg-gray-200"
                >
                  <X className="rounded-[6px] py-[4px] px-[8px] bg-white w-full h-full" />
                </button>
              </div>
              <div className="bg-[#E5F4FF] grid grid-cols-2 text-center border-t border-[#B2E1C8]">
                <div className="flex items-center justify-center gap-2 text-gray-700 font-circular-medium py-[9px] border-r border-[#B2E1C8]">
                  <span>COST PRICE</span>
                  <FaSortDown className="w-[12px] h-[12px] text-[#83838B] mb-1" />
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700 font-circular-medium py-[9px]">
                  <span>PROFIT</span>
                  <FaSortDown className="w-[12px] h-[12px] text-[#83838B] mb-1" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full p-4">
              <button
                onClick={toggleProfit}
                className="bg-[#F6F8FA] border border-[#DEE5ED] rounded-[6px] font-circular-medium text-[#090F1C] py-2 px-4"
              >
                SHOW PROFIT
              </button>
            </div>
          ),
        cell: ({ row, column }: any) =>
          showProfit ? (
            <div
              className={`flex items-center justify-between w-full h-full ${
                showProfit ? "" : "hidden sm:table-cell"
              }`}
            >
              <input
                type="number"
                className="w-1/2 px-2 py-1 border-r border-gray-300 h-full text-center"
                placeholder="CP"
              />
              <input
                type="number"
                className="w-1/2 px-2 py-1 border-gray-300 h-full text-center"
                placeholder="Profit"
              />
            </div>
          ) : null,
      },
      {
        id: "actions",
        header: () => (
          <div className="flex justify-center items-center">
            <Plus className="w-[15px] h-[15px] text-[#2A2A2A] self-center" />
          </div>
        ),
        cell: () => null, // Empty cell
        size: 8, // Set a small width for the column
      },
    ],
    [
      effectiveEditedItem,
      effectiveIsEditingTransition,
      effectiveActiveField,
      showSales,
      showProfit,
      toggleSales,
      toggleProfit,
      handleInlineEdit,
      handleInputChange,
      handleSaveInline,
    ]
  );

  const paginatedData = isSearching
    ? filteredItems.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : stockItems.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Add useEffect to initialize data
  useEffect(() => {
    // Check for premium status
    const organizationId = useStore.getState().organizationId;
    if (organizationId === "160db8736a9d47989381e01a987e4413") {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }

    // Calculate total pages whenever stock items or rowsPerPage changes
    const totalPagesCount = Math.ceil(stockItems.length / rowsPerPage);
    setTotalPages(totalPagesCount);

    // Adjust current page if it exceeds the new total pages
    if (currentPage > totalPagesCount && totalPagesCount > 0) {
      setCurrentPage(totalPagesCount);
    }
  }, [stockItems.length, rowsPerPage, currentPage]);

  // Add effect to focus the input when editing starts
  useEffect(() => {
    if (effectiveEditedItem) {
      if (effectiveActiveField === "name" && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (
        effectiveActiveField === "buying_price" &&
        priceInputRef.current
      ) {
        priceInputRef.current.focus();
      } else if (
        effectiveActiveField === "quantity" &&
        quantityInputRef.current
      ) {
        quantityInputRef.current.focus();
      }
    }
  }, [effectiveEditedItem, effectiveActiveField]);

  // Add effect to handle outside clicks to cancel editing
  useEffect(() => {
    if (effectiveEditedItem && externalCancelEdit) {
      const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          !target.closest(".editable-cell") &&
          !target.hasAttribute("data-editable")
        ) {
          externalCancelEdit();
        }
      };

      // Add a small delay before attaching the click handler
      // to avoid the current click that started editing
      const timeoutId = setTimeout(() => {
        document.addEventListener("click", handleOutsideClick);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [effectiveEditedItem, externalCancelEdit]);

  return (
    <div className="space-y-0 w-full">
      <div className="w-full flex justify-between max-[800px]:flex-col-reverse">
        <div className="mt-4">
          <div className="flex items-center justify-center gap-2 border border-b-white py-2 rounded-tr-lg rounded-tl-lg w-44 max-[800px]:w-full font-semibold px-9 shadow-inner">
            Stock
            <Image
              src="/icons/ui-box.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>

          {/*<SalesTab
               // onAddSale={() => {
                //  console.log("Add sale action triggered");
                 // console.log("Active tab:", activeTab);
                //}}
             // /> */}
        </div>
        {stockItems.length > 0 && (
          <div className="mb-2 max-[800px]:mb-4 max-[640px]:self-end gap-2 md:gap-0 flex items-center justify-center max-[1000px]:flex-row-reverse max-[800px]:w-full">
            <div className="relative max-[800px]:w-full mr-5 gap-2.5 md:gap-0">
              <input
                type="text"
                className="h-12 border w-[327px] max-[800px]:w-full rounded-md focus:outline-2 focus:outline-[#009A49] pl-10 text-lg placeholder:text-[#DEDEDE]"
                placeholder="Search by item name, SKU code"
                onChange={(event) => {
                  setIsSearching(true);
                  setSearchText(event.target.value);
                  if (!event.target.value) {
                    setIsSearching(false);
                  }
                }}
              />

              <Search
                className="text-[#667085] absolute top-3 left-3 text-lg"
                size={20}
              />
            </div>

            <div className="relative group inline-block">
              {/* Tooltip */}
              {!isPremium && stockItems.length >= 10 && (
                <div className="z-50 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md px-3 py-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Upgrade to Premium to add more.
                  <a href="/pricing" className="text-blue-400 underline ml-1 ">
                    Upgrade now
                  </a>
                </div>
              )}

              {/* Button */}
              <button
                onClick={openModal}
                className="text-[#2A2A2A] cursor-pointer bg-white py-3 border font-circular-normal border-[#1B1B1B] rounded-[12px] pr-6 pl-4 max-[400px]:text-sm text-nowrap max-[1000px]:hidden mr-2 disabled:opacity-50"
                disabled={!isPremium && stockItems.length >= 10}
              >
                + Add New Stock
              </button>
            </div>
            <button
              onClick={openModal}
              className="btn-primary max-[400px]:text-sm text-nowrap min-[1000px]:hidden ml-2"
            >
              +
            </button>

            <div className="z-10">
              <AddItemModal
                isOpen={isOpen}
                onClose={closeModal}
                onSave={(newItem) => {
                  setStockItems((prev) => [newItem, ...prev]); // Inserts new items at the top
                  closeModal();
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full overflow-hidden mx-auto">
        <div
          className={`border shadow-md rounded-b-lg rounded-bl-lg relative rounded-tr-lg flex-1 overflow-auto w-full transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-full max-w-[989px] mr-1" : "w-full"
          }`}
        >
          {stockItems.length === 0 ||
          (isSearching && filteredItems.length === 0) ? (
            <div className="relative w-full overflow-x-auto">
              <div className="min-w-[800px]">
                <Table className="bg-white border-0 border-collapse w-full">
                  <TableHeader>
                    <TableRow className="h-[50px]">
                      <TableHead className="text-[#090F1C] font-circular-medium text-center border-b border-r px-6 max-w-[198px]">
                        IMAGE
                      </TableHead>
                      <TableHead className="text-[#090F1C] font-circular-medium text-center border-b border-r px-6 max-w-[418px]">
                        ITEM NAME
                      </TableHead>

                      <TableHead className="text-[#090F1C] font-circular-medium text-center border-b border-r px-6 max-w-[280px]">
                        SELLING PRICE
                      </TableHead>
                      <TableHead className="text-[#090F1C] font-circular-medium text-center border-b border-r px-6 max-w-[198px]">
                        AVAILABLE
                      </TableHead>
                      <TableHead className="text-[#090F1C] font-circular-medium text-center border-b border-r px-6 max-w-[280px]">
                        ACTION
                      </TableHead>

                      <TableHead className="px-auto border-b max-w-[72px] text-center">
                        <Plus className="w-[16px] h-[16px] self-center items-center" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
                <div className="w-full overflow-x-auto">
                  <span className="w-full h-px bg-[#DEDEDE] block"></span>
                  <div className="relative h-[80vh] w-full">
                    {!(isSearching && filteredItems.length === 0) ? (
                      <div className="absolute space-y-4 right-0 left-0 top-28 w-56 mx-auto text-center">
                        <Image
                          src="/icons/empty-note-pad.svg"
                          alt=""
                          width={56}
                          height={56}
                          className="mx-auto"
                        />
                        <p className="text-[#888888] text-sm">
                          You have 0 items in stock
                        </p>
                        <button
                          type="button"
                          onClick={openModal}
                          className="btn-outline hover:cursor-pointer"
                        >
                          + Add New Stock
                        </button>
                        <AddItemModal
                          isOpen={isOpen}
                          onClose={closeModal}
                          onSave={(newItem) => {
                            setStockItems((prev) => [newItem, ...prev]);
                            closeModal();
                          }}
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-[#F8FAFB] border border-[#DEDEDE] w-[563px] h-[200px] rounded-lg flex flex-col items-center justify-center gap-3 max-[800px]:w-[343px] max-[800px]:h-[334px]">
                          <Image
                            src={box}
                            alt=""
                            width={56}
                            height={56}
                            className="size-8"
                          />
                          <p className="text-[#2A2A2A] text-sm">
                            Search Item not found.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <Table style={{ minWidth: "800px", borderCollapse: "collapse" }}>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="h-[50px]">
                      {headerGroup.headers.map((header) => {
                        let widthClass = "w-auto"; // Default width of the header columns

                        if (header.column.id === "name") {
                          widthClass =
                            showSales && showProfit
                              ? "max-w-[259px]"
                              : showSales
                              ? "max-w-[292px]"
                              : showProfit
                              ? "max-w-[292px]"
                              : "max-w-[374px] pl-4";
                        } else if (header.column.id === "sell_price") {
                          widthClass =
                            showSales && showProfit
                              ? "w-auto px-4"
                              : showSales || showProfit
                              ? "w-[262px]"
                              : "w-[280px]";
                        } else if (header.column.id === "available") {
                          widthClass =
                            showSales && showProfit
                              ? "w-auto px-4"
                              : showSales || showProfit
                              ? "w-[206px]"
                              : "w-[198px]";
                        } else if (header.column.id === "sales") {
                          widthClass = showSales ? "w-[30px]" : "w-auto ";
                        } else if (header.column.id === "profitGroup") {
                          widthClass = showProfit ? "w-[350px]" : "w-auto ";
                        }

                        return (
                          <TableHead
                            key={header.id}
                            className={`text-[#090F1C] font-circular-medium text-center border-b border-r min-w-[100px] 
    ${
      (showSales && !["name", "sales", "actions"].includes(header.id)) ||
      (showProfit && !["name", "profitGroup", "actions"].includes(header.id))
        ? "hidden sm:table-cell"
        : ""
    } ${widthClass}`}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {Array.from({ length: rowsPerPage }).map((_, index) => {
                    const row = table.getRowModel().rows[index] || null;
                    return (
                      <TableRow
                        key={index}
                        className="h-[50px] cursor-pointer"
                        onClick={(e) => {
                          // Check if the click originated from an editable cell
                          const target = e.target as HTMLElement;

                          // Don't trigger row click if:
                          // 1. We're currently editing
                          // 2. Click target is an input
                          // 3. Click target is inside a cell with the editable-cell class
                          // 4. Click target has a specific onClick handler
                          if (
                            effectiveEditedItem !== null ||
                            target instanceof HTMLInputElement ||
                            target.classList.contains("editable-cell") ||
                            target.closest(".editable-cell") ||
                            target.hasAttribute("data-editable")
                          ) {
                            return;
                          }

                          // Otherwise, handle the row click
                          row && handleRowClick(row.original);
                        }}
                      >
                        {row
                          ? row.getVisibleCells().map((cell) => {
                              let cellWidthClass = "w-auto"; // Default width

                              if (cell.column.id === "name") {
                                cellWidthClass =
                                  showSales && showProfit
                                    ? "w-[259px]"
                                    : showSales
                                    ? "w-[292px]"
                                    : showProfit
                                    ? "w-[292px]"
                                    : "w-[374px]";
                              } else if (
                                cell.column.id === "price" ||
                                cell.column.id === "available"
                              ) {
                                cellWidthClass =
                                  showSales && showProfit
                                    ? "w-auto px-4"
                                    : showSales || showProfit
                                    ? "w-[262px]"
                                    : "w-[280px]";
                              } else if (cell.column.id === "sales") {
                                cellWidthClass = showSales
                                  ? "w-[356px]"
                                  : "w-auto px-3";
                              } else if (cell.column.id === "profit") {
                                cellWidthClass = showProfit
                                  ? "w-[362px]"
                                  : "w-auto px-3";
                              }

                              return (
                                <TableCell
                                  key={cell.id}
                                  className={`p-0 py-0 align-middle h-[50px] text-center border-r ${
                                    (showSales &&
                                      !["name", "sales", "actions"].includes(
                                        cell.column.id
                                      )) ||
                                    (showProfit &&
                                      ![
                                        "name",
                                        "profitGroup",
                                        "actions",
                                      ].includes(cell.column.id))
                                      ? "hidden sm:table-cell"
                                      : ""
                                  } ${cellWidthClass}`}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              );
                            })
                          : columns.map((column) => (
                              <TableCell
                                key={column.id}
                                className="text-center border-r text-gray-400"
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
                    <TableCell colSpan={columns.length} className="">
                      <PaginationFeature
                        totalItems={
                          isSearching ? filteredItems.length : stockItems.length
                        }
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
            </div>
          )}
        </div>
        {isSidebarOpen && (
          <Sidebar
            key={selectedItem?.id + "-" + (selectedItem?.images?.length || 0)}
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            selectedItem={selectedItem}
            onSave={handleSaveEdit}
          />
        )}
        {/*Image Upload Modal */}
        {imageModalOpen && (
          <ImageUploader
            itemName={currentItem?.name || ""}
            existingImages={currentItem?.images || []}
            onSave={handleSaveImages}
            onCancel={() => setImageModalOpen(false)}
            isOpen={imageModalOpen}
          />
        )}
      </div>
    </div>
  );
}

export default TableContent;
