"use client";
import ShopDeskModal from "@/components/modal/add-item";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import LogoutConfirmModal from '@/components/modals/LogoutConfirmModal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import Logo from "@/components/functional/logo";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const router = useRouter()


  const handleLogout = () => {
    router.push("/")
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [stockItems] = useState([]);

  return (
    <>
    <main className="px-6 py-4 w-full">
      <div className="space-y-8 w-full">
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
                  ES
                </span>
                Emeka & Sons <ChevronDown strokeWidth={1.5} color="white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setIsLogoutModalOpen(true)}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="space-y-0 w-full">
          <div className="flex items-center justify-center gap-2 border p-2 rounded-tr-lg rounded-tl-lg w-full lg:w-24 font-semibold">
            Stock
            <Image
              src="/icons/ui-box.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
          <div className="border shadow-md rounded-b-lg rounded-bl-lg relative">
            {stockItems.length === 0 ? (
              <div className="relative">
                <div className="w-full overflow-x-auto">
                  <ul className="flex items-center justify-between w-full">
                    <li className="w-1/3 lg:w-1/6 border-r-2 border-[#DEDEDE] text-center py-4 hover:cursor-pointer">
                      <span className="font-semibold text-black text-sm">
                        ITEM NAME
                      </span>
                    </li>
                    <li className="w-1/3 lg:w-1/6 border-r-2 border-[#DEDEDE] text-center py-4 hover:cursor-pointer">
                      <span className="font-semibold text-black text-sm">
                        SKU CODE
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
                    <li className="w-1/3 lg:w-1/6 border-r-2 border-[#DEDEDE] text-center py-4 hidden lg:flex justify-center hover:cursor-pointer">
                      <span className="font-semibold text-black text-sm">
                        ACTION
                      </span>
                    </li>
                    <li className="w-1/3 lg:w-1/6 text-center py-2 hidden lg:flex justify-center hover:cursor-pointer">
                      <span className="font-semibold text-black text-xl">
                        +
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
                      <ShopDeskModal isOpen={isOpen} onClose={closeModal} />
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
              <Table>
                <TableHeader className="w-full overflow-x-auto">
                  <TableRow className="flex lg:grid lg:grid-cols-6 overflow-x-auto place-items-center place-content-center py-4 w-full">
                    <TableHead className="font-semibold text-black px-4 flex items-center gap-3">
                      ITEM NAME
                    </TableHead>
                    <TableHead className="font-semibold text-black px-4 flex items-center gap-3">
                      SKU CODE
                    </TableHead>
                    <TableHead className="font-semibold text-black px-4 flex items-center gap-3">
                      PRICE
                    </TableHead>
                    <TableHead className="font-semibold text-black px-4 flex items-center justify-center">
                      QUANTITY
                    </TableHead>
                    <TableHead className="font-semibold text-black px-4 flex items-center justify-center">
                      ACTION
                    </TableHead>
                    <TableHead className="font-semibold text-black text-xl px-4 flex items-center justify-center">
                      +
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="relative h-[80vh] w-full">
                  <TableRow></TableRow>
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
      <p className="text-center mt-4">
        © {new Date().getFullYear()}, Powered by Timbu Business
      </p>
    </main>
    <LogoutConfirmModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        onLogout={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
        />
    </>
  );
};

export default Page;
