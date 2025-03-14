import { StockItem } from "@/app/(dashboard)/dashboard/page";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import EditItemModal from "@/components/modal/edit-stock";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: StockItem | null;
  onSave: (updatedItem: StockItem) => void;
  onDelete: (itemId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, selectedItem, onSave, onDelete }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<StockItem | null>(null);
  const [activeField, setActiveField] = useState<keyof StockItem | null>(null);
  const [isEdited, setIsEdited] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !selectedItem) return null;

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleInlineEdit = useCallback((field: keyof StockItem) => {
    setEditedItem(selectedItem);
    setActiveField(field);
  }, [selectedItem]);

  const handleInputChange = (field: keyof StockItem, value: string) => {
    if (editedItem) {
      setEditedItem((prev) => ({
        ...prev!,
        [field]: field === "quantity" || field === "buying_price" ? Number(value) : value,
      }));
      setIsEdited(true);
    }
  };

  const handleSave = () => {
    if (editedItem) {
      onSave(editedItem);
      setActiveField(null);
      setIsEdited(false);
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
        <div className="flex items-center justify-between border-b border-b-[#DEE5ED] w-full md:hidden pl-4 pr-14">
          <p className="font-circular-medium text-xl leading-9">
            Edit Stock
          </p>
          <button onClick={onClose} className="p-[7px] bg-neutral-200 rounded-md">
            <X size={13} />
          </button>
        </div>


        <div className="flex flex-col md:py-5 md:px-4 items-start gap-5 w-full">
          {/* Product */}
          <div className="flex p-3 items-start rounded-md w-full md:hidden">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-base font-circular-normal leading-7">
                Product name
              </p>
              {activeField === "name" ? (
                <input
                  ref={nameInputRef}
                  className="text-[#2A2A2A] text-lg leading-7.5 font-circular-normal border-2 border-green-500 rounded p-1 w-full"
                  value={editedItem?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              ) : (
                <p className="text-[#2A2A2A] text-lg leading-7.5 font-circular-normal">{selectedItem.name}</p>
              )}
            </div>
            <p
              className="text-[#1B1B1B] md:text-[#009A49] font-circular-normal text-sm leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={() => handleInlineEdit("name")}
            >
              Edit
            </p>
          </div>
          

          {/* Price inline edit */}
          <div className="flex p-3 items-start rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full md:hidden">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-base md:text-lg font-circular-normal leading-7">
                Price
              </p>
              {activeField === "buying_price" ? (
                <input
                  ref={priceInputRef}
                  className="text-[#2A2A2A] text-lg leading-7.5 font-circular-normal border-2 border-green-500 rounded p-1 w-full"
                  value={editedItem?.buying_price || ""}
                  onChange={(e) => handleInputChange("buying_price", e.target.value)}
                />
              ) : (
                <p className="text-[#2A2A2A] text-lg leading-7.5 font-circular-normal">{selectedItem.currency_code} {selectedItem.buying_price}</p>
              )}
            </div>
            <p
              className="text-[#1B1B1B] md:text-[#009A49] font-circular-normal text-sm md:text-base leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={() => handleInlineEdit("buying_price")}
            >
              Edit
            </p>
          </div>

          {/* Price */}
          <div className="hidden md:flex p-3 items-start rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full">
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
              onClick={openEditModal}
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

          {/* Quantity inline edit */}
          <div className="flex p-3 items-start rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full md:hidden">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-base md:text-lg font-circular-normal leading-7">
                Quantity
              </p>
              {activeField === "quantity" ? (
                <input
                  ref={quantityInputRef}
                  className="text-[#2A2A2A] text-lg leading-7.5 font-circular-normal border-2 border-green-500 rounded p-1 w-full"
                  value={editedItem?.quantity || ""}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                />
              ) : (
                <p className="text-[#2A2A2A] text-lg leading-7.5 font-circular-normal">{selectedItem.quantity}</p>
              )}
            </div>
            <p
              className="text-black md:text-[#009A49] font-circular-normal text-sm md:text-base leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={() => handleInlineEdit("quantity")}
            >
              Edit
            </p>
          </div> 

          {/* Quantity */}
          <div className="hidden md:flex p-3 items-start gap-5 rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full">
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


        {/* Buttons */}
        <div className="w-full h-full flex flex-col md:hidden gap-4 mt-11 max-w-[340px]">
          {/* Save Button */}
          <Button
            className={`text-white text-base border border-[#B8B8B8] ${isEdited ? "bg-black" : "bg-[#D0D0D0]"}`}
            variant="default"
            size="sm"
            fullWidth
            onClick={handleSave}
            disabled={!isEdited}
          >
            Save
          </Button>

          {/* Delete Button */}
          <Button
            className="bg-white text-[#FF000D] text-base border border-[#E50000]"
            variant="default"
            fullWidth
            onClick={() => selectedItem && onDelete(selectedItem.id)}
          >
            Delete stock
          </Button>
        </div>

      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditItemModal
          isOpen={isEditModalOpen}
          item={selectedItem} 
          onClose={closeEditModal}
          onSave={(updatedItem) => {
            onSave(updatedItem);
            closeEditModal();
          }}
          />
      )}
    </>
  );
};

export default Sidebar;
