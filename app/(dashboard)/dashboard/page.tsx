"use client";

import { useEffect, useState,useCallback,useRef,useMemo } from "react";
import { ChevronDown, Edit, Loader2, MoreVertical, SaveAll, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import EditItemModal from "@/components/modal/edit-stock";
import AddItemModal from "@/components/modal/add-item";
import DeleteItem from "@/components/modal/delete-item";
import ImageUploader from "@/components/modal/add-image";
import PaginationFeature from "@/components/functional/paginationfeature";
import { useOrganization } from "@/app/api/useOrganization";
import { useStore } from "@/store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutConfirmModal from "@/components/modal/logoutConfirmationModal";
import Image from "next/image";
import Logo from "@/components/functional/logo";
import LoadingAnimation from "@/components/functional/loading";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import useTableAreaHeight from "./hooks/useTableAreaHeight";
import { deleteStock,GetProduct, GetStock } from "@/services/stock";
import { Search } from "lucide-react";
import box from "@/public/icons/box.svg";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { getAccessToken } from "@/app/api/token";
import Sidebar from "@/components/functional/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}
  export type StockItem = {
    id: string;
    name: string;
    buying_price: number;
    quantity: number;
    currency_code: string;
    sku?: string;
    buying_date?: string;
    product_id?: string;
    status?: string;
    user_id?: string;
    date_created?: string;
    original_quantity?: number;
    supplier?: null | any;
    timeslots?: any[];
    image?: { id: string; src: string } | null;
    images?: { id: string; src: string }[];
  };

export type ProductItem = {
    name: string;
  description: string;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: {};
  unavailable: false;
  // "unavailable_start": "2025-03-14T13:14:42.799Z"
  // "unavailable_end": "2025-03-14T13:14:42.799Z",
  status: string;
  id: string;
  parent_product_id: string;
  parent: string;
  organization_id: string;
  categories: [];
  date_created: string;
  last_updated: string;
  user_id: string;
  current_price: string;
  is_deleted: boolean;
  available_quantity: number;
  selling_price: number;
  discounted_price: number;
  buying_price: number;
  photos: [];
  attributes: {};
  };

const Page = () => {
  const { organizationId, organizationName, organizationInitial } =
    useStore();
   
  const { tableAreaRef, tableAreaHeight } = useTableAreaHeight();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [user, setUser] = useState<any>(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isEditingTransition, setIsEditingTransition] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<StockItem | null>(null);
  const [activeField, setActiveField] = useState<keyof StockItem | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const filteredItems = stockItems.filter((item) =>   
      item.name.toLowerCase().includes(searchText.toLowerCase()) || (item.sku && item.sku.toLowerCase().includes(searchText.toLowerCase()))         
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showSales, setShowSales] = useState(false);

const toggleSales = () => setShowSales((prev) => !prev);
  const [showProfit, setShowProfit] = useState(false);

const toggleProfit = () => setShowProfit((prev) => !prev);

  const router = useRouter();

  const totalItems = stockItems.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedItems = stockItems.slice(
    startIndex,
    Math.min(startIndex + rowsPerPage, totalItems)
  );

  const emptyRowsCount = Math.max(0, rowsPerPage - displayedItems.length);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<StockItem | null>(null);

  const handleImageClick = (item: StockItem) => {
    setCurrentItem(item);
    setImageModalOpen(true);
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

  useEffect(() => {
    setIsLoading(true);
    GetProduct()
    .then((data) => {
      setIsLoading(false);
      setProductItems(data.items.map((item: any) => ({
        ...item, 
      })));
        
      })
      .catch((error) => {
        console.error("Error fetching stock:", error);
      });
  }, [router]);
  
  useEffect(() => {
    if (productItems.length === 0) return; 
    setIsLoading(true);
  
    const fetchStocks = async () => {
      try {
        const stockData = await Promise.all(
          productItems.map((product) => GetStock(product.id))
        );
  
        const formattedStockItems = stockData.flatMap((data) =>
          data.items.map((stock: any) => {
           
            const matchingProduct = productItems.find(
              (product) => product.id === stock.product_id
            );
  
            return {
              ...stock,
              sku: matchingProduct?.unique_id,
            };
          })
        );
  
        setStockItems(formattedStockItems);
      } catch (error) {
        console.error("Error fetching stock:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchStocks();
  }, [productItems.length]); 

  const handleEditClick = (item: StockItem) => {
    setSelectedItem(item);
    setOpenEdit(true);
  };

  const handleSaveEdit = (updatedItem: StockItem) => {
    setStockItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    setSelectedItem({ ...updatedItem });
    setOpenEdit(false);
  };

  const handleDeleteClick = (item: StockItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
    setSelectedItem(null);
  };

  const closeAddModal = () => {
    setOpenAdd(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await deleteStock(itemId);
      setIsDeleteModalOpen(false);
      setStockItems((prev) => prev.filter((item) => item.product_id !== itemId));
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
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

  const handleInlineEdit = useCallback(
    (item: StockItem, field: keyof StockItem = "name") => {
      setIsEditingTransition(item.id);
      setEditedItem({ ...item });
      setActiveField(field);
      setIsEditingTransition(null);
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof StockItem, value: string) => {
      if (editedItem) {
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
    [editedItem]
  );

  const handleSaveInline = async () => {
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
  };

  useEffect(() => {
    if (editedItem && activeField) {
      switch (activeField) {
        case "name":
          nameInputRef.current?.focus();
          break;
        case "buying_price":
          priceInputRef.current?.focus();
          break;
        case "quantity":
          quantityInputRef.current?.focus();
          break;
      }
    }
  }, [editedItem, activeField]);

  const columns: ColumnDef<StockItem>[] = useMemo(
    () => [
     
      {
        accessorKey: "name",
        header: () => (
          <span className="font-medium text-[18px] leading-[28px] tracking-normal text-center pl-4">
            ITEM NAME
          </span>
        ),
        size: 200,
        maxSize: 200,
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;

          return (
            <div 
              className="w-full h-full flex items-center overflow-hidden"
              onClick={() => !isEditingThisRow && handleInlineEdit(row.original, "name")}
            >
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <input
                  ref={nameInputRef}
                  value={editedItem?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveInline()}
                  className="no-spinner w-full h-full min-w-0 border text-left box-border p-2 focus:outline-[#009A49]"
                />
              ) : (
                <span className="block text-balance py-2 pl-4">{row.original.name}</span>
              )}
            </div>
          );
        },
      },
      
      {
        accessorKey: "selling_price",
        header: () => (
          <span className="font-medium text-[18px] leading-[28px] tracking-normal text-center">
           SELLING PRICE
          </span>
        ),
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;

          return (
            <div
              className="flex w-full h-full items-center justify-center"
              onClick={() => !isEditingThisRow && handleInlineEdit(row.original, "buying_price")}
            >
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <input
                  ref={priceInputRef}
                  type="number"
                  value={editedItem?.buying_price ?? ""}
                  onChange={(e) => handleInputChange("buying_price", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveInline()}
                  className="no-spinner w-full h-full border text-center focus:outline-[#009A49]"
                />
              ) : (
                <span className="block w-full overflow-x-clip">{`${row.original.currency_code} ${row.original.buying_price?.toLocaleString()}`}</span>
                
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "available",
        header: () => (
          <span className="font-medium text-[18px] leading-[28px] tracking-normal text-center">
          AVAILABLE
          </span>
        ),
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;

          return (
            <div
              className="flex h-full w-full items-center justify-center"
              onClick={() => !isEditingThisRow && handleInlineEdit(row.original, "quantity")}
            >
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <input
                  ref={quantityInputRef}
                  type="number"
                  value={editedItem?.quantity ?? ""}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveInline()}
                  className="no-spinner w-full h-full border px-2 py-1 text-center focus:outline-[#009A49]"
                />
              ) : (
                row.original.quantity
              )}
            </div>
          );
        },
        meta: { className: "" },
      },
      {
      accessorKey: "sales",
      header: () =>
        showSales ? (
          <div className="bg-green-100 relative w-full h-full">
            {/* First Row: Title & Close Button */}
            <div className="flex justify-between items-center p-3">
              <span className="text-gray-700 font-semibold text-center w-full">
                SALES
              </span>
              <button
                onClick={toggleSales}
                className="p-1 border border-gray-400 rounded-md hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
     <Separator className="my-4" />
            {/* Second Row: Days of the Week */}
            <div className="grid grid-cols-5 gap-1 mt-2 text-center ">
              {["MON", "TUE", "WED", "THU", "FRI"].map((day) => (
                <span key={day} className="text-gray-700 font-medium w-full h-full border-r px-2 py-1 text-center">
                  {day}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={toggleSales}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-medium text-black w-full"
          >
            SHOW SALES
          </button>
        ),
      cell: ({ row }) =>
        showSales ? (
          <div className="grid grid-cols-5 h-full w-full">
            {["mon", "tue", "wed", "thu", "fri"].map((day) => (
              <input
                key={day}
                type="number"
                className="no-spinner w-full h-full border-r px-2 py-1 text-center focus:outline-[#009A49]"
              />
            ))}
          </div>
        ) : null,
      size: showSales ? 200 : 100, // Enlarge the column when sales are shown
    },
    {
      accessorKey: "profitGroup",
      header: () => (
        <div className="text-center w-full">
          {!showProfit && (
            <button
              onClick={toggleProfit}
              className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-medium text-black w-full"
            >
              SHOW PROFIT
            </button>
          )}
          {showProfit && (
            <div className="bg-blue-100 p-3 relative inline-block w-full h-full">
              {/* Header Row: PROFIT */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold w-full text-center">PROFIT</span>
                <button
                  onClick={toggleProfit}
                  className="p-1 border border-gray-400 w-2 h-1 rounded-md hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
     <Separator className="my-4 text-red-900" />
              {/* COST PRICE & PROFIT Inputs (Inside Same Cell) */}
              <div className="grid grid-cols-2 border-t">
                <div className="text-gray-700 font-medium  border-r text-center">COST PRICE</div>
                <div className="text-gray-700 font-medium  text-center">PROFIT</div>
              </div>
            </div>
          )}
        </div>
      ),
      cell: ({ row, column }) => {
        const costPrice = row.getValue("costPrice") || "";
        const profit = row.getValue("profit") || "";
    
        return showProfit ? (
          <div className="flex items-center justify-between w-full h-full">
            {/* Editable Cost Price */}
            <input
              type="number"
              onBlur={(e) =>
                column.columnDef.meta?.updateData(row.index, "costPrice", e.target.value)
              }
              className="w-1/2 px-2 py-1 border-r border-gray-300 h-full text-center"
              placeholder="CP"
            />
            
            {/* Editable Profit */}
            <input
              type="number"
              onBlur={(e) =>
                column.columnDef.meta?.updateData(row.index, "profit", e.target.value)
              }
              className="w-1/2 px-2 py-1 border-gray-300 h-full text-center"
              placeholder="Profit"
            />
          </div>
        ) : null;
      },
      size: showProfit ? 200 : 100, // Enlarge the column when profit is shown
      meta: { updateData: (rowIndex: number, key: string, value: string) => {} },
    },
      
      
    {
      id: "actions",
      header: () => (
        <div className="flex justify-center items-center">
          <Plus className="w-5 h-5 text-black" />
        </div>
      ),
      cell: () => null, // Empty cell
      // size: 8, // Make the column small
      // meta: { className: "w-2" },
    },

      // {
      //   id: "actions",
      //   header: "ACTION",
      //   cell: ({ row }) => {
      //     const item = row.original;
      //     const isEditingThisRow = editedItem?.id === item.id;
      //     const isTransitioning = isEditingTransition === row.original.id;
      //     return (
      //       <div className="inline-block w-[calc(100%-2rem)] max-w-[60px]">
      //         {isTransitioning ? (
      //           <Loader2 className="w-4 h-4 animate-spin mx-auto" />
      //         ) : isEditingThisRow ? (
      //           <div className="flex justify-center items-center gap-2 cursor-pointer"
      //           onClick={handleSaveInline}>
      //             <div className="flex justify-center items-center gap-2 text-[20px]">
      //               <SaveAll
      //                 className="cursor-pointer text-black w-[16px] h-[16px]"                      
      //               />
      //             </div>
      //             <p>Save</p>
      //           </div>
      //         ) : (
      //           <div className="flex justify-center items-center gap-2">
      //             <div className="flex items-center border-r border-[#DEDEDE] pr-2">
      //               <Edit
      //                 className="cursor-pointer text-[#19A45B] w-[20px] h-[20px] hover:text-[#137e41]"
      //                 onClick={() => handleInlineEdit(item)}
      //               />
      //             </div>
      //             <Trash2
      //               className="cursor-pointer text-red-500 w-[20px] h-[20px] hover:text-red-700"
      //               onClick={() => handleDeleteClick(item)}
      //             />
      //           </div>
      //         )}
      //       </div>
      //     );
      //   },
      //   meta: { className: "" },
      // },
    ],
    [editedItem, isEditingTransition, handleInlineEdit, handleSaveInline]
  );
  const paginatedData = isSearching
  ? filteredItems.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  : stockItems.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  const handleRowClick = (item: StockItem) => {
    setSelectedItem(item);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <main className="px-6 py-4 w-full max-w-7xl mx-auto flex flex-col main-h-svh ">
      <div ref={tableAreaRef} className="space-y-8 w-full h-full ">
        <LogoutConfirmModal
          open={isLogoutModalOpen}
          onOpenChange={setIsLogoutModalOpen}
          onCancel={() => setIsLogoutModalOpen(false)}
        />

        <DeleteItem
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteItem}
          selectedItem={selectedItem ? { product_id: selectedItem.product_id ?? "" } : undefined}
        />
        <div className="lg:border px-4 py-2 lg:shadow-md rounded-lg lg:flex items-center justify-between mx-auto">
          <div className="flex items-center gap-6">
            <div className="flex justify-center lg:justify-start w-full lg:w-auto">
              <Logo />
            </div>
            <small className="text-black text-left hidden lg:block">
              The simplest way to manage your shop!
            </small>
          </div>
          <div className="">
            <DropdownMenu modal>
            <DropdownMenuTrigger
                disabled
                className="btn-primary hover:cursor-pointer hidden lg:flex items-center gap-2 text-white"
              >
                <span className="py-2 px-4 rounded-lg bg-white text-black">
                  {organizationInitial}
                </span>
                {organizationName}
                <ChevronDown strokeWidth={1.5} color="white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="w-full px-[5rem]"
                  onClick={() => setIsLogoutModalOpen(true)}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-0 w-full ">
          <div className="w-full flex justify-between max-[800px]:flex-col-reverse">
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

            {stockItems.length > 0 && (
              <div className="mb-2 max-[800px]:mb-4 max-[640px]:self-end flex items-center justify-center max-[1000px]:flex-row-reverse max-[800px]:w-full">
                <button
                  onClick={openModal}
                  className="btn-primary max-[400px]:text-sm text-nowrap max-[1000px]:hidden mr-2"
                >
                  + Add New
                </button>
                <button
                  onClick={openModal}
                  className="btn-primary max-[400px]:text-sm text-nowrap min-[1000px]:hidden ml-2"
                >
                  +
                </button>

              <div className="relative max-[800px]:w-full">
                <input type="text" 
                className="h-12 border w-[327px] max-[800px]:w-full rounded-md focus:outline-2 focus:outline-[#009A49] px-10"
                onChange={(event)=>{
                  setIsSearching(true);
                  setSearchText(event.target.value);
                  if(!event.target.value){
                    setIsSearching(false);
                  }
                }}/>

                <Search className="text-[#667085] absolute top-3 left-3 " />
              </div>

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
            <div className={`border shadow-md rounded-b-lg rounded-bl-lg relative rounded-tr-lg flex-1 overflow-auto w-full transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "w-full max-w-[989px] mr-1" : "w-full"
            }`}>
            {(stockItems.length === 0 || (isSearching && filteredItems.length === 0)) ? (
                <div className="relative">
                  <Table>
                    <TableHeader>
                      <TableRow className="h-[50px]">
                        <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-2/7 min-w-[120px] max-[400px]:w-1/3 max-[400px]:px-1 text-left border-b border-r">
                          ITEM NAME
                        </TableHead>
                        <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/7 min-w-[120px] max-[400px]:w-1/3 max-[400px]:px-1 text-center border-b border-r">
                         SELLING PRICE
                        </TableHead>
                        <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/7 min-w-[120px] max-[400px]:w-1/3 max-[400px]:px-1 text-center border-b border-r">
                        AVALABLE
                        </TableHead>
                        <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/7 min-w-[120px] text-center border-b border-r ">
                          SHOW SALES
                        </TableHead>
                        <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/7 min-w-[120px] text-center border-b ">
                          SHOW PROFIT
                        </TableHead>
                        <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/7 min-w-[120px] text-center border-b ">
          <Plus className="w-5 h-5 text-black" />
                          
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
                ) : (
              <>
                {/* <Table className="border-collapse border-b min-w-[590px] table-fixed">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className="h-[50px]">
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className={`text-[#090F1C] font-circular-medium text-center border-b border-r min-w-[100px] ${
                              header.column.id === "name" ? "text-left w-2/7 max-[750px]:w-1/7" : "w-1/7"
                            } ${header.column.columnDef.meta?.className || ""}`}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>        
                  <TableBody>
                    {Array.from({ length: rowsPerPage }).map((_, index) => {
                      const row = table.getRowModel().rows[index] || null; 
                      return (
                        <TableRow key={index} className="h-[50px] cursor-pointer" onClick={() => row && handleRowClick(row.original)}>
                          {row
                            ? row.getVisibleCells().map((cell) => (
                                <TableCell
                                  key={cell.id}
                                  className={`p-0 py-0 align-middle h-[50px] text-center border-r ${
                                    cell.column.id === "name" ? "text-left overflow-hidden" : ""
                                  } ${cell.column.columnDef.meta?.className || ""}`}
                                >
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                              ))
                            : columns.map((column) => (
                                <TableCell key={column.id} className="text-center border-r text-gray-400">
                                  {""} 
                                </TableCell>
                              ))}
                        </TableRow>
                      );
                    })}

                  </TableBody>
                </Table> */}
                <div style={{ overflowX: 'auto' }}>
  <Table style={{ minWidth: '800px', borderCollapse: 'collapse' }}>
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="h-[50px]">
          {headerGroup.headers.map((header) => (
           <TableHead
  key={header.id}
  className={`text-[#090F1C] font-circular-medium text-center border-b border-r 
    ${header.column.id === "name" ? "text-left w-1/7 max-[750px]:w-1/7" : "w-1/7"} 
    ${header.column.id === "actions" ? "w-[5px]" : "w-[5px]"} 
    ${header.column.columnDef.meta?.className || ""}`
  }
>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>        
    <TableBody>
      {Array.from({ length: rowsPerPage }).map((_, index) => {
        const row = table.getRowModel().rows[index] || null; 
        return (
          <TableRow key={index} className="h-[50px] cursor-pointer" onClick={() => row && handleRowClick(row.original)}>
            {row
              ? row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`p-0 py-0 align-middle h-[50px] text-center border-r ${
                      cell.column.id === "name" ? "text-left overflow-hidden" : ""
                    } ${cell.column.columnDef.meta?.className || ""}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))
              : columns.map((column) => (
                  <TableCell key={column.id} className="text-center border-r text-gray-400">
                    {""} 
                  </TableCell>
                ))}
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</div>

                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={columns.length} className="">
                        <PaginationFeature
                          totalItems={isSearching ? filteredItems.length : stockItems.length}
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
              {isSidebarOpen && (
              <Sidebar
                key={
                  selectedItem?.id + "-" + (selectedItem?.images?.length || 0)
                }
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
      </div>

      <EditItemModal
        isOpen={openEdit}
        onClose={closeEditModal}
        item={selectedItem!}
        onSave={handleSaveEdit}
      />

      <div className="flex flex-col gap-2 mt-4">
        <p className="text-center mt-4">
          © {new Date().getFullYear()}, Powered by Timbu Business
        </p>
      </div>
    </main>
  );
};

export default Page;