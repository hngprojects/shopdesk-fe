import { StockItem } from "@/app/(dashboard)/dashboard/page";
import { X } from "lucide-react";
import React, { useState } from "react";
import ImageUploader from "@/components/modal/add-image";
import { Button } from "@/components/ui/button";
import EditStockV3Modal from "../modal/modalV3/edit-stock";
import EditPriceModal from "../modal/modalV3/edit-price";
import EditStockName from "../modal/modalV3/edit-name";
import EditQuantityModal from "../modal/modalV3/edit-quantity";
import EditSuccessModal from "../modal/modalV3/edit-success";
import EditImage from "../modal/edit-image";
/* import Image from "next/image"; */


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: StockItem | null;
  onSave: (updatedItem: StockItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, selectedItem, onSave }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEditNameOpen, setEditNameOpen] = useState(false);
  const [isEditQuantityOpen, setEditQuantityOpen] = useState(false);
  const [isEditPriceOpen, setEditPriceOpen] = useState(false);
  const [isSuccessModalOpen , setSuccessOpen] = useState(false)
  const [isImageUploaderOpen, setImageUploaderOpen] = useState(false);
  const [isEditImageModalOpen, setEditImageModalOpen] = useState(false);
  //const [isAddImgaeModalOpen, setIsAddImgaeModalOpen] = useState(false)
  
  if (!isOpen || !selectedItem) return null;

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openImageUploader = () => setImageUploaderOpen(true);
  const closeImageUploader = () => setImageUploaderOpen(false);

  const openEditImageModal = () => setEditImageModalOpen(true);
  const closeEditImageModal = () => setEditImageModalOpen(false);

  // Handle saving images from the uploader
  const handleSaveImages = (images: { id: string; src: string }[]) => {
    const updatedItem = {
      ...selectedItem,
      images: images,
      image: images.length > 0 ? images[0] : null,
    };

    onSave(updatedItem);
    closeImageUploader(); 
  };

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
      <div className="fixed inset-x-[-15] inset-0 md:relative w-full md:max-w-[356px] bg-white transition-transform duration-300 ease-in-out transform translate-x-0 flex flex-col flex-grow items-center justify-center rounded-xl md:border md:border-[#DEE5ED] ml-4 mr-[15px] md:m-0">
        <div className="hidden md:flex py-5.5 px-4 items-center justify-between border-b border-b-[#DEE5ED] w-full">
          <p className="font-circular-medium text-2xl leading-9">
            {selectedItem.name}
          </p>
          <button onClick={onClose} className="p-[9px] bg-neutral-200 rounded-md" aria-label="Close sidebar">
            <X size={16} />
          </button>
        </div>

        {/* Mobile */}
        <div className="w-full overflow-y-auto">
              <div className="flex md:hidden my-4">
                  <img src="/modal-images/text_logo.svg" alt="shop desk logo" />
              </div>
              <div className="flex items-center justify-between border-b border-b-[#DEE5ED] w-full md:hidden p-3">
                <p className="font-circular-medium text-xl leading-9">
                  Edit stock
                </p>
                <button onClick={onClose} className="p-[7px] bg-neutral-100 rounded-lg">
                  <X size={13} className="text-neutral-600" />
                </button>
              </div>

              <div className="flex flex-col md:py-5 md:px-4 items-start gap-5 w-full p-3">
                {/* Product */}
                <div className="flex p-3 items-center justify-between gap-5 rounded-md w-full border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB]">
                  <div className="flex flex-col gap-1 w-2/3">
                    <p className="text-[#717171] text-sm md:text-base font-circular-normal leading-7">
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
                <div className="flex p-3 items-center justify-between gap-5 rounded-md border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB] w-full">
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
                <div className="flex flex-col items-start p-3 gap-5 rounded-md md:border md:border-[#E9EEF3] md:bg-[#F8FAFB] w-full">
                  <p className="font-circular-normal text-base md:text-lg text-[#717171] leading-7">
                    SKU Code
                  </p>
                  <p className="font-circular-normal text-lg md:text-xl text-[#2A2A2A] leading-7.5 break-words w-full">
                    {selectedItem.sku}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex p-3 items-center justify-between gap-5 rounded-md border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB] w-full">
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

                {/* Image */}
                <div className="flex p-3 items-center justify-between gap-5 rounded-md border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB] w-full">
                  <div className="flex flex-col gap-1 w-2/3">
                    <p className="text-[#717171] text-base md:text-lg font-circular-normal leading-7">
                      Image
                    </p>
                    {!selectedItem.images || selectedItem.images.length === 0 ? (
                      <p className="text-[#2A2A2A] text-lg md:text-xl leading-7.5 font-circular-normal">
                        Not Set
                      </p>
                    ) : (
                      <div className="flex items-center space-x-1 mt-1">
                        {selectedItem.images.map((img, index) => (
                          <div
                            key={img.id}
                            className="relative border rounded-lg p-1 w-10 h-10 flex items-center justify-center"
                          >
                            <img
                              src={img.src}
                              alt={`Product image ${index + 1}`}
                              className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p
                    className="text-black md:text-[#009A49] font-circular-normal text-sm md:text-base leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
                    onClick={()=>{
                      selectedItem.images && selectedItem.images.length > 0
                        ? openEditImageModal()
                        : openImageUploader()                
                    }
                    }
                  >
                    {selectedItem.images && selectedItem.images.length > 0
                      ? "Edit"
                      : "Add"}
                  </p>
                </div>
              </div>

              <div className="w-full h-full p-4 flex flex-col md:hidden gap-4 mt-11">
                {/* Save Button */}
                <Button
                  className="bg-[#B8B8B8] text-white text-base font-circular-medium py-6 px-2 rounded-lg hover:border-b hover:border-b-primary transition-colors"
                  variant="default"
                  fullWidth
                >
                  Save
                </Button>

                {/* Delete Button */}
                <Button
                  className="bg-white text-[#FF000D] text-base font-circular-medium px-2 py-6 border border-[#FF000D] rounded-lg hover:bg-[#FF000D] hover:text-white transition-colors"
                  variant="default"
                  fullWidth
                >
                  Delete stock
                </Button>
              </div>
            </div>
        </div>
        

      {isEditImageModalOpen && (
        <EditImage
          isOpen={isEditImageModalOpen}
          itemName={selectedItem.name}
          existingImages={selectedItem.images || []}
          onCancel={closeEditImageModal}
          onSave={handleSaveImages}
          onDeleteImage={() => void 0}
        />
      )}


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

      <ImageUploader
        isOpen={isImageUploaderOpen}
        itemName={selectedItem.name}
        existingImages={selectedItem.images || []}
        onSave={handleSaveImages}
        onCancel={closeImageUploader}
      />
    </>  
  );
};

export default Sidebar;