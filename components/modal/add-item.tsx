import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FaChevronDown,
  FaSearch,
  FaMinus,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
//import { AddStock } from "@/services/stock"; // Import the AddStock function

export const currencies = [
  {
    name: "Nigerian Naira",
    code: "NGN",
    symbol: "₦",
    flag: "/modal-images/nigeria-flag.svg",
  },
  {
    name: "Egyptian Pound",
    code: "EGP",
    symbol: "ج.م",
    flag: "/modal-images/egypt-flag.svg",
  },
  {
    name: "Ethiopian Birr",
    code: "ETB",
    symbol: "Br",
    flag: "/modal-images/ethiopia-flag.svg",
  },
  {
    name: "Ghanaian Cedi",
    code: "GHS",
    symbol: "₵",
    flag: "/modal-images/ghana-flag.svg",
  },
  {
    name: "Indian Rupee",
    code: "INR",
    symbol: "₹",
    flag: "/modal-images/india-flag.svg",
  },
  {
    name: "Kenyan Shilling",
    code: "KES",
    symbol: "KSh",
    flag: "/modal-images/kenya-flag.svg",
  },
];

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: {
    id: string; // Changed from number to string
    name: string;
    buying_price: number; // Changed from price to buying_price
    quantity: number;
    currency_code: string; // Added currency_code
  }) => void;
}

export default function AddStockModal({
  isOpen,
  onClose,
  onSave,
}: AddStockModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCurrencyModalOpen, setCurrencyModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sellingPriceDivRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [productName, setProductName] = useState("");
  const [skuCode, setSkuCode] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState('')
  const [quantity, setQuantity] = useState(0);
  const [selectedSellingCurrency, setSelectedSellingCurrency] = useState(
    currencies[0],
  )
  const [selectedCostCurrency, setSelectedCostCurrency] = useState(
    currencies[0],
  )
  const [activeDropdown, setActiveDropdown] = useState<
  'cost' | 'selling' | null
>(null)
 
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productName.trim())
      newErrors.productName = "Product Name is required.";

    if (!sellingPrice) newErrors.sellingPrice = "Selling Price is required.";
    else if (isNaN(Number(sellingPrice)))
      newErrors.sellingPrice = "Selling Price must be a number.";

    if (quantity === 0) newErrors.quantity = "Quantity must be greater than 0.";

    //if (skuCode.trim() && !/^[a-zA-Z0-9-]+$/.test(skuCode)) {
    //  newErrors.skuCode = "SKU Code must be alphanumeric.";
   // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFormValid = () => {
    return productName && sellingPrice && quantity > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // const finalSkuCode = skuCode.trim() || null;

      const newStock = await AddStock(
        productName,
        parseFloat(sellingPrice),
        quantity,
        "79dc8c9167fe48e39ee3088bff7f9d3f", // Hardcoded product_id
        selectedSellingCurrency.code,
        "160db8736a9d47989381e01a987e4413", // Hardcoded organization_id
        new Date().toISOString(),
        selectedSellingCurrency
        // finalSkuCode
      );

      // Call the onSave callback with the new stock item
      onSave({
        id: newStock.id,
        name: newStock.name,
        buying_price: newStock.buying_price,
        quantity: newStock.quantity,
        currency_code: newStock.currency_code,
      });

      // Reset the form fields
      setProductName("");
      setSellingPrice("");
      setQuantity(0);
      setSelectedSellingCurrency(currencies[0]);
      //setSkuCode("");

      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCurrencyModal = (dropdown: 'cost' | 'selling') => {
    setActiveDropdown(dropdown)
    setCurrencyModalOpen(!isCurrencyModalOpen)
  }

  const handleCurrencySelect = (currency: typeof currencies[0]) => {
    if (activeDropdown === 'cost') {
      setSelectedCostCurrency(currency)
    } else if (activeDropdown === 'selling') {
      setSelectedSellingCurrency(currency)
    }
    setCurrencyModalOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        sellingPriceDivRef.current &&
        !sellingPriceDivRef.current.contains(event.target as Node)
      ) {
        setCurrencyModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[720px] flex flex-col gap-[28px]">
        <div className="p-6 gap-5 flex flex-col">
          <div className="flex gap-2.5 items-center sm:items-start">
            <div className="flex p-2 ">
              <div className="bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center">
                <Image
                  src="/modal-images/ui-box.svg"
                  alt="add stock image"
                  className="size-5 sm:size-6"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="flex-grow h-full p-2">
              <h1 className="font-circular-medium text-[24px] text-left">
                Add New Stock
              </h1>
              <p className="font-circular-normal text-[14px] text-[#717171] text-left hidden md:block">
                Always know the items you have available.
              </p>
            </div>
            <div className=" flex-shrink-0">
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[28px]">
            <div className="flex flex-col gap-2">
             {/*} <label
                htmlFor="item-name"
                className="block text-left font-medium text-[#717171] text-[14px]"
              >
                Product Name <span className="text-red-600">*</span>
              </label>
              */}
              <input
                type="text"
                name="item-name"
                className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[18px] font-circular-normal bg-white"
                placeholder="Item Name"
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            
 
  <div className="flex flex-col md:flex-row gap-[18px] justify-between">
   {/* this is the cost */}
  <div className="flex-1">
    <div className="flex border rounded-[9px] relative">
      <div
        className="p-2 flex gap-[8px] items-center cursor-pointer"
        onClick={() => toggleCurrencyModal('cost')}
      >
        <Image
          src={selectedCostCurrency.flag}
          alt={`${selectedCostCurrency.name} Flag`}
          className=""
          width={20}
          height={18}
        />
        <span className="text-[20px] text-center text-[#595959]">
          {selectedCostCurrency.symbol}
        </span>
        <FaChevronDown className="w-[20px] h-[20px] text-[#888888]" />
      </div>
      <div className="h-6 border border-gray self-center mx-2"></div>
      <div className="flex-1">
        <input
          type="text"
          name="cost-price"
          className="w-full px-[3px] py-[16px] outline-none placeholder:text-[#B8B8B8] text-[18px] font-circular-normal"
          placeholder="Cost price / unit"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
        />
      </div>

      {isCurrencyModalOpen && activeDropdown === 'cost' && (
        <div className="absolute top-full left-0 mt-2 w-[300px] bg-white rounded-lg backdrop-blur-sm border z-50">
          <div className="relative w-full p-4">
            <input
              type="text"
              name="search"
              className="w-full rounded-[10px] p-2 pl-[48px] outline-none placeholder:text-[#B8B8B8] text-[16px] border bg-white"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <FaSearch className="absolute left-[32px] top-1/2 transform -translate-y-1/2 text-[#B8B8B8] w-[20px] h-[20px]" />
          </div>

          <div className="h-[200px] overflow-y-auto px-4 bg-[#FFFFFF]">
            {filteredCurrencies.map((currency) => (
              <div
                key={currency.code}
                className="flex items-center p-2 hover:bg-gray-200 cursor-pointer border-b-1 px-2"
                onClick={() => handleCurrencySelect(currency)}
              >
                <img
                  src={currency.flag}
                  alt={`${currency.name} Flag`}
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="text-[14px] font-circular-normal">
                    {currency.name} ({currency.code}){' '}
                    <span className="ml-2">{currency.symbol}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    {/* Error message for Cost Price
    {errors.costPrice && (
      <p className="text-[#FF1925] text-[14px] font-circular-normal text-left mt-1">
        {errors.costPrice}
      </p>
    )}
       */}
  </div>

  {/* THIS is the selling seciton */}
  <div className="flex-1">
    <div className="flex border rounded-[9px] relative">
      <div
        className="p-2 flex gap-[8px] items-center cursor-pointer"
        onClick={() => toggleCurrencyModal('selling')}
      >
        <Image
          src={selectedSellingCurrency.flag}
          alt={`${selectedSellingCurrency.name} Flag`}
          className=""
          width={20}
          height={18}
        />
        <span className="text-[20px] text-center text-[#595959]">
          {selectedSellingCurrency.symbol}
        </span>
        <FaChevronDown className="w-[20px] h-[20px] text-[#888888]" />
      </div>
      <div className="h-6 border border-gray self-center mx-2"></div>
      <div className="flex-1">
        <input
          type="text"
          name="selling-price"
          className="w-full px-[3px] py-[16px] outline-none placeholder:text-[#B8B8B8] text-[18px] font-circular-normal"
          placeholder="Selling price / unit"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          required
        />
      </div>

      {isCurrencyModalOpen && activeDropdown === 'selling' && (
        <div className="absolute top-full left-0 mt-2 w-[300px] bg-white rounded-lg backdrop-blur-sm border z-50">
          <div className="relative w-full p-4">
            <input
              type="text"
              name="quesry"
              className="w-full rounded-[10px] p-2 pl-[48px] outline-none placeholder:text-[#B8B8B8] text-[16px] border bg-white"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <FaSearch className="absolute left-[32px] top-1/2 transform -translate-y-1/2 text-[#B8B8B8] w-[20px] h-[20px]" />
          </div>

          <div className="h-[200px] overflow-y-auto custom-scrollbar px-[20px] hover:bg-gray-200 bg-[#FFFFFF]">
            {filteredCurrencies.map((currency) => (
              <div
                key={currency.code}
                className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => handleCurrencySelect(currency)}
              >
                <img
                  src={currency.flag}
                  alt={`${currency.name} Flag`}
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="text-[14px] font-circular-normal">
                    {currency.name} ({currency.code})
                    <span className="ml-2">{currency.symbol}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    {errors.sellingPrice && (
      <p className="text-[#FF1925] text-[14px] font-circular-normal text-left mt-1">
        {errors.sellingPrice}
      </p>
    )}
  </div>
</div>
  
            <div className="flex flex-col gap-[8px]">
            {/* <label className="font-circular-normal text-[14px] text-[#1B1B1B] text-left">
                Quantity <span className="text-[#FF1925]">*</span>
              </label>*/}
              <div className="flex items-center gap-[8px]">
                <button
                  type="button"
                  aria-label="Decrease Quantity"
                  className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] flex items-center justify-center border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
                  onClick={decrement}
                >
                  <FaMinus className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <div className="flex-grow relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[18px] font-circular-normal text-center"
                    placeholder="Quantity Available"
                    value={quantity === 0 ? "" : quantity}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (/^\d*$/.test(value)) {
                        setQuantity(value === "" ? 0 : parseInt(value, 10));
                        setErrors((prev) => ({ ...prev, quantity: "" }));
                      } else {
                        setErrors((prev) => ({
                          ...prev,
                          quantity: "Please enter a valid number.",
                        }));
                      }
                    }}
                    required
                  />
                </div>

                <button
                  type="button"
                  aria-label="Increase Quantity"
                  className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] flex items-center justify-center border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
                  onClick={increment}
                >
                  <FaPlus className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
              {errors.quantity && (
                <p className="text-[#FF1925] text-[14px] font-circular-normal text-left mt-1">
                  {errors.quantity}
                </p>
              )}
            </div>

            <div className="md:bg-[#F6F8FA] md:border md:border-[#DEE5ED] rounded-bl-[12px] rounded-br-[12px] w-full p-4">
              <div className="flex flex-col-reverse md:flex-row justify-end gap-4 w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full md:w-auto bg-white border md:border-[#1B1B1B] border-[#E50000] md:text-black text-[#FF000D] px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-full md:w-auto px-[24px] py-[12px] rounded-[12px] border ${
                    isFormValid()
                      ? "bg-black text-white border-black"
                      : "bg-[#D0D0D0] text-[#F1F1F1] border-[#B8B8B8]"
                  }`}
                  disabled={!isFormValid() || isLoading}
                >
                  <span className="md:hidden">Save</span>

                  <span className="hidden md:inline">
                    {isLoading ? "Adding..." : "Add Stock"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
