"use client";
import { currencies } from "@/app/(auth)/create-organization/_components/CreateOrganization";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreatePriceMutation } from "@/redux/features/price/price.api";
import { useCreateProductMutation } from "@/redux/features/product/product.api";
import { useAddStockMutation } from "@/redux/features/stock/stock.api";
import { useStore } from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

interface StockResponse {
  id: string;
  name: string;
  buying_price: number;
  quantity: number;
  currency_code: string;
  date_created: string;
}

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  buying_price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !Number.isNaN(Number(val)), "Must be a number"),
  selling_price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !Number.isNaN(Number(val)), "Must be a number"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine(
      (val) => !Number.isNaN(Number(val)) && Number(val) >= 1,
      "Must be at least 1"
    ),
  currency_code: z.string().min(1, "Currency is required"),
});

interface AddStockModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setIsAddStockModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

function AddStockModal({
  isOpen,
  onOpenChange,
  setIsAddStockModalOpen,
}: AddStockModalProps) {
  const [addStock, { isLoading }] = useAddStockMutation();
  const { organizationId } = useStore();
  const [createProduct] = useCreateProductMutation();
  const [createPrice] = useCreatePriceMutation();

  const [searchCurrency, setSearchCurrency] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      buying_price: "",
      quantity: "1",
      currency_code: "NGN",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const createProductData = new FormData();
    createProductData.append("organization_id", organizationId);
    createProductData.append("name", values.name);
    createProduct(createProductData)
      .unwrap()
      .then((response) => {
        console.log(response.id);
        const request = {
          name: values.name,
          buying_price: Number(values.buying_price),
          selling_price: Number(values.selling_price),
          quantity: Number(values.quantity),
          product_id: response.id,
          organization_id: organizationId,
          currency_code: values.currency_code,
        };
        const priceRequest = {
          name: values.name,
          price: +values.selling_price,
          product_id: response.id,
          organization_id: organizationId,
          currency_code: values.currency_code,
          discounted_price: +values.selling_price,
        };
        createPrice(priceRequest)
          .unwrap()
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.error(error));
        addStock(request)
          .unwrap()
          .then((response) => {
            console.log(response);
            toast.success("Stock added successfully");
            setIsAddStockModalOpen(false);
          })
          .catch((error) => {
            console.error(error);
            toast.error("An error occurred");
          });
      })
      .catch((error) => console.error(error));
  }

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchCurrency.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchCurrency.toLowerCase()) ||
      currency.symbol.includes(searchCurrency)
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        form.reset();
      }}
    >
      <DialogContent className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <DialogHeader className="flex flex-row gap-2.5 items-center">
          <div className="bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center">
            <Image
              src="/modal-images/ui-box.svg"
              alt="add stock image"
              className="size-5 sm:size-6"
              width={24}
              height={24}
            />
          </div>
          <div className="flex-grow h-full p-2">
            <h1 className="font-circular-medium text-[24px] text-left">
              Add New Stock
            </h1>
            <p className="font-circular-normal text-[14px] text-[#717171] text-left hidden md:block">
              Always know the items you have available.
            </p>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[18px] font-circular-normal bg-white"
                      placeholder="Item Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="selling_price"
                render={({ field }) => (
                  <FormItem className="flex border rounded-[9px] relative items-center focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ">
                    <FormField
                      control={form.control}
                      name="currency_code"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-none pr-0 shadow-none">
                                {field.value ? (
                                  <div className="flex items-center">
                                    <img
                                      src={
                                        currencies.find(
                                          (c) => c.code === field.value
                                        )?.flag
                                      }
                                      alt={`${field.value} Flag`}
                                      className="w-6 h-6 rounded-full object-cover mr-2"
                                    />
                                    <span>
                                      {
                                        currencies.find(
                                          (c) => c.code === field.value
                                        )?.symbol
                                      }
                                    </span>
                                  </div>
                                ) : (
                                  <SelectValue placeholder="Select currency" />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <div className="p-2 relative">
                                <Search
                                  className="text-[#667085] absolute top-1/2 -translate-y-1/2 left-3 text-lg"
                                  size={16}
                                  color="#667085"
                                />
                                <Input
                                  type="text"
                                  placeholder="Search currency..."
                                  value={searchCurrency}
                                  onChange={(e) =>
                                    setSearchCurrency(e.target.value)
                                  }
                                  className="w-full  pl-6 text-sm border rounded-md"
                                />
                              </div>

                              {/* Filtered Currency List */}
                              {filteredCurrencies.length > 0 ? (
                                filteredCurrencies.map((currency) => (
                                  <SelectItem
                                    key={currency.code}
                                    value={currency.code}
                                  >
                                    <div className="flex items-center">
                                      <img
                                        src={currency.flag}
                                        alt={`${currency.name} Flag`}
                                        className="w-6 h-6 rounded-full object-cover mr-3"
                                      />
                                      <p className="text-[14px] font-circular-normal">
                                        {currency.name} ({currency.code}){" "}
                                        <span className="ml-2">
                                          {currency.symbol}
                                        </span>
                                      </p>
                                    </div>
                                  </SelectItem>
                                ))
                              ) : (
                                <p className="p-2 text-sm text-gray-500">
                                  No results found
                                </p>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="h-6 border border-gray self-center" />
                    <FormControl>
                      <Input
                        type="number"
                        className="w-full border-none focus-within:ring-0 shadow-none h-auto px-[3px] py-[16px] outline-none placeholder:text-[#B8B8B8] text-[18px] font-circular-normal"
                        placeholder="Selling price / unit"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || !Number.isNaN(Number(value))) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buying_price"
                render={({ field }) => (
                  <FormItem className="flex border rounded-[9px] relative items-center focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ">
                    <FormField
                      control={form.control}
                      name="currency_code"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-none pr-0 shadow-none">
                                {field.value ? (
                                  <div className="flex items-center">
                                    <img
                                      src={
                                        currencies.find(
                                          (c) => c.code === field.value
                                        )?.flag
                                      }
                                      alt={`${field.value} Flag`}
                                      className="w-6 h-6 rounded-full object-cover mr-2"
                                    />
                                    <span>
                                      {
                                        currencies.find(
                                          (c) => c.code === field.value
                                        )?.symbol
                                      }
                                    </span>
                                  </div>
                                ) : (
                                  <SelectValue placeholder="Select currency" />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <div className="p-2 relative">
                                <Search
                                  className="text-[#667085] absolute top-1/2 -translate-y-1/2 left-3 text-lg"
                                  size={16}
                                  color="#667085"
                                />
                                <Input
                                  type="text"
                                  placeholder="Search currency..."
                                  value={searchCurrency}
                                  onChange={(e) =>
                                    setSearchCurrency(e.target.value)
                                  }
                                  className="w-full  pl-6 text-sm border rounded-md"
                                />
                              </div>

                              {/* Filtered Currency List */}
                              {filteredCurrencies.length > 0 ? (
                                filteredCurrencies.map((currency) => (
                                  <SelectItem
                                    key={currency.code}
                                    value={currency.code}
                                  >
                                    <div className="flex items-center">
                                      <img
                                        src={currency.flag}
                                        alt={`${currency.name} Flag`}
                                        className="w-6 h-6 rounded-full object-cover mr-3"
                                      />
                                      <p className="text-[14px] font-circular-normal">
                                        {currency.name} ({currency.code}){" "}
                                        <span className="ml-2">
                                          {currency.symbol}
                                        </span>
                                      </p>
                                    </div>
                                  </SelectItem>
                                ))
                              ) : (
                                <p className="p-2 text-sm text-gray-500">
                                  No results found
                                </p>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="h-6 border border-gray self-center" />

                    <FormControl>
                      <Input
                        type="number"
                        className="w-full border-none focus-within:ring-0 shadow-none h-auto px-[3px] py-[16px] outline-none placeholder:text-[#B8B8B8] text-[18px] font-circular-normal"
                        placeholder="Cost price / unit"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || !Number.isNaN(Number(value))) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] flex items-center justify-center border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
                      onClick={() => {
                        const current = Number(field.value) || 1;
                        field.onChange(String(Math.max(1, current - 1)));
                      }}
                    >
                      <FaMinus />
                    </Button>
                    <FormControl>
                      <Input
                        type="number"
                        className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[18px] font-circular-normal text-center"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || !Number.isNaN(Number(value))) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] flex items-center justify-center border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
                      size="icon"
                      onClick={() => {
                        const current = Number(field.value) || 1;
                        field.onChange(String(current + 1));
                      }}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-full h-auto md:w-auto bg-white border md:border-[#1B1B1B] border-[#E50000] md:text-black text-[#FF000D] px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full h-auto md:w-auto px-[24px] py-[12px] rounded-[12px] border bg-black text-white border-black"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Stock"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddStockModal;
