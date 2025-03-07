"use client";

import { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";

interface EditStockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditStockModal: FC<EditStockModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <Image src="/icons/edit-stock.svg" alt="" width={24} height={24} />
          <DialogTitle className="text-lg font-semibold">Edit Your Stock</DialogTitle>
        </div>
        
        {/* Modal Body */}
        <form className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="text-sm font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productName"
              placeholder="Solace Recliner"
              className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:border-primary"
            />
          </div>
          
          {/* Selling Price */}
          <div>
            <label htmlFor="sellingPrice" className="text-sm font-medium text-gray-700">
              Selling Price <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center px-3 py-2 border rounded-lg bg-gray-100">
                <Image src="/icons/naira.svg" alt="" width={16} height={16} />
                <span className="ml-1 text-sm">₦</span>
              </div>
              <input
                type="text"
                id="sellingPrice"
                placeholder="156,000"
                className="flex-1 px-3 py-2 border rounded-lg outline-none focus:border-primary"
              />
            </div>
          </div>
          
          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="text"
                id="quantity"
                placeholder="50 QTY"
                className="w-24 text-center px-3 py-2 border rounded-lg outline-none focus:border-primary"
              />
              <button
                type="button"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStockModal;
