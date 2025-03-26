import type React from 'react';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  closeEditModal,
  openEditName,
  closeEditName,
  openEditQuantity,
  closeEditQuantity,
  openEditPrice,
  closeEditPrice,
  openSuccessModal,
  closeSuccessModal,
  openImageUploader,
  closeImageUploader,
  closeEditImageModal,
  saveItem,
} from '@/redux/features/sidebar';
import ImageUploader from '@/components/modal/add-image';
import { Button } from '@/components/ui/button';
import EditStockV3Modal from '../modal/modalV3/edit-stock';
import EditPriceModal from '../modal/modalV3/edit-price';
import EditStockName from '../modal/modalV3/edit-name';
import EditQuantityModal from '../modal/modalV3/edit-quantity';
import EditSuccessModal from '../modal/modalV3/edit-success';
import EditImage from '../modal/edit-image';
import Logo from './logo';

interface SidebarProps {
  selectedItem: any;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, onClose }) => {
  const dispatch = useAppDispatch();
  const {
    isEditModalOpen,
    isEditNameOpen,
    isEditQuantityOpen,
    isEditPriceOpen,
    isSuccessModalOpen,
    isImageUploaderOpen,
    isEditImageModalOpen,
  } = useAppSelector((state) => state.sidebar);

  const handleSaveImages = (images: { id: string; src: string }[]) => {
    const updatedItem = {
      ...selectedItem,
      images: images,
      image: images.length > 0 ? images[0] : null,
    };
    dispatch(
      saveItem({
        ...updatedItem,
        supplier: updatedItem.supplier || { id: '', name: 'Unknown Supplier' }, // Provide a default Supplier
      })
    );
    dispatch(closeImageUploader());
  };

  const handleSavePrice = (updatedPrice: number) => {
    const updatedItem = { ...selectedItem, buying_price: updatedPrice };
    dispatch(
      saveItem({
        ...updatedItem,
        supplier: updatedItem.supplier || { id: '', name: 'Unknown Supplier' }, // Ensure supplier is valid
      })
    );
    dispatch(closeEditPrice());
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className='fixed inset-0 bg-black/50 z-40 lg:hidden'
        onClick={onClose}
        onKeyDown={onClose}
      />

      {/* Main sidebar container */}
      <div className='fixed inset-y-0 right-0 z-50 w-full max-w-[100vw] bg-white shadow-lg lg:relative lg:w-[356px] lg:border lg:border-[#DEE5ED] flex flex-col overflow-y-auto'>
        {/* Desktop header */}
        <div className='hidden lg:flex p-4 items-center justify-between border-b border-[#DEE5ED]'>
          <h2 className='text-xl font-semibold'>{selectedItem.name}</h2>
          <button
            type='button'
            onClick={onClose}
            className='p-2 rounded-md hover:bg-gray-100'
          >
            <X size={16} />
          </button>
        </div>

        {/* Mobile header */}
        <div className='lg:hidden flex items-center justify-between p-4 border-b border-[#DEE5ED] sticky top-0 bg-white z-10'>
          <Logo />
          <button
            type='button'
            onClick={onClose}
            className='p-2 rounded-md hover:bg-gray-100'
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className='flex-1 overflow-y-auto p-4'>
          {/* Product Name */}
          <div className='flex justify-between items-center p-3 mb-3 rounded-md bg-[#F8FAFB]'>
            <div>
              <p className='text-[#717171] text-sm'>Product name</p>
              <p className='text-[#2A2A2A] font-medium'>
                {selectedItem?.name || selectedItem?.productName || 'No name'}
              </p>
            </div>
            <button
              type='button'
              onClick={() => dispatch(openEditName())}
              className='text-sm font-medium px-4 py-2 border border-[#A0A0A0] rounded-xl lg:border-none lg:text-[#009A49]'
            >
              Edit
            </button>
          </div>

          {/* Other fields */}
          {[
            {
              label: 'Cost Price',
              value:
                selectedItem?.buying_price || selectedItem?.cost_price || 'N/A',
              editable: true,
            },
            {
              label: 'Sell Price',
              value:
                selectedItem?.buying_price || selectedItem?.sell_price || 'N/A',
              editable: true,
            },
            {
              label: 'Discount',
              value: selectedItem?.discount || 'Not Set',
              editable: false,
            },
            {
              label: 'Available',
              value: selectedItem?.stock || selectedItem?.quantity || 'N/A',
              editable: true,
            },
            {
              label: 'Quantity Sold',
              value:
                selectedItem?.original_quantity ||
                selectedItem?.sold ||
                'Not Set',
              editable: false,
            },
            {
              label: 'Image',
              value: selectedItem?.image ? 'Image Set' : 'Not Set',
              editable: true,
            },
          ].map((item) => (
            <div
              key={Math.random()}
              className='flex justify-between items-center p-3 mb-3 rounded-md bg-[#F8FAFB]'
            >
              <div>
                <p className='text-[#717171] text-sm'>{item.label}</p>
                <p className='text-[#2A2A2A] font-medium'>{item.value}</p>
              </div>
              {item.editable && (
                <button
                  type='button'
                  onClick={() => {
                    if (item.label === 'Image') {
                      dispatch(openImageUploader());
                    } else if (item.label.includes('Price')) {
                      dispatch(openEditPrice());
                    } else if (item.label === 'Available') {
                      dispatch(openEditQuantity());
                    }
                  }}
                  className='text-sm font-medium px-4 py-2 border border-[#A0A0A0] rounded-xl lg:border-none lg:text-[#009A49]'
                >
                  {item.label === 'Image' ? 'Add' : 'Edit'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Mobile buttons */}
        <div className='lg:hidden p-4 border-t border-[#E9EEF3] sticky bottom-0 bg-white'>
          <Button className='w-full mb-3 bg-gray-200 text-gray-800 hover:bg-gray-300 h-12'>
            Save
          </Button>
          <Button className='w-full bg-white text-red-600 border border-red-600 hover:bg-red-50 h-12'>
            Delete Stock
          </Button>
        </div>
      </div>

      {isEditImageModalOpen && (
        <EditImage
          isOpen={isEditImageModalOpen}
          itemName={selectedItem.name}
          existingImages={selectedItem.images || []}
          onCancel={() => dispatch(closeEditImageModal())}
          onSave={handleSaveImages}
          onDeleteImage={() => void 0}
        />
      )}

      {isEditModalOpen && (
        <EditStockV3Modal
          isOpen={isEditModalOpen}
          item={selectedItem}
          onClose={() => dispatch(closeEditModal())}
          onSave={(updatedItem) => {
            dispatch(saveItem(updatedItem));
            dispatch(closeEditModal());
          }}
          openSuccessModal={() => dispatch(openSuccessModal())}
        />
      )}

      {isEditQuantityOpen && (
        <EditQuantityModal
          isOpen={isEditQuantityOpen}
          item={selectedItem}
          onClose={() => dispatch(closeEditQuantity())}
          onSave={(updatedItem) => {
            dispatch(saveItem(updatedItem));
            dispatch(closeEditQuantity());
          }}
          openSuccessModal={() => dispatch(openSuccessModal())}
        />
      )}

      {isSuccessModalOpen && (
        <EditSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => dispatch(closeSuccessModal())}
        />
      )}

      {isEditPriceOpen && (
        <EditPriceModal
          isOpen={isEditPriceOpen}
          onClose={() => dispatch(closeEditPrice())}
          item={selectedItem}
          openSuccessModal={() => dispatch(openSuccessModal())}
          onSave={handleSavePrice}
        />
      )}

      {isEditNameOpen && (
        <EditStockName
          isOpen={isEditNameOpen}
          item={selectedItem}
          onClose={() => dispatch(closeEditName())}
          onSave={(updatedItem) => {
            dispatch(saveItem(updatedItem));
            dispatch(closeEditName());
          }}
          openSuccessModal={() => dispatch(openSuccessModal())}
        />
      )}

      <ImageUploader
        isOpen={isImageUploaderOpen}
        itemName={selectedItem.name}
        existingImages={selectedItem.images || []}
        onSave={handleSaveImages}
        onCancel={() => dispatch(closeImageUploader())}
      />
    </>
  );
};
export default Sidebar;
