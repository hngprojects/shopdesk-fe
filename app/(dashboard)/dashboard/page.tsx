"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { ChevronDown, SaveAll, Loader2, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import EditItemModal from "@/components/modal/edit-stock";
import AddItemModal from "@/components/modal/add-item";
import DeleteItem from "@/components/modal/delete-item";
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
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

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
  const rowsPerPage = Math.round(tableAreaHeight / 55) - 3;

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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [editedItem, setEditedItem] = useState<StockItem | null>(null);
  const [isEditingTransition, setIsEditingTransition] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<keyof StockItem | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("refresh_token");
    if (!token) {
      router.replace("/sign-in");
    } else {
      setIsLoading(true);
      GetStock()
        .then((data) => {
          setStockItems(data.items);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching stock:", error);
          setIsLoading(false);
        });
    }
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

  const handleInlineEdit = useCallback((item: StockItem, field: keyof StockItem = "name") => {
    setIsEditingTransition(item.id);
    setEditedItem({ ...item });
    setActiveField(field);
    setTimeout(() => setIsEditingTransition(null), 0);
  }, []);

  const handleInputChange = useCallback(
    (field: keyof StockItem, value: string) => {
      if (editedItem) {
        setEditedItem((prev) => ({
          ...prev!,
          [field]: field === "quantity" || field === "buying_price" ? Number(value) : value,
        }));
      }
    },
    [editedItem]
  );

  const handleSaveInline = useCallback(() => {
    if (editedItem) {
      setStockItems((prev) =>
        prev.map((item) => (item.id === editedItem.id ? editedItem : item))
      );
      setEditedItem(null);
    }
  }, [editedItem]);

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
            <div className="inline-block w-full max-w-[200px] overflow-hidden">
              {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : isEditingThisRow ? (
                <input
                  ref={nameInputRef}
                  value={editedItem?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveInline()}
                  className="w-full max-w-[200px] min-w-0 border rounded px-2 py-1 text-left box-border"
                />
              ) : (
                <span className="block truncate">{row.original.name}</span>
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
              className="inline-block w-[calc(100%-2rem)] max-w-[100px]"
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
                `${row.original.currency_code} ${row.original.buying_price?.toLocaleString()}`
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
        meta: { className: "hidden sm:table-cell" },
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
                <div className="flex justify-center items-center gap-2">
                  <SaveAll
                    className="cursor-pointer text-[#19A45B] w-[24px] h-[24px]"
                    onClick={handleSaveInline}
                  />
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
        meta: { className: "hidden sm:table-cell" },
      },
    ],
    [editedItem, isEditingTransition, handleInlineEdit, handleSaveInline]
  );

  const table = useReactTable({
    data: stockItems.slice(0, rowsPerPage),
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
    <main className="px-6 py-4 w-full max-w-7xl mx-auto flex flex-col min-h-svh">
      <div ref={tableAreaRef} className="space-y-8 w-full h-full">
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
          <div className="hidden lg:block">
            <DropdownMenu modal>
              <DropdownMenuTrigger className="btn-primary hover:cursor-pointer hidden lg:flex items-center gap-2 text-white">
                <span className="py-2 px-4 rounded-lg bg-white text-black">
                  MM
                </span>
                Mark M <ChevronDown strokeWidth={1.5} color="white" />
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

        <div className="space-y-0 w-full">
          <div className="w-full flex justify-between max-[640px]:flex-col-reverse">
            <div className="flex items-center justify-center gap-2 border border-b-white py-2 rounded-tr-lg rounded-tl-lg w-44 max-[640px]:w-full font-semibold px-9 shadow-inner">
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
              <div className="z-50">
                <button
                  onClick={openModal}
                  className="btn-primary max-[400px]:text-sm mb-2 max-[640px]:mb-4 text-nowrap self-end"
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
            )}
          </div>
          <div className="border shadow-md rounded-b-lg rounded-bl-lg relative rounded-tr-lg flex-1">
            {stockItems.length === 0 ? (
              <div className="relative">
                <div className="w-full overflow-x-auto">
                  <ul className="flex items-center justify-between w-full rounded-tr-lg">
                    <li className="w-2/3 lg:w-1/2 border-r-2 border-[#DEDEDE] text-left py-4 hover:cursor-pointer pl-4">
                      <span className="font-semibold text-black text-sm">
                        ITEM NAME
                      </span>
                    </li>
                    <li className="w-1/3 lg:w-1/6 lg:border-r-2 border-[#DEDEDE] text-center py-4 hover:cursor-pointer">
                      <span className="font-semibold text-black text-sm">
                        PRICE
                      </span>
                    </li>
                    <li className="w-1/3 lg:w-1/6 border-r-2 border-[#DEDEDE] text-center py-4 hidden lg:flex justify-center hover:cursor-pointer">
                      <span className="font-semibold text-black text-sm">
                        QUANTITY
                      </span>
                    </li>
                    <li className="w-1/3 lg:w-1/6 border-[#DEDEDE] text-center py-4 hidden lg:flex justify-center hover:cursor-pointer rounded-tr-lg">
                      <span className="font-semibold text-black text-sm">
                        ACTION
                      </span>
                    </li>
                  </ul>
                  <span className="w-full h-px bg-[#DEDEDE] block"></span>
                  <div className="relative h-[80vh] w-full">
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
                  </div>
                </div>
              </div>
            ) : (
              <Table className="border-collapse overflow-y-auto table-fixed">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="h-[50px]">
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className={`px-4 py-2 text-center border-b border-r ${header.column.id === "name" ? "text-left w-[200px]" : ""} ${header.column.columnDef.meta?.className || ""}`}
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
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="h-[50px]">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={`px-4 py-3 text-center border-r ${cell.column.id === "name" ? "text-left w-[200px] overflow-hidden" : ""} ${cell.column.columnDef.meta?.className || ""}`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
        <div hidden className="bg-[#DEE5ED] p-2 w-full lg:hidden">
          <p className="text-gray-400 text-sm flex items-center gap-1 justify-center text-center">
            You have <span className="text-black">{stockItems.length}</span>{" "}
            stock (Displaying{" "}
            <span className="text-black">{rowsPerPage}</span>{" "}
            <Image
              src="/icons/ArrowDropDown.svg"
              alt=""
              width={12}
              height={12}
              className="w-3 h-3"
            />{" "}
            per page)
          </p>
        </div>
        <p className="text-center mt-4">
          © {new Date().getFullYear()}, Powered by Timbu Business
        </p>
      </div>
    </main>
  );
};

export default Page;