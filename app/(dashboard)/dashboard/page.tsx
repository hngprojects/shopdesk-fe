"use client";

import { useEffect, useState,useCallback,useRef,useMemo } from "react";
import { ChevronDown, Edit, Loader2, MoreVertical, SaveAll, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import EditItemModal from "@/components/modal/edit-stock";
import AddItemModal from "@/components/modal/add-item";
import DeleteItem from "@/components/modal/delete-item";
import PaginationFeature from "@/components/functional/paginationfeature";
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
import { deleteStock, GetStock } from "@/services/stock";
import { Search } from "lucide-react";
import box from "@/public/icons/box.svg";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { getAccessToken } from "@/app/api/token";

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
  };

const Page = () => {

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
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isEditingTransition, setIsEditingTransition] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<StockItem | null>(null);
  const [activeField, setActiveField] = useState<keyof StockItem | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const searchedItems = stockItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()))

  const filteredItems = stockItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const totalItems = stockItems.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

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

  useEffect(() => {
    setIsLoading(true);
    GetStock()
    .then((data) => {
      setStockItems(data.items.map((item: any) => ({
        ...item,
        sku: item.id.slice(0,8).toUpperCase() || "N/A", 
      })));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stock:", error);
        setIsLoading(false);
      });
  }, [router]);

  const handleEditClick = (item: StockItem) => {
    setSelectedItem(item); 
    setOpenEdit(true); 
  };

  const handleSaveEdit = (updatedItem: StockItem) => {
    setStockItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

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
      setStockItems((prev) => prev.filter((item) => item.id !== itemId));
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

  const handleInlineEdit = useCallback((item: StockItem, field: keyof StockItem = "name") => {
    setIsEditingTransition(item.id); 
    setEditedItem({ ...item });
    setActiveField(field);
    setIsEditingTransition(null); 
  }, []);
  
  const handleInputChange = useCallback(
    (field: keyof StockItem, value: string) => {
      if (editedItem) {
        setEditedItem((prev) => ({
          ...prev!,
          [field]: field === "quantity" || field === "buying_price" ? Number(value) : value,
        }));
        setActiveField(field);
      }
    },
    [editedItem]
  );

  const handleSaveInline = async () => {
    if (!editedItem) return;
  
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
        header: "ITEM NAME",
        size: 200,
        maxSize: 200,
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;

          return (
            <div className="inline-block w-full overflow-hidden">
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <input
                  ref={nameInputRef}
                  value={editedItem?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveInline()}
                  className="w-full min-w-0 border rounded px-2 py-1 text-left box-border"
                />
              ) : (
                <span className="block text-balance">{row.original.name}</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;
      
          return (
            <div className="inline-block w-full overflow-hidden">
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <span className="block truncate">{row.original.id.slice(0, 8).toUpperCase()}</span>
              ) :(
                <span className="block truncate">{row.original.sku}</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "buying_price",
        header: "PRICE",
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;

          return (
            <div
              className="inline-block w-full max-w-[100px]"
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
                  className="w-full border rounded px-2 py-1 text-center"
                />
              ) : (
                <span className="block w-full overflow-x-clip">{`${row.original.currency_code} ${row.original.buying_price?.toLocaleString()}`}</span>
                
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "quantity",
        header: "QUANTITY",
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;

          return (
            <div
              className="inline-block w-[calc(100%-2rem)] max-w-[60px]"
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
                  className="w-full border rounded px-2 py-1 text-center"
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
        id: "actions",
        header: "ACTION",
        cell: ({ row }) => {
          const item = row.original;
          const isEditingThisRow = editedItem?.id === item.id;
          const isTransitioning = isEditingTransition === row.original.id;
          return (
            <div className="inline-block w-[calc(100%-2rem)] max-w-[60px]">
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <div className="flex justify-center items-center gap-2 cursor-pointer"
                onClick={handleSaveInline}>
                  <div className="flex justify-center items-center gap-2 text-[20px]">
                    <SaveAll
                      className="cursor-pointer text-black w-[16px] h-[16px]"                      
                    />
                  </div>
                  <p>Save</p>                
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <div className="flex items-center border-r border-[#DEDEDE] pr-2">
                    <Edit
                      className="cursor-pointer text-[#19A45B] w-[20px] h-[20px] hover:text-[#137e41]"
                      onClick={() => handleInlineEdit(item)}
                    />
                  </div>
                  <Trash2
                    className="cursor-pointer text-red-500 w-[20px] h-[20px] hover:text-red-700"
                    onClick={() => handleDeleteClick(item)}
                  />
                </div>
              )}
            </div>
          );
        },
        meta: { className: "" },
      },
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
          selectedItem={selectedItem || undefined}
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
              <DropdownMenuTrigger disabled className="btn-primary hover:cursor-pointer hidden lg:flex items-center gap-2 text-white">
                <span className="py-2 px-4 rounded-lg bg-white text-black">
                  SL
                </span>
                Sodiq LTD<ChevronDown strokeWidth={1.5} color="white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="w-full px-[5rem] hidden"
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
          <div className="border shadow-md rounded-b-lg rounded-bl-lg relative rounded-tr-lg flex-1 overflow-auto w-full">
          {(stockItems.length === 0 || (isSearching && searchedItems.length === 0)) ? (
              <div className="relative">
                <Table>
                  <TableHeader>
                    <TableRow className="h-[50px]">
                      <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-2/7 min-w-[120px] max-[400px]:w-1/3 max-[400px]:px-1 text-left border-b border-r">
                        ITEM NAME
                      </TableHead>
                      <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/7 min-w-[120px] max-[400px]:w-1/3 max-[400px]:px-1 text-center border-b border-r">
                        SKU CODE
                      </TableHead>
                      <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/7 min-w-[120px] max-[400px]:w-1/3 max-[400px]:px-1 text-center border-b border-r">
                        PRICE
                      </TableHead>
                      <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/7 min-w-[120px] text-center border-b border-r ">
                        QUANTITY
                      </TableHead>
                      <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-1/7 min-w-[120px] text-center border-b ">
                        ACTION
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
                <div className="w-full overflow-x-auto">                  
                  <span className="w-full h-px bg-[#DEDEDE] block"></span>
                  <div className="relative h-[80vh] w-full">
                    {!(isSearching && searchedItems.length === 0)?(<div className="absolute space-y-4 right-0 left-0 top-28 w-56 mx-auto text-center">
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
                    </div>):(
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-[#F8FAFB] border border-[#DEDEDE] w-[563px] h-[200px] rounded-lg flex flex-col items-center justify-center gap-3 max-[800px]:w-[343px] max-[800px]:h-[334px]">
                          <Image
                            src={box}
                            alt=""
                            width={56}
                            height={56}
                            className="size-8"
                          />

                          <p className="text-[#2A2A2A] text-sm">Search Item not found.</p>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
              <Table className="border-collapse border-b min-w-[590px] table-fixed">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="h-[50px]">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={`text-[#090F1C] font-circular-medium px-4 py-2 text-center border-b border-r min-w-[100px] ${
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
    const row = table.getRowModel().rows[index] || null; // Get row or null if not available

    return (
      <TableRow key={index} className="h-[50px]">
        {row
          ? row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={`px-4 py-3 text-center border-r ${
                  cell.column.id === "name" ? "text-left overflow-hidden" : ""
                } ${cell.column.columnDef.meta?.className || ""}`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))
          : columns.map((column) => (
              <TableCell key={column.id} className="px-4 py-3 text-center border-r text-gray-400">
                {""} {/* Placeholder for missing row */}
              </TableCell>
            ))}
      </TableRow>
    );
  })}
  
  {/* Pagination */}

</TableBody>
            </Table>
     <Table>
<TableBody>
  <TableRow>
    <TableCell colSpan={columns.length} className="py-4">
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
        </div>
      </div>

      {/* <EditItemModal
        isOpen={openEdit}
        onClose={closeEditModal}
        item={selectedItem!}
        onSave={handleSaveEdit}
      /> */}

      <div className="flex flex-col gap-2 mt-4">
        <p className="text-center mt-4">
          © {new Date().getFullYear()}, Powered by Timbu Business
        </p>
      </div>
    </main>
  );
};

export default Page;