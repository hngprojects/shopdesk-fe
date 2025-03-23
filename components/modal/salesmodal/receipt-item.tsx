// components/ReceiptItem.tsx
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedItems } from '../redux/salesSlice';
import { RootState } from '../redux/store';

interface ReceiptItemProps {
  stockItem: StockItem;
}

const ReceiptItem: React.FC<ReceiptItemProps> = ({ stockItem }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.sales.selectedItems);
  const selectedItem = selectedItems.find((item) => item.id === stockItem.id);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 0) return;
    dispatch(
      setSelectedItems(
        selectedItems.map((item) =>
          item.id === stockItem.id ? { ...item, quantity: newQuantity } : item
        )
      )
    );
  };

  if (!selectedItem) return null;

  return (
    <div className="flex items-center justify-between py-2">
      <span className="font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal">
        {stockItem.name}
      </span>
      <div className="flex items-center gap-4">
        <span className="font-sans text-lg font-medium leading-7 tracking-normal">
          ${stockItem.buying_price || 'N/A'}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleQuantityChange(selectedItem.quantity - 1)}
            disabled={selectedItem.quantity === 0}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] font-sans text-lg font-medium leading-7 tracking-normal">
            {selectedItem.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(selectedItem.quantity + 1)}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptItem;