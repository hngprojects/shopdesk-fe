"use client";
import ShopDeskModal from "@/components/modal/add-item";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
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

const Page = () => {
  type StockItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };

  const { tableAreaRef, tableAreaHeight } = useTableAreaHeight();
  const rowsPerPage = Math.round(tableAreaHeight / 55) - 3;

  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  } | null>(null);
  const [user, setUser] = useState<any>(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("refresh_token");
    if (!token) {
      router.replace("/sign-in");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleEditClick = (item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }) => {
    setSelectedItem(item);
    setOpenEdit(true);
  };

  const handleSaveEdit = (updatedItem: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }) => {
    setStockItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    setOpenEdit(false);
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleDeleteClick = (item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
  };

  const closeAddModal = () => {
    setOpenAdd(false);
  };

  const handleDeleteItem = () => {
    setIsDeleteModalOpen(false);
    setStockItems((prev) =>
      prev.filter((item) => item.id !== selectedItem?.id)
    );
  };

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

        <div className="space-y-0 w-full ">
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
              <button
                onClick={handleAddClick}
                className="btn-primary max-[400px]:text-sm mb-2 max-[640px]:mb-4 text-nowrap self-end"
              >
                + Add New Stock
              </button>
            )}
          </div>
          <div className="border shadow-md rounded-b-lg rounded-bl-lg relative rounded-tr-lg flex-1">
            {stockItems.length === 0 ? (
              <div className="relative">
                <div className="w-full overflow-x-auto">
                  <ul className="flex items-center justify-between w-full rounded-tr-lg">
                    <li className="w-2/3 lg:w-1/2 border-r-2 border-[#DEDEDE] text-left py-4 hover:cursor-pointer pl-4">
                      <span className="font-semibold text-black text-sm ">
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
                    <li className="w-1/3 lg:w-1/6  border-[#DEDEDE] text-center py-4 hidden lg:flex justify-center hover:cursor-pointer rounded-tr-lg">
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
                        onClick={openModal}
                        className="btn-outline hover:cursor-pointer"
                      >
                        + Add New Stock
                      </button>
                      <ShopDeskModal
                        isOpen={isOpen}
                        onClose={closeModal}
                        onSave={(newItem) => {
                          setStockItems((prev) => [...prev, newItem]);

                          closeModal();
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-[#DEE5ED] p-2 absolute bottom-0 w-full lg:hidden">
                  <p className="text-gray-400 text-sm flex items-center gap-1 justify-center text-center">
                    You have <span className="text-black">0</span> stock
                    (Displaying <span className="text-black">6</span>{" "}
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
              </div>
            ) : (
              <Table className="border-collapse overflow-y-auto">
                <TableHeader>
                  <TableRow className="h-[50px]">
                    <TableHead className="px-4 py-2 w-2/7 text-left border-b border-r">
                      ITEM NAME
                    </TableHead>
                    <TableHead className="px-4 py-2 w-1/7 text-center border-b border-r">
                      PRICE
                    </TableHead>
                    <TableHead className="px-4 py-2 w-1/7 text-center border-b border-r hidden sm:table-cell">
                      QUANTITY
                    </TableHead>
                    <TableHead className="px-4 py-2 w-1/7 text-center border-b hidden sm:table-cell">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({
                    length: Math.max(rowsPerPage, stockItems.length),
                  }).map((_, index) => {
                    const item = stockItems[index] || null;
                    const isEmptyRow = !item; 
                    const isMobile = window.innerWidth <= 640; 
                    const isNextEmptyRow = isEmptyRow && index === stockItems.length;

                    return (
                      <TableRow
                        key={index}
                        className="h-[50px]"
                        onTouchEnd={() => {
                          if (isMobile && isNextEmptyRow) {
                            handleAddClick();
                          }
                        }}
                        onClick={() => {
                          if (!isMobile && isNextEmptyRow) {
                            handleAddClick();
                          }
                        }}
                      >
                        <TableCell className="px-4 py-3 text-left border-r">
                          {item ? item.name : ""}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center border-r">
                          {item ? `$${item.price}` : ""}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center border-r hidden sm:table-cell">
                          {item ? item.quantity : ""}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center hidden sm:table-cell">
                          {item ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <MoreVertical className="cursor-pointer" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => handleEditClick(item)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteClick(item)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>)}
          </div>
        </div>
      </div>

      <EditItemModal
        isOpen={openEdit}
        onClose={closeEditModal}
        item={selectedItem!}
        onSave={handleSaveEdit}
      />

      <AddItemModal
        isOpen={openAdd}
        onClose={closeAddModal}
        onSave={(newItem) => {
          setStockItems((prev) => [...prev, newItem]);

          closeModal();
        }}
      />

      <p className="text-center mt-4">
        © {new Date().getFullYear()}, Powered by Timbu Business
      </p>
    </main>
  );
};

export default Page;