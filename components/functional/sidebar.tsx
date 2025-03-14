import { StockItem } from "@/app/(dashboard)/dashboard/page";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
//import EditStockV3Modal from "../modal/modalV3/edit-stock";
import EditPriceModal from "../modal/modalV3/edit-price";
import EditStockName from "../modal/modalV3/edit-name";
import EditQuantityModal from "../modal/modalV3/edit-quantity";
import EditSuccessModal from "../modal/modalV3/edit-success";


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: StockItem | null;
  onSave: (updatedItem: StockItem) => void;
  onDelete: (itemId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, selectedItem, onSave }) => {
  const [isEditNameOpen, setEditNameOpen] = useState(false);
  const [isEditQuantityOpen, setEditQuantityOpen] = useState(false);
  const [isEditPriceOpen, setEditPriceOpen] = useState(false);
  const [isSuccessModalOpen , setSuccessOpen] = useState(false)
  
  if (!isOpen || !selectedItem) return null;
  
  const openEditName = () => setEditNameOpen(true);
  const closeEditName = () => setEditNameOpen(false);
  
  const openEditQuantity = () => setEditQuantityOpen(true);
  const closeEditQuantity = () => setEditQuantityOpen(false);
  
  const openSucessModal = () => setSuccessOpen(true);
  const closeSuccessModal = () => setSuccessOpen(false);
  
  const openEditPriceModal = () => setEditPriceOpen(true);
  const closeEditPriceModal = () => setEditPriceOpen(false);
  
  const handleSavePrice = (updatedPrice: number) => {
    const updatedItem = { ...selectedItem, buying_price: updatedPrice };
    onSave(updatedItem); 
    closeEditPriceModal(); 
  }

  return (
    <>
      <div className="fixed inset-0 w-full sm:max-w-[256px] sm:relative bg-white transition-transform duration-300 ease-in-out transform translate-x-0 flex flex-col flex-grow  items-start rounded-xl sm:border sm:border-[#DEE5ED] ml-4 mr-[15px] sm:m-0  overflow-y-auto md:max-w-[300px] lg:max-w-[356px]">
        <div className="hidden md:flex py-5.5 px-4 items-center justify-between border-b border-b-[#DEE5ED] w-full">
          <p className="font-circular-medium text-2xl leading-9">
            {selectedItem.name}
          </p>
          <button onClick={onClose} className="p-[9px] bg-neutral-200 rounded-md">
            <X size={16} />
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-between border-b border-b-[#DEE5ED] w-full md:hidden pl-4 pr-10">
          <p className="font-circular-medium text-xl leading-9">
            Edit Stock
          </p>
          <button onClick={onClose} className="p-[7px] bg-neutral-200 rounded-md">
            <X size={13} />
          </button>
        </div>


        <div className="flex flex-col md:py-5 md:px-4 items-center gap-5 w-full">
          {/* Product */}
          <div className="flex p-3 items-start gap-5 rounded-md w-full ">
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
              onClick={openEditName}
            >
              Edit
            </p>
          </div>

          {/* Price */}
          <div className="hidden md:flex p-3 items-start rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-base md:text-lg font-circular-normal leading-7" 
              >
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
          <div className="flex flex-col items-start p-3 rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full">
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
              onClick={openEditQuantity}
            >
              Edit
            </p>
          </div>    
        </div>


        {/* Buttons */}
        <div className="w-full h-full flex flex-col md:hidden gap-4 mt-11 max-w-[340px]">
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
   {/**   {isEditModalOpen && (
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
      */}
      {isEditQuantityOpen && (
  <EditQuantityModal
    isOpen={isEditQuantityOpen}
    item={selectedItem} 
    onClose={closeEditQuantity}
    onSave={(updatedItem) => {
      onSave(updatedItem);
      closeEditQuantity();
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

{isEditPriceOpen&&(
<EditPriceModal
 isOpen={isEditPriceOpen}
 onClose={closeEditPriceModal}
  item={selectedItem} 
  openSuccessModal={openSucessModal} 
  onSave={handleSavePrice}
  />
)}



{isEditNameOpen && (
  <EditStockName
    isOpen={isEditNameOpen}
    item={selectedItem} 
    onClose={closeEditName}
    onSave={(updatedItem) => {
      onSave(updatedItem);
      closeEditName();
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

    </>  
  );
};

export default Sidebar;
