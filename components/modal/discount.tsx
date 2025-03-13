import { FaTimes } from "react-icons/fa";
import { useState } from "react";

interface DiscountProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    buying_price: number;
    discount_percentage?: number;
  };

  onSave: (item: {
    id: string;
    name: string;
    buying_price: number;
    discount_percentage: number;
  }) => void;
}

export default function Discount({
  isOpen,
  onClose,
  item,
  onSave,
}: DiscountProps) {
  const [discountPercentage, setDiscountPercentage] = useState<string>(
    item.discount_percentage ? item.discount_percentage.toString() : ""
  );
  const [isSaving, setIsSaving] = useState(false);

  const calculateDiscountPrice = () => {
    if (!discountPercentage || isNaN(Number(discountPercentage))) return null;
    const percentage = Number(discountPercentage);
    if (percentage < 0 || percentage > 100) return null;

    const discount = (percentage / 100) * item.buying_price;
    const discountedPrice = item.buying_price - discount;
    return discountedPrice > 0 ? discountedPrice.toFixed(2) : null;
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d{1,3}(\.\d{0,2})?$/.test(value)) {
      setDiscountPercentage(value);
    }
  };

  const formattedDiscountPrice = () => {
    const calculatedPrice = calculateDiscountPrice();
    return calculatedPrice ? `₦ ${calculatedPrice}` : "00.00";
  };

  const handleSubmit = () => {
    const calculatedPrice = calculateDiscountPrice();
    if (calculatedPrice) {
      setIsSaving(true);
      try {
        onSave({
          ...item,
          discount_percentage: Number(discountPercentage),
        });

        onClose();
      } catch (error) {
        console.error("Error saving discount:", error);
        alert("Failed to save discount. Please try again.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[718px] flex flex-col gap-4 sm:gap-[28px] overflow-hidden">
        <div className="px-3 sm:px-6 pt-3 sm:pt-4 gap-2 flex flex-col">
          <div className="flex gap-2.5 items-center">
            <div className="flex p-1 sm:p-2 items-center gap-1.5 sm:gap-2.5">
              <div className="bg-[#CCEBDB] p-1.5 sm:p-2 rounded-lg  items-center justify-center hidden sm:block">
                <img
                  src="/modal-images/discount.svg"
                  alt="add stock image"
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 "
                  width={24}
                  height={24}
                />
              </div>

              <h1 className="font-circular-medium text-xl md:text-[24px] text-left">
                {item.discount_percentage ? "Edit" : "Add"} Discount
              </h1>
            </div>
            <div className="flex-grow h-full p-2"></div>
            <div className="flex-shrink-0">
              <button
                type="button"
                aria-label="Close"
                className="p-[9px] rounded-[9px] cursor-pointer bg-[#D0D0D0] sm:border sm:border-black"
                onClick={onClose}
                disabled={isSaving}
              >
                <FaTimes className="text-[8px] sm:text-base" />
              </button>
            </div>
          </div>

          <div className="px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-0">
            <div className="flex flex-col w-full sm:w-auto gap-2.5">
              <p className="text-base sm:text-lg text-[#717171]">Item Name</p>
              <p className="font-medium capitalize text-lg sm:text-xl md:text-2xl text-[#2A2A2A] truncate max-w-[200px] sm:max-w-[220px] md:max-w-none">
                {item.name}
              </p>
            </div>
            <div className="flex flex-col w-full sm:w-auto gap-2.5">
              <p className="text-base sm:text-lg text-[#717171]">
                Actual Price
              </p>
              <p className="font-medium capitalize text-lg sm:text-xl md:text-2xl text-[#2A2A2A]">
                ₦ {item.buying_price}
              </p>
            </div>
            <div className="flex flex-col w-full sm:w-auto gap-2.5">
              <p className="text-base sm:text-lg text-[#717171]">
                Discount Price
              </p>
              <p className="font-medium capitalize text-lg sm:text-xl md:text-2xl text-[#B8B8B8] sm:text-end">
                {formattedDiscountPrice()}
              </p>
            </div>
          </div>

          <div className="px-2 flex flex-col gap-2 mt-2 sm:mt-0">
            <input
              type="text"
              name="discount-percentage"
              value={discountPercentage}
              onChange={handleDiscountChange}
              className="w-full h-[68px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none mb-7 sm:mb-0 focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[14px] sm:text-[16px] font-circular-normal bg-white"
              placeholder="Discount Percentage (%)"
              required
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="w-full bg-[#DEE5ED] h-auto sm:h-[96px] rounded-b-lg px-3 sm:px-6 md:px-10 py-4 sm:py-0 flex items-center justify-center">
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-white border border-[#1B1B1B]  sm:text-black cursor-pointer text-black px-[24px] py-[8px] rounded-[12px] hover:bg-[#D0D0D0] text-base "
              disabled={isSaving}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!calculateDiscountPrice() || isSaving}
              className="w-full sm:w-auto bg-[#2A2A2A] text-white px-[24px]  py-[8px] sm:py-[12px] rounded-[12px] disabled:bg-[#B8B8B8] disabled:cursor-not-allowed cursor-pointer text-base"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
