'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import {
  ChevronDown,
  Edit,
  Loader2,
  MoreVertical,
  SaveAll,
  Trash2,
  Plus,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import EditItemModal from '@/components/modal/edit-stock';
import AddItemModal from '@/components/modal/add-item';
import DeleteItem from '@/components/modal/delete-item';
import ImageUploader from '@/components/modal/add-image';
import PaginationFeature from '@/components/functional/paginationfeature';
import { useOrganization } from '@/app/api/useOrganization';
import { useStore } from '@/store/useStore';
import { FaSortDown } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutConfirmModal from '@/components/modal/logoutConfirmationModal';
import Image from 'next/image';
import Logo from '@/components/functional/logo';
import LoadingAnimation from '@/components/functional/loading';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import useTableAreaHeight from './hooks/useTableAreaHeight';
import { deleteStock, GetProduct, GetStock } from '@/services/stock';
import { Search } from 'lucide-react';
import box from '@/public/icons/box.svg';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { getAccessToken } from '@/app/api/token';
import Sidebar from '@/components/functional/sidebar';

import { Separator } from '@radix-ui/react-dropdown-menu';

import SalesTab from '@/components/functional/salestab';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string;
    updateData?: (rowIndex: number, key: string, value: string) => void;
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
  const { organizationId, organizationName, organizationInitial } = useStore();

  const { tableAreaRef, tableAreaHeight } = useTableAreaHeight();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  //Active Tab
  const [activeTab, setActiveTab] = useState('stock');

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
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isEditingTransition, setIsEditingTransition] = useState<string | null>(
    null
  );
  const [editedItem, setEditedItem] = useState<StockItem | null>(null);
  const [activeField, setActiveField] = useState<keyof StockItem | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const filteredItems = stockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.sku && item.sku.toLowerCase().includes(searchText.toLowerCase()))
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showSales, setShowSales] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showProfit, setShowProfit] = useState(false);

  const toggleSales = () => {
    if (isSidebarOpen) {
      alert('First close the sidebar to view Sales.');
      return;
    }
    setShowSales((prev) => !prev);
  };

  const toggleProfit = () => {
    if (isSidebarOpen) {
      alert('First close the sidebar to view Profit.');
      return;
    }
    setShowProfit((prev) => !prev);
  };

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

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<StockItem | null>(null);
  const [isPremium, setIsPremium] = useState(false);

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
        console.error('Error fetching products or stocks:', error);
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
      setStockItems((prev) =>
        prev.filter((item) => item.product_id !== itemId)
      );
    } catch (error) {
      console.error('Error deleting stock:', error);
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
    (item: StockItem, field: keyof StockItem = 'name') => {
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
            field === 'quantity' || field === 'buying_price'
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

      const response = await fetch('/api/stocks/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
        throw new Error('Failed to update stock item');
      }

      setStockItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editedItem.id ? { ...item, ...editedItem } : item
        )
      );

      setEditedItem(null);
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsEditingTransition(null);
    }
  };

  useEffect(() => {
    if (organizationId === '160db8736a9d47989381e01a987e4413') {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
  }, []);

  // if (organizationId !== "160db8736a9d47989381e01a987e4413" &&  stockItems.length >= 10){
  //   setIsPremium(false)
  // }

  useEffect(() => {
    if (editedItem && activeField) {
      switch (activeField) {
        case 'name':
          nameInputRef.current?.focus();
          break;
        case 'buying_price':
          priceInputRef.current?.focus();
          break;
        case 'quantity':
          quantityInputRef.current?.focus();
          break;
      }
    }
  }, [editedItem, activeField]);

  const columns: ColumnDef<StockItem>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: () => (
          <span className='!px-4 flex flex-start font-circular-medium  text-[18px] leading-[28px] tracking-normal text-center  w-full'>
            ITEM NAME
          </span>
        ),
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;

          return (
            <div
              className='w-full h-full flex items-center overflow-hidden'
              onClick={() =>
                !isEditingThisRow && handleInlineEdit(row.original, 'name')
              }
            >
              {isTransitioning ? (
                <Loader2 className='w-4 h-4 animate-spin mx-auto' />
              ) : isEditingThisRow ? (
                <input
                  ref={nameInputRef}
                  value={editedItem?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveInline()}
                  className='no-spinner w-full h-full min-w-0 border text-left box-border p-2 focus:outline-[#009A49]'
                />
              ) : (
                <span className='block text-balance py-2 pl-4'>
                  {row.original.name}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'sell_price',
        header: () => (
          <span className='!px-4 font-circular-medium text-[18px] leading-[28px] tracking-normal text-center'>
            SELL PRICE
          </span>
        ),
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;

          return (
            <div
              className='flex w-full h-full items-center justify-center'
              onClick={() =>
                !isEditingThisRow &&
                handleInlineEdit(row.original, 'buying_price')
              }
            >
              {isTransitioning ? (
                <Loader2 className='w-4 h-4 animate-spin mx-auto' />
              ) : isEditingThisRow ? (
                <input
                  ref={priceInputRef}
                  type='number'
                  value={editedItem?.buying_price ?? ''}
                  onChange={(e) =>
                    handleInputChange('buying_price', e.target.value)
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveInline()}
                  className='no-spinner w-full h-full border text-center focus:outline-[#009A49]'
                />
              ) : (
                <span className='block w-full overflow-x-clip'>{`${
                  row.original.currency_code
                } ${row.original.buying_price?.toLocaleString()}`}</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'available',
        header: () => (
          <span className='!px-4 font-circular-medium text-[18px] leading-[28px] tracking-normal text-center'>
            AVAILABLE
          </span>
        ),
        cell: ({ row }) => {
          const isEditingThisRow = editedItem?.id === row.original.id;
          const isTransitioning = isEditingTransition === row.original.id;

          return (
            <div
              className='flex h-full w-full items-center justify-center'
              onClick={() =>
                !isEditingThisRow && handleInlineEdit(row.original, 'quantity')
              }
            >
              {isTransitioning ? (
                <Loader2 className='w-4 h-4 animate-spin mx-auto' />
              ) : isEditingThisRow ? (
                <input
                  ref={quantityInputRef}
                  type='number'
                  value={editedItem?.quantity ?? ''}
                  onChange={(e) =>
                    handleInputChange('quantity', e.target.value)
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveInline()}
                  className='no-spinner w-full h-full border px-2 py-1 text-center focus:outline-[#009A49]'
                />
              ) : (
                row.original.quantity
              )}
            </div>
          );
        },
        meta: { className: '' },
      },
      {
        accessorKey: 'sales',
        header: () =>
          showSales ? (
            <div className='bg-[#CCEBDB] relative w-full h-full'>
              <div className='flex justify-between items-center max-w-[356px] py-4'>
                <span className='text-[#595959] font-circular-medium text-[14px] text-center w-full'>
                  SALES
                </span>
                <button
                  onClick={toggleSales}
                  className='rounded-[6px] border border-green-200 hover:bg-gray-200'
                >
                  <X className='rounded-[6px] py-[4px] px-[8px] bg-white w-full h-full' />
                </button>
              </div>

              <div className='grid grid-cols-5 text-center border-t border-[#B2E1C8]'>
                {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, index) => (
                  <div
                    key={day}
                    className={`flex items-center justify-center text-[12px] gap-1 text-gray-700 font-circular-medium py-[9px] ${
                      index !== 4 ? 'border-r border-[#B2E1C8]' : ''
                    }`}
                  >
                    {day}
                    <FaSortDown className='w-[13px] h-[13px] text-[#83838B] mb-1' />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center w-full p-4'>
              <button
                onClick={toggleSales}
                className='bg-[#F6F8FA] border border-[#DEE5ED] rounded-[6px] font-circular-medium text-[#090F1C] py-2 px-4'
              >
                SHOW SALES
              </button>
            </div>
          ),
        cell: ({ row }) =>
          showSales ? (
            <div className='grid grid-cols-5 h-full w-full px-0'>
              {['mon', 'tue', 'wed', 'thu', 'fri'].map((day) => (
                <input
                  key={day}
                  type='number'
                  className='no-spinner w-full h-full border-r px-2 py-1 text-center focus:outline-[#009A49]'
                />
              ))}
            </div>
          ) : null,
      },
      {
        accessorKey: 'profitGroup',
        header: () =>
          showProfit ? (
            <div className='relative w-full h-full border border-[#CCEAFF]'>
              <div className='bg-[#E5F4FF] flex justify-between items-center max-w-[356px] p-3'>
                <span className='text-[#595959] font-circular-medium text-[14px] text-center w-full'>
                  PROFIT
                </span>
                <button
                  onClick={toggleProfit}
                  className='rounded-[6px] border border-green-200 hover:bg-gray-200'
                >
                  <X className='rounded-[6px] py-[4px] px-[8px] bg-white w-full h-full' />
                </button>
              </div>
              <div className='bg-[#E5F4FF] grid grid-cols-2 text-center border-t border-[#B2E1C8]'>
                <div className='flex items-center justify-center gap-2 text-gray-700 font-circular-medium py-[9px] border-r border-[#B2E1C8]'>
                  <span>COST PRICE</span>
                  <FaSortDown className='w-[12px] h-[12px] text-[#83838B] mb-1' />
                </div>
                <div className='flex items-center justify-center gap-2 text-gray-700 font-circular-medium py-[9px]'>
                  <span>PROFIT</span>
                  <FaSortDown className='w-[12px] h-[12px] text-[#83838B] mb-1' />
                </div>
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center w-full p-4'>
              <button
                onClick={toggleProfit}
                className='bg-[#F6F8FA] border border-[#DEE5ED] rounded-[6px] font-circular-medium text-[#090F1C] py-2 px-4'
              >
                SHOW PROFIT
              </button>
            </div>
          ),
        cell: ({ row, column }) =>
          showProfit ? (
            <div
              className={`flex items-center justify-between w-full h-full ${
                showProfit ? '' : 'hidden sm:table-cell'
              }`}
            >
              <input
                type='number'
                onBlur={(e) =>
                  column.columnDef.meta?.updateData?.(
                    row.index,
                    'costPrice',
                    e.target.value
                  )
                }
                className='w-1/2 px-2 py-1 border-r border-gray-300 h-full text-center'
                placeholder='CP'
              />
              <input
                type='number'
                onBlur={(e) =>
                  column.columnDef.meta?.updateData?.(
                    row.index,
                    'profit',
                    e.target.value
                  )
                }
                className='w-1/2 px-2 py-1 border-gray-300 h-full text-center'
                placeholder='Profit'
              />
            </div>
          ) : null,
        meta: {
          updateData: (rowIndex, key, value) => {
            console.log(
              `Updating row ${rowIndex}, key ${key} with value ${value}`
            );
          },
        },
      },

      {
        id: 'actions',
        header: () => (
          <div className='flex justify-center items-center'>
            <Plus className='w-[15px] h-[15px] text-[#2A2A2A] self-center' />
          </div>
        ),
        cell: () => null, // Empty cell
        size: 8, // Set a small width for the column
      },
    ],
    [
      editedItem,
      isEditingTransition,
      handleInlineEdit,
      handleSaveInline,
      showSales,
      showProfit,
      toggleSales,
      toggleProfit,
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

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <LoadingAnimation />
      </div>
    );
  }

  const handleRowClick = (item: StockItem) => {
    setSelectedItem(item);
    setIsSidebarOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <main className='px-6 py-4 w-full max-w-7xl mx-auto flex flex-col main-h-svh '>
      <div ref={tableAreaRef} className='space-y-8 w-full h-full '>
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
          selectedItem={
            selectedItem
              ? { product_id: selectedItem.product_id ?? '' }
              : undefined
          }
        />
        <div className='lg:border px-4 py-2 lg:shadow-md rounded-lg lg:flex items-center justify-between mx-auto'>
          <div className='flex items-center gap-6'>
            <div className='flex justify-center lg:justify-start w-full lg:w-auto'>
              <Logo />
            </div>
            <small className='text-black text-left hidden lg:block'>
              The simplest way to manage your shop!
            </small>
          </div>
          <div className=''>
            <DropdownMenu modal>
              <DropdownMenuTrigger
                disabled
                className='btn-primary hover:cursor-pointer hidden lg:flex items-center gap-2 text-white'
              >
                <span className='py-2 px-4 rounded-lg bg-white text-black'>
                  {organizationInitial}
                </span>
                {organizationName}
                <ChevronDown strokeWidth={1.5} color='white' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className='w-full px-[5rem]'
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
            <div className="flex">
              <div
                className={`flex items-center justify-center gap-2 rounded-tl-lg border-2 border-gray-100 px-4 py-3 ${activeTab === "stock" ? "bg-white" : "bg-gray-100"
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
                  src='/icons/ui-box.svg'
                  alt=''
                  width={20}
                  height={20}
                  className='w-5 h-5'
                />
              </div>

              <div
                className={`flex items-center justify-center gap-2 border-2 border-gray-100 px-4 py-3 rounded-tr-lg ${activeTab === "sales" ? "bg-white" : "bg-gray-100"
                  }`}
                onClick={() => setActiveTab("sales")}
                role="button"
                style={{ cursor: "pointer", width: "160px" }}
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

                  {/* Button */}
                  <button
                    onClick={openModal}
                    className='btn-primary max-[400px]:text-sm text-nowrap max-[1000px]:hidden mr-2 disabled:opacity-50'
                    disabled={!isPremium && stockItems.length >= 10}
                  >
                    + Add New
                  </button>
                </div>
                <button
                  onClick={openModal}
                  className='btn-primary max-[400px]:text-sm text-nowrap min-[1000px]:hidden ml-2'
                >
                  +
                </button>

                <div className='relative max-[800px]:w-full'>
                  <input
                    type='text'
                    className='h-12 border w-[327px] max-[800px]:w-full rounded-md focus:outline-2 focus:outline-[#009A49] px-10'
                    onChange={(event) => {
                      setIsSearching(true);
                      setSearchText(event.target.value);
                      if (!event.target.value) {
                        setIsSearching(false);
                      }
                    }}
                  />

                  <Search className='text-[#667085] absolute top-3 left-3 ' />
                </div>

                <div className='z-10'>
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
          <div className='flex w-full overflow-hidden mx-auto'>
            <div
              className={`border shadow-md rounded-b-lg rounded-bl-lg relative rounded-tr-lg flex-1 overflow-auto w-full transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'w-full max-w-[989px] mr-1' : 'w-full'
              }`}
            >
              {stockItems.length === 0 ||
              (isSearching && filteredItems.length === 0) ? (
                <div className='relative w-full'>
                  <Table className='bg-white border-0 border-collapse w-full'>
                    <TableHeader>
                      <TableHeader>
                        <TableRow className='h-[50px] '>
                          <TableHead className='text-[#090F1C] font-circular-medium text-left border-b border-r'>
                            ITEM NAME
                          </TableHead>
                          <TableHead className='text-[#090F1C] font-circular-medium text-center border-b border-r px-4'>
                            SELLING PRICE
                          </TableHead>
                          <TableHead className='text-[#090F1C] font-circular-medium text-center border-b border-r px-4'>
                            AVAILABLE
                          </TableHead>
                          <TableHead className='text-[#090F1C] font-circular-medium text-center border-b border-r '>
                            SHOW SALES
                          </TableHead>
                          <TableHead className='text-[#090F1C] font-circular-medium text-center border-b '>
                            SHOW PROFIT
                          </TableHead>
                          <TableHead className=''>
                            <Plus className='w-[16px] h-[16px] self-center' />
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
                                className={`text-[#090F1C] font-circular-medium text-center border-b border-r min-w-[100px] 
    ${
      (showSales && !['name', 'sales', 'actions'].includes(header.id)) ||
      (showProfit && !['name', 'profitGroup', 'actions'].includes(header.id))
        ? 'hidden sm:table-cell'
        : ''
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
                            className='h-[50px] cursor-pointer'
                            onClick={() => row && handleRowClick(row.original)}
                          >
                            {row
                              ? row.getVisibleCells().map((cell) => {
                                  let cellWidthClass = 'w-auto'; // Default width

                                  if (cell.column.id === 'name') {
                                    cellWidthClass =
                                      showSales && showProfit
                                        ? 'w-[259px]'
                                        : showSales
                                          ? 'w-[292px]'
                                          : showProfit
                                            ? 'w-[292px]'
                                            : 'w-[374px]';
                                  } else if (
                                    cell.column.id === 'price' ||
                                    cell.column.id === 'available'
                                  ) {
                                    cellWidthClass =
                                      showSales && showProfit
                                        ? 'w-auto px-4'
                                        : showSales || showProfit
                                          ? 'w-[262px]'
                                          : 'w-[280px]';
                                  } else if (cell.column.id === 'sales') {
                                    cellWidthClass = showSales
                                      ? 'w-[356px]'
                                      : 'w-auto px-3';
                                  } else if (cell.column.id === 'profit') {
                                    cellWidthClass = showProfit
                                      ? 'w-[362px]'
                                      : 'w-auto px-3';
                                  }

                                  return (
                                    <TableCell
                                      key={cell.id}
                                      className={`p-0 py-0 align-middle h-[50px] text-center border-r ${
                                        (
                                          showSales &&
                                            ![
                                              'name',
                                              'sales',
                                              'actions',
                                            ].includes(cell.column.id)
                                        ) ||
                                        (
                                          showProfit &&
                                            ![
                                              'name',
                                              'profitGroup',
                                              'actions',
                                            ].includes(cell.column.id)
                                        )
                                          ? 'hidden sm:table-cell'
                                          : ''
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
                                    className='text-center border-r text-gray-400'
                                  >
                                    {''} {/* Placeholder for missing row */}
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
              <div className="w-full">
                <SalesTab
                  onAddSale={() => setIsModalOpen(true)} 
                  salesItems={salesItems}
                  />

                <SalesModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  stockItems={stockItems}
                  productItems={productItems}
                  onCompleteSale={handleAddSale}
                />
              </div>
            )}
            {isSidebarOpen && (
              <Sidebar
                key={
                  selectedItem?.id + '-' + (selectedItem?.images?.length || 0)
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
                itemName={currentItem?.name || ''}
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

      <div className='flex flex-col gap-2 mt-4'>
        <p className='text-center mt-4'>
          © {new Date().getFullYear()}, Powered by Timbu Business
        </p>
      </div>
    </main>
  );
};
export default Page;
