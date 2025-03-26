'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { useStorage } from '@/lib/helpers/manage-store';
import { useEffect } from 'react';

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
  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .refine(
      (val) => !Number.isNaN(Number(val)) && Number(val) >= 1,
      'Must be at least 1'
    ),
  currency_code: z.string().min(1, 'Currency is required'),
  product_id: z.string().min(1, 'Product ID is required'),
  organization_id: z.string().min(1, 'Organization ID is required'),
});

export const currencies = [
  {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    flag: '/modal-images/nigerian-flag.svg',
  },
  {
    code: 'EGP',
    symbol: 'ج.م',
    name: 'Egyptian Pound',
    flag: '/modal-images/egyptian-flag.svg',
  },
  {
    name: 'Ethiopian Birr',
    code: 'ETB',
    symbol: 'Br',
    flag: '/modal-images/ethiopia-flag.svg',
  },
  {
    name: 'Ghanaian Cedi',
    code: 'GHS',
    symbol: '₵',
    flag: '/modal-images/ghana-flag.svg',
  },
  {
    name: 'Indian Rupee',
    code: 'INR',
    symbol: '₹',
    flag: '/modal-images/india-flag.svg',
  },
  {
    name: 'Kenyan Shilling',
    code: 'KES',
    symbol: 'KSh',
    flag: '/modal-images/kenya-flag.svg',
  },
];

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StockResponse) => void;
}

function AddStockModal({ isOpen, onClose, onSave }: AddStockModalProps) {
  const [addStock, { isLoading }] = useAddStockMutation();
  const { getAccessToken } = useStorage();
  const { orgId } = useAppSelector((state) => state.auth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      buying_price: '',
      quantity: '1',
      currency_code: 'NGN',
      product_id: 'default-product-id',
      organization_id: orgId || 'default-org-id',
    },
  });

  // Reset form when opening or when organizationId changes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: '',
        buying_price: '',
        quantity: '1',
        currency_code: 'NGN',
        product_id: 'default-product-id',
        organization_id: orgId || 'default-org-id',
      });
    }
  }, [isOpen, form.reset, orgId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Verify authentication before proceeding
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw { status: 401, data: { detail: 'No access token found' } };
      }

      const payload = {
        ...values,
        buying_price: Number(values.buying_price),
        quantity: Number(values.quantity),
        date_created: new Date().toISOString(),
      };

      const response = await addStock(payload).unwrap();
      onSave(response);
      form.reset();
      onClose();
    } catch (error: any) {
      console.error('Failed to add stock:', error);
      if (error?.status === 401) {
        alert('Your session has expired. Please log in again.');
      } else {
        alert(
          (error as any)?.data?.detail ||
            'Failed to add stock. Please try again.'
        );
      }
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Add New Stock</h2>
          <Button variant='ghost' size='icon' onClick={onClose}>
            <FaTimes />
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='buying_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='0.00'
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || !Number.isNaN(Number(value))) {
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
                name='currency_code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select currency' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.name} ({currency.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <div className='flex gap-2'>
                    <Button
                      type='button'
                      variant='outline'
                      size='icon'
                      onClick={() => {
                        const current = Number(field.value) || 1;
                        field.onChange(String(Math.max(1, current - 1)));
                      }}
                    >
                      <FaMinus />
                    </Button>
                    <FormControl>
                      <Input
                        type='number'
                        className='text-center'
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || !Number.isNaN(Number(value))) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <Button
                      type='button'
                      variant='outline'
                      size='icon'
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

            <div className='flex justify-end gap-2 pt-4'>
              <Button variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Stock'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddStockModal;
