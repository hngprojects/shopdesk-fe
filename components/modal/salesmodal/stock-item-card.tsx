import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveItem, setSelectedItems } from "@/redux/slicer";
import type { StockItemResponse } from "@/types/stocks";
import type React from "react";

interface ItemCardProps {
  item: StockItemResponse;
  index: number;
  cardColors: { [key: number]: string };
  textColors: { [key: number]: string };
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  index,
  cardColors,
  textColors,
}) => {
  const dispatch = useAppDispatch();
  const { selectedItems, activeItem } = useAppSelector((state) => state.sales);

  const isActive = activeItem === Number(item.id);

  const handleClick = () => {
    dispatch(setActiveItem(Number(item.id)));
    const existingItem = selectedItems.find((i) => String(i.id) === item.id);
    if (existingItem) {
      dispatch(
        setSelectedItems(selectedItems.filter((i) => String(i.id) !== item.id))
      );
    } else {
      dispatch(
        setSelectedItems([...selectedItems, { ...item, available_quantity: 1 }])
      );
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleClick}
      className={`relative flex flex-col items-center justify-center h-[270px] rounded-md border cursor-pointer font-circular-std font-medium text-lg leading-7 tracking-normal transition-all duration-200 overflow-hidden ${
        isActive ? "border-2 border-[#D0D0D0]" : "border-gray-300"
      }`}
      style={{
        backgroundColor: isActive ? "#FFFFFF" : cardColors[Number(item.id)],
        boxShadow: "0px 4px 4px 0px rgba(211, 211, 211, 0.33)",
      }}
    >
      <div
        className={`absolute top-0 left-0 right-0 flex items-center justify-between p-3 border-b ${
          isActive ? "bg-[#f6f8fa] border-[#D0D0D0]" : "border-white"
        }`}
        style={{
          color: isActive ? "#a0a0a0" : textColors[Number(item.id)],
        }}
      >
        <span className="text-sm font-medium">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-sm font-medium">{`${item.available_quantity} left`}</span>
      </div>
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <p className="text-3xl font-medium mb-2">{item.name}</p>
        <p className="text-3xl font-normal">
          {item.current_price[0]?.NGN[0] || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
