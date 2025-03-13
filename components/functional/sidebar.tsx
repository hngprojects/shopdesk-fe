import { StockItem } from "@/app/(dashboard)/dashboard/page";
import { X } from "lucide-react";
import React, { useState } from "react";
import EditItemModal from "@/components/modal/edit-stock";
import { Button } from "@/components/ui/button";
import EditStockV3Modal from "../modal/modalv3/edit-stock";
import EditPriceModal from "../modal/modalv3/edit-price";
import EditSuccessModal from "../modal/modalv3/edit-success";
/* import Image from "next/image"; */


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: StockItem | null;
  onSave: (updatedItem: StockItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, selectedItem, onSave }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEditPriceModalOpen, setEditPriceModalOpen] = useState(false);
  const [isSuccessModalOpen , setSuccessModalOpen] = useState(false)

  if (!isOpen || !selectedItem) return null;

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openSucessModal = () => setSuccessModalOpen(true);
  const closeSuccessModal = () => setSuccessModalOpen(false);
  
  const openEditPriceModal = () => setEditPriceModalOpen(true);
  const closeEditPriceModal = () => setEditPriceModalOpen(false);

  const handleSavePrice = (updatedPrice: number) => {
    const updatedItem = { ...selectedItem, buying_price: updatedPrice };
    onSave(updatedItem); 
    closeEditPriceModal(); 
  }

  return (
    <>
      <div className="fixed inset-0 md:relative  w-full max-w-[344px] md:max-w-[356px] bg-white transition-transform duration-300 ease-in-out transform translate-x-0 flex flex-col flex-grow  items-start rounded-xl md:border md:border-[#DEE5ED] ml-4 mr-[15px] md:m-0">
        <div className="hidden md:flex py-5.5 px-4 items-center justify-between border-b border-b-[#DEE5ED] w-full">
          <p className="font-circular-medium text-2xl leading-9">
            {selectedItem.name}
          </p>
          <button onClick={onClose} className="p-[9px] bg-neutral-200 rounded-md">
            <X size={16} />
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-between border-b border-b-[#DEE5ED] w-full md:hidden">
          <p className="font-circular-medium text-xl leading-9">
            Edit Stock
          </p>
          <button onClick={onClose} className="p-[7px] bg-neutral-200 rounded-md">
            <X size={13} />
          </button>
        </div>


        <div className="flex flex-col md:py-5 md:px-4 items-start gap-5 w-full">
          {/* Product */}
          <div className="flex p-3 items-start gap-5 rounded-md w-full md:hidden">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-base font-circular-normal leading-7">
                Product name
              </p>
              <p className="text-[#2A2A2A] text-lg leading-7.5 font-circular-normal">
                {selectedItem.name}
              </p>
            </div>
            <p
              className="text-[#1B1B1B] md:text-[#009A49] font-circular-normal text-sm leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={openEditModal}
            >
              Edit
            </p>
          </div>

          {/* Price */}
          <div className="flex p-3 items-start gap-5 rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-base md:text-lg font-circular-normal leading-7">
                Price
              </p>
              <p className="text-[#2A2A2A] text-lg md:text-xl leading-7.5 font-circular-normal">
                {selectedItem.currency_code} {selectedItem.buying_price}
              </p>
            </div>
            <p
              className="text-[#1B1B1B] md:text-[#009A49] font-circular-normal text-sm md:text-base leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={openEditPriceModal}
            >
              Edit
            </p>
          </div>

          {/* SKU Code */}
          <div className="flex flex-col items-start p-3 gap-5 rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full">
            <p className="font-circular-normal text-base md:text-lg text-[#717171] leading-7">
              SKU Code
            </p>
            <p className="font-circular-normal text-lg md:text-xl text-[#2A2A2A] leading-7.5 break-words w-full">
              {selectedItem.sku}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex p-3 items-start gap-5 rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-base md:text-lg font-circular-normal leading-7">
                Quantity
              </p>
              <p className="text-[#2A2A2A] text-lg md:text-xl leading-7.5 font-circular-normal">
                {selectedItem.quantity}
              </p>
            </div>
            <p
              className="text-black md:text-[#009A49] font-circular-normal text-sm md:text-base leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={openEditModal}
            >
              Edit
            </p>
          </div>
        </div>

        <div className="w-full h-full p-4 flex flex-col md:hidden gap-4 mt-11">
          {/* Save Button */}
          <Button
            className="bg-[#D0D0D0] text-white text-base border border-[#B8B8B8] py-2 pr-6 pl-4"
            variant="default"
            fullWidth
          >
            Save
          </Button>

          {/* Delete Button */}
          <Button
            className="bg-white text-[#FF000D] text-base border border-[#E50000] py-2 pr-6 pl-4"
            variant="default"
            fullWidth
          >
            Delete stock
          </Button>
        </div>

      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditStockV3Modal
          isOpen={isEditModalOpen}
          item={selectedItem} 
          onClose={closeEditModal}
          onSave={(updatedItem) => {
            onSave(updatedItem);
            closeEditModal();
          }}
          openSuccessModal={openSucessModal}
          />
      )}
      {isSuccessModalOpen && (
          <EditSuccessModal
            isOpen={isSuccessModalOpen}
            onClose={closeSuccessModal} 
          />
      )}

      {isEditPriceModalOpen&&(
      <EditPriceModal
       isOpen={isEditPriceModalOpen}
       onClose={closeEditPriceModal}
        item={selectedItem} 
        openSuccessModal={openSucessModal} 
        onSave={handleSavePrice}
        />
      )}

          
    </>
  );
};

export default Sidebar;
