'use client';

import { getAccessToken } from "@/app/api/token";
import LoadingAnimation from "@/components/functional/loading";

import DeleteItem from "@/components/modal/delete-item";
import EditItemModal from "@/components/modal/edit-stock";
import LogoutConfirmModal from "@/components/modal/logoutConfirmationModal";

import { deleteStock, GetProduct, GetStock } from "@/services/stock";
import { useStore } from "@/store/useStore";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaSortDown } from "react-icons/fa";
import useTableAreaHeight from "./hooks/useTableAreaHeight";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TableContent from "./components/TableContent";
import Settings from "./components/Settings";

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

  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isMobileLogoutModalOpen, setIsMobileLogoutModalOpen] = useState(false);
  const [isDesktopLogoutModalOpen, setIsDesktopLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [isEditingTransition, setIsEditingTransition] = useState<string | null>(
    null
  );
  const [editedItem, setEditedItem] = useState<StockItem | null>(null);
  const [activeField, setActiveField] = useState<keyof StockItem | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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
    //setIsLoading(true);

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

  const handleInlineEdit = useCallback(
    (item: StockItem, field: keyof StockItem = "name") => {
      console.log("Inline edit started:", item.id, field);
      setIsEditingTransition(item.id);
      setEditedItem({ ...item });
      setActiveField(field);
      setIsEditingTransition(null);
    },
    []
  );

  const cancelEdit = useCallback(() => {
    setEditedItem(null);
    setActiveField(null);
  }, []);

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

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  useEffect(() => {
    if (organizationId === '160db8736a9d47989381e01a987e4413') {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
  }, [])

  const handleBackToStock = () => {
    setShowSettings(false);
  };

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <main className="px-6 py-4 w-full max-w-7xl mx-auto flex flex-col main-h-svh ">
      <div ref={tableAreaRef} className="space-y-8 w-full h-full ">
      <LogoutConfirmModal
         organizationName={organizationName}
         open={isMobileLogoutModalOpen || isDesktopLogoutModalOpen}
         onOpenChange={(open) => {
           if (!open) {
             setIsMobileLogoutModalOpen(false);
             setIsDesktopLogoutModalOpen(false);
           }
         }}
         onCancel={() => {
           setIsMobileLogoutModalOpen(false);
           setIsDesktopLogoutModalOpen(false);
         }}
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

        <Header onSettingsClick={handleSettingsClick} />
      </div>

      {showSettings ? (
        <div>
          <div className="mb-4">
            <button
              onClick={handleBackToStock}
              className="flex items-center text-[#009A49] hover:underline"
            >
              ← Back to Stock
            </button>
          </div>
          <Settings />
        </div>
      ) : (
        <TableContent
          stockItems={stockItems}
          setStockItems={setStockItems}
          handleInputChange={handleInputChange}
          handleInlineEdit={handleInlineEdit}
          handleSaveInline={handleSaveInline}
          editedItem={editedItem}
          isEditingTransition={isEditingTransition}
          activeField={activeField}
          cancelEdit={cancelEdit}
        />
      )}

      <EditItemModal
        isOpen={openEdit}
        onClose={closeEditModal}
        item={selectedItem!}
        onSave={handleSaveEdit}
      />

      <Footer />
    </main>
  );
};
export default Page;
