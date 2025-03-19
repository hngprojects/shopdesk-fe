"use client";

import { useEffect, useState,useCallback,useRef,useMemo } from "react";
import { ChevronDown, Edit, Loader2, MoreVertical, SaveAll, Trash2 } from "lucide-react";
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
import { Menu, X} from "lucide-react";
import box from "@/public/icons/box.svg";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { getAccessToken } from "@/app/api/token";
import Sidebar from "@/components/functional/sidebar";
import SalesTab from "@/components/functional/salestab";

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

  //Active Tab
  const [activeTab, setActiveTab] = useState("stock");

  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [user, setUser] = useState<any>(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
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
  let isMounted = true; // Prevents state updates if component unmounts
  setIsLoading(true);

  const fetchProductsAndStocks = async () => {
    try {
      // Fetch products
      const productData: any = await GetProduct();
      if (!isMounted) return; // Prevent state update if unmounted
      setProductItems(productData.items);

      // Fetch stock for each product
      const stockData = await Promise.all(
        productData.items.map((product: any) => GetStock(product.id))
      );

      if (!isMounted) return;
      const formattedStockItems = stockData.flatMap((data, index) =>
        data.items.map((stock: any) => ({
          ...stock,
          sku: productData.items[index]?.unique_id, 
        }))
      );

      setStockItems(formattedStockItems);
    } catch (error) {
      console.error("Error fetching products or stocks:", error);
    } finally {
      if (isMounted) setIsLoading(false);
    }
  };

  fetchProductsAndStocks();

  return () => {
    isMounted = false;
  };
}, [router]);


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
        accessorKey: "image",
        header: "IMAGE",
        size: 80,
        cell: ({ row }) => {
          const item = row.original;
          const hasImage =
            item.image || (item.images && item.images.length > 0);

          return (
            <div className="flex items-center justify-center">
              {hasImage ? (
                <div
                  className="w-10 h-10 relative cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(item);
                  }}
                >
                  <img
                    src={
                      item.image?.src || (item.images && item.images[0]?.src)
                    }
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(item);
                  }}
                  className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400 hover:bg-gray-200"
                >
                  <span className="text-xs">
                    <Image 
                    src="/icons/column-img.svg"
                    alt="Add Image"
                    width={20}
                    height={20}
                    />
                  </span>
                </button>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "name",
        header: "ITEM NAME",
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
                <span className="block text-wrap p-2">{row.original.name}</span>
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
        accessorKey: "quantity",
        header: "QUANTITY",
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
    [editedItem, isEditingTransition]
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
    if (selectedItem?.id === item.id && isSidebarOpen) return; 
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
          organizationName={organizationName}
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
        <div className="lg:border px-4 py-2 shadow-md rounded-lg lg:flex items-center justify-between mx-auto">
          <div className="flex items-center gap-6 p-2">
            <div className="flex justify-start w-full lg:w-auto">
              <Logo />
            </div>
            <small className="text-black text-left hidden lg:block">
              The simplest way to manage your shop!
            </small>
            <button onClick={toggleNavbar} className="lg:hidden hover:cursor-pointer">
              <Menu strokeWidth={1.5} color="#667085" />
            </button>
          </div>

           {/* Mobile Slide-In Navbar */}
          <div
          className={`fixed inset-y-0 right-0 w-full sm:w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden z-2 ${
            isNavbarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Flex container for dropdown and close button */}
            <div className="flex items-center justify-between p-4">
              {/* Dropdown Menu */}
              <DropdownMenu modal>
                <DropdownMenuTrigger
                  className="btn-primary hover:cursor-pointer flex items-center gap-2 text-white max-w-56"
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

              {/* Close Button */}
              <button onClick={closeNavbar} className="hover:cursor-pointer">
                <X strokeWidth={1.5} color="black" />
              </button>
            </div>
        </div>
          

          {/* Desktop dropdown */}
          <div className="hidden lg:block">
            <DropdownMenu modal>
            <DropdownMenuTrigger
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
                  onClick={() => {
                    setIsLogoutModalOpen(true);}}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-0 w-full ">
        <div className="w-full flex justify-between max-[800px]:flex-col-reverse">
        <div className="flex">
              <div
                className={`flex items-center justify-center gap-2 rounded-tl-lg border-x-2 border-t-2 border-gray-100 px-4 py-3 ${
                  activeTab === "stock" ? "bg-white" : "bg-gray-100"
                }`}
                onClick={() => setActiveTab("stock")}
                role="button"
                style={{ cursor: "pointer", width: "160px" }}
              >
                <span
                  className={
                    activeTab === "stock" 
                    ? "text-black bg-white" 
                    : "bg-gray-100 text-gray-400"
                  }
                >
                  Stock
                </span>
                <Image
                  src={activeTab === "stock" ? "/icons/ui-box.svg" : "/icons/ui-box-grey.svg"}
                  alt=""
                  width={16}
                  height={16}
                  className="w-5 h-5"
                />
              </div>

              <div
                className={`flex items-center justify-center gap-2 border-x-2 border-t-2 border-gray-100 px-4 py-3 rounded-tr-lg ${
                  activeTab === "sales" ? "bg-white" : "bg-gray-100"
                }`}
                onClick={() => setActiveTab("sales")}
                role="button"
                style={{ cursor:"pointer", width: "160px" }}
              >
                <span
                  className={
                    activeTab === "sales" ? 
                    "text-black bg-white" 
                    : "text-gray-400 bg-gray-100"
                  }
                >
                  Sales
                </span>
                <Image
                  src={activeTab === "sales" ? "/icons/sale-tab.svg" : "/icons/sale-tab-grey.svg"}
                  alt=""
                  width={16}
                  height={16}
                  className="w-5 h-5"
                />
              </div>
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
                placeholder="Search by item name, SKU code"
                onChange={(event)=>{
                  setIsSearching(true);
                  setSearchText(event.target.value);
                  if(!event.target.value){
                    setIsSearching(false);
                  }
                }}/>

                <img
                   src='/icons/search_Icon.svg'
                   alt="Search Icon"
                   className="absolute top-3 left-3 w-5 h-5"
                 />

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
          <div className="flex w-full overflow-hidden mx-auto gap-4">
          {activeTab === "stock" ? (
            <div
              className={`border shadow-md rounded-b-lg rounded-bl-lg relative rounded-tr-lg flex-1 overflow-auto w-full transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "w-full max-w-[989px]" : "w-full"
              }`}
            >
              {stockItems.length === 0 ||
              (isSearching && filteredItems.length === 0) ? (
                <div className="relative">
                  <Table>
                    <TableHeader>
                      <TableRow className="h-[50px]">
                        <TableHead className="text-[#090F1C] font-circular-medium px-4 py-2 w-2/7 min-w-[120px] max-[400px]:w-1/3 max-[400px]:px-1 text-left border-b border-r">
                          ITEM NAME
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
                  <Table className="border-collapse border-b min-w-[590px] table-fixed">
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="h-[50px]">
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className={`text-[#090F1C] font-circular-medium px-4 py-2 text-center border-b border-r min-w-[100px] ${
                                header.column.id === "name"
                                  ? "text-left w-2/7 max-[750px]:w-1/7"
                                  : "w-1/7"
                              } ${
                                header.column.columnDef.meta?.className || ""
                              }`}
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
  const row = table.getRowModel().rows[index] || null;

  return (
    <TableRow
      key={row?.id || `row-placeholder-${index}`} 
      className="h-[50px] cursor-pointer"
      onClick={() => row && handleRowClick(row.original)}
    >
      {row
        ? row.getVisibleCells().map((cell, cellIndex) => (
            <TableCell
              key={`${row.id}-cell-${cellIndex}`}
              className={`px-4 py-3 text-center border-r ${
                cell.column.id === "name" ? "text-left overflow-hidden" : ""
              } ${cell.column.columnDef.meta?.className || ""}`}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))
        : columns.map((column, columnIndex) => (
            <TableCell
              key={`placeholder-cell-${columnIndex}`} 
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
           ) : (
              <SalesTab
                onAddSale={() => {
                  console.log("Add sale action triggered");
                  console.log("Active tab:", activeTab);
                }}
              />
            )}
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
