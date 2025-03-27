'use client';

import type { SalesItem } from '@/store/useStore';
import type { StockItem } from '@/types/stocks';
import { Plus, Search } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Label } from '../ui/label';

interface SalesTabProps {
  onAddSale: (sale: SalesItem) => void;
  salesItems: SalesItem[];
  stockItems: StockItem[];
}

const SalesTab: React.FC<SalesTabProps> = ({
  onAddSale,
  salesItems,
  stockItems,
}) => {
  const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<StockItem | null>(
    null
  );
  const [quantitySold, setQuantitySold] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sales items based on search query
  const filteredSalesItems = salesItems.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSale = () => {
    if (!selectedProduct) {
      return;
    }

    const newSale: SalesItem = {
      sale_id: uuidv4(),
      product_id: selectedProduct.product_id,
      product_name: selectedProduct.name,
      quantity_sold: quantitySold,
      price_per_unit: selectedProduct.price,
      total_amount: selectedProduct.price * quantitySold,
      sale_date: new Date().toISOString(),
    };

    onAddSale(newSale);
    setIsAddSaleModalOpen(false);
    setSelectedProduct(null);
    setQuantitySold(1);
  };

  return (
    <div className='w-full'>
      {/* Search and Add Sale Button */}
      <div className='flex justify-between items-center mb-4'>
        <div className='relative w-[327px] max-[800px]:w-full'>
          <input
            type='text'
            placeholder='Search sales...'
            className='h-12 border w-full rounded-md focus:outline-2 focus:outline-[#009A49] px-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className='text-[#667085] absolute top-3 left-3' />
        </div>

        <button
          type='button'
          onClick={() => setIsAddSaleModalOpen(true)}
          className='btn-primary flex items-center gap-2'
        >
          <Plus size={16} /> Add Sale
        </button>
      </div>

      {/* Sales Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Product
              </th>
              <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Quantity
              </th>
              <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Price
              </th>
              <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Total
              </th>
              <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredSalesItems.length > 0 ? (
              filteredSalesItems.map((sale) => (
                <tr key={sale.sale_id}>
                  <td className='py-4 px-4 whitespace-nowrap'>
                    {sale.product_name}
                  </td>
                  <td className='py-4 px-4 whitespace-nowrap'>
                    {sale.quantity_sold}
                  </td>
                  <td className='py-4 px-4 whitespace-nowrap'>
                    ₦{sale.price_per_unit.toLocaleString()}
                  </td>
                  <td className='py-4 px-4 whitespace-nowrap'>
                    ₦{sale.total_amount.toLocaleString()}
                  </td>
                  <td className='py-4 px-4 whitespace-nowrap'>
                    {new Date(sale.sale_date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className='py-4 px-4 text-center text-gray-500'>
                  No sales records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Sale Modal */}
      {isAddSaleModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>Add New Sale</h2>

            <div className='mb-4'>
              <Label className='block text-sm font-medium text-gray-700 mb-1'>
                Select Product
              </Label>
              <select
                className='w-full border border-gray-300 rounded-md p-2'
                value={selectedProduct?.product_id || ''}
                onChange={(e) => {
                  const product = stockItems.find(
                    (item) => item.product_id === e.target.value
                  );
                  setSelectedProduct(product || null);
                }}
              >
                <option value=''>Select a product</option>
                {stockItems.map((item) => (
                  <option key={item.product_id} value={item.product_id}>
                    {item.name} (Available: {item.quantity})
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <Label className='block text-sm font-medium text-gray-700 mb-1'>
                Quantity
              </Label>
              <input
                type='number'
                min='1'
                max={selectedProduct?.quantity || 1}
                value={quantitySold}
                onChange={(e) =>
                  setQuantitySold(Number.parseInt(e.target.value))
                }
                className='w-full border border-gray-300 rounded-md p-2'
              />
            </div>

            {selectedProduct && (
              <div className='mb-4'>
                <p className='text-sm text-gray-600'>
                  Price per unit: ₦{selectedProduct.price.toLocaleString()}
                </p>
                <p className='text-sm font-semibold'>
                  Total: ₦
                  {(selectedProduct.price * quantitySold).toLocaleString()}
                </p>
              </div>
            )}

            <div className='flex justify-end gap-2 mt-6'>
              <button
                type='button'
                onClick={() => setIsAddSaleModalOpen(false)}
                className='px-4 py-2 border border-gray-300 rounded-md text-gray-700'
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handleAddSale}
                disabled={!selectedProduct}
                className='px-4 py-2 bg-[#009A49] text-white rounded-md disabled:opacity-50'
              >
                Add Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesTab;
