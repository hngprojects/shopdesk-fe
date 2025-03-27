'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAddStockMutation } from '@/redux/features/stock/stock.api';
import { useAppSelector } from '@/redux/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useStorage } from '@/lib/helpers/manage-store';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { DialogClose } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { currencies } from '@/app/(auth)/create-organization/_components/CreateOrganization';
import { Search } from 'lucide-react';

interface StockResponse {
  id: string;
  name: string;
  buying_price: number;
  quantity: number;
  currency_code: string;
  date_created: string;
}

const formSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  buying_price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !Number.isNaN(Number(val)), 'Must be a number'),
  selling_price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !Number.isNaN(Number(val)), 'Must be a number'),
  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .refine(
      (val) => !Number.isNaN(Number(val)) && Number(val) >= 1,
      'Must be at least 1'
    ),
  currency_code: z.string().min(1, 'Currency is required'),
});

interface AddStockModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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
  const [quantity, setQuantity] = useState(0);
  const [selectedSellingCurrency, setSelectedSellingCurrency] = useState(
    currencies[0]
  );

 
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productName.trim())
      newErrors.productName = "Product Name is required.";

    if (!sellingPrice) newErrors.sellingPrice = "Selling Price is required.";
    else if (isNaN(Number(sellingPrice)))
      newErrors.sellingPrice = "Selling Price must be a number.";

    if (quantity === 0) newErrors.quantity = "Quantity must be greater than 0.";

    if (skuCode.trim() && !/^[a-zA-Z0-9-]+$/.test(skuCode)) {
      newErrors.skuCode = "SKU Code must be alphanumeric.";
    }

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
        selectedSellingCurrency,
        // finalSkuCode
      );

      // Call the onSave callback with the new stock item
      onSave({
        id: newStock.id,
        name: newStock.name,
        buying_price: newStock.buying_price,
        quantity: newStock.quantity,
        currency_code: newStock.currency_code
      });

      // Reset the form fields
      setProductName("");
      setSellingPrice("");
      setQuantity(0);
      setSelectedSellingCurrency(currencies[0]);
      setSkuCode("");

      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCurrencyModal = () => {
    setCurrencyModalOpen((prev) => !prev);
  };

  const handleCurrencySelect = (currency: (typeof currencies)[0]) => {
    setSelectedSellingCurrency(currency);
    setCurrencyModalOpen(false);
  };

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
            <div className="hidden sm:block flex-shrink-0">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="item-name"
                className="block text-left font-medium text-[#717171] text-[14px]"
              >
                Product Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="item-name"
                className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal bg-white"
                placeholder="Item Name"
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="flex  gap-5 flex-1 max-[640px]:flex-col">
              <div className="flex flex-col gap-[12px] flex-1 relative group">
              {/* <div className="absolute left-0 bottom-[-30px] bg-[#2A2A2A] text-white text-[12px] py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                
              </div> */}
                <label className="font-circular-normal text-[14px] text-[#717171] text-left">
                Cost Price
                </label>
                <input
                  type="text"
                  name="Cost Price"
                  className="w-full h-[48px] md:h-[62px] rounded-[9px] p-4 outline-none border border-[#DEDEDE] placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal"
                  placeholder="Cost Price"
                  value={skuCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only alphanumeric characters and hyphens
                    if (/^[a-zA-Z0-9-]*$/.test(value)) {
                      setSkuCode(value);
                    }
                  }}
                  
                />
                {errors.skuCode && (
                  <p className="text-[#FF1925] text-sm font-circular-normal">
                    {errors.skuCode}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-[8px] flex-1 ">
                <label className="font-circular-normal text-[14px] text-[#717171] text-left">
                  Selling Price <span className="text-[#FF1925]">*</span>
                </label>
                <div
                  ref={sellingPriceDivRef}
                  className="flex border gap-[8px] rounded-[9px] m-1 relative h-[48px] md:h-[62px]"
                >
                  <div
                    className="p-2 flex gap-[8px] items-center cursor-pointer"
                    onClick={toggleCurrencyModal}
                  >
                    <Image
                      src={selectedSellingCurrency.flag}
                      alt={`${selectedSellingCurrency.name} Flag`}
                      className="w-5 h-5 md:w-6 md:h-6"
                      width={20}
                      height={20}
                    />
                    <span className="text-[20px] text-center text-[#595959]">
                      {selectedSellingCurrency.symbol}
                    </span>
                    <FaChevronDown className="w-[10px] h-[10px] text-[#888888]" />
                  </div>
                  <div className="h-8 border border-gray self-center"></div>
                  <div className="w-full">
                    <input
                      type="number"
                      name="selling-price"
                      className="w-full h-full p-3 outline-none placeholder:text-[#B8B8B8] text-[#2A2A2A] text-base font-circular-normal"
                      placeholder="Amount"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      required
                    />
                  </div>

                  {isCurrencyModalOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full left-0 w-[298px] bg-white rounded-lg backdrop-blur-sm border shadow-lg z-10"
                    >
                      <div className="relative w-full p-4">
                        <input
                          type="text"
                          name="item-name"
                          className="w-full rounded-[10px] p-2 pl-[48px] outline-none placeholder:text-[#B8B8B8] text-[16px] border bg-white"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          required
                        />
                        <FaSearch className="absolute left-[32px] top-1/2 transform -translate-y-1/2 text-[#B8B8B8] w-[20px] h-[20px]" />
                      </div>

                      <div className="h-[200px] overflow-y-auto custom-scrollbar px-[20px] py-3 ">
                        {filteredCurrencies.map((currency) => (
                          <div
                            key={currency.code}
                            className="flex items-center p-2 hover:bg-gray-100 w-full cursor-pointer"
                            onClick={() => handleCurrencySelect(currency)}
                          >
                            <img
                              src={currency.flag}
                              alt={`${currency.name} Flag`}
                              className="w-8 h-8 rounded-full object-cover mr-3"
                            />
                            <div>
                              <p className="text-[14px] font-circular-normal">
                                {currency.name} ({currency.code}){" "}
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
                  <p className="text-[#FF1925] text-sm font-circular-normal">
                    {errors.sellingPrice}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className="font-circular-normal text-[14px] text-[#1B1B1B] text-left">
                Quantity <span className="text-[#FF1925]">*</span>
              </label>
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
                    className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal text-center"
                    placeholder="Quantity"
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
            />

            <div className='flex justify-end gap-2 pt-4'>
              <DialogClose asChild>
                <Button
                  variant='outline'
                  className='w-full h-auto md:w-auto bg-white border md:border-[#1B1B1B] border-[#E50000] md:text-black text-[#FF000D] px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]'
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type='submit'
                className='w-full h-auto md:w-auto px-[24px] py-[12px] rounded-[12px] border bg-black text-white border-black'
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Stock'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddStockModal;
