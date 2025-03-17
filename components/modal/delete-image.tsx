"use client";

import { FaTimes } from "react-icons/fa";
import Image from "next/image";

interface DeleteImageProps {
  image: { id: string; src: string };
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteImage({
  image,
  isOpen,
  onDelete,
  onCancel,
}: DeleteImageProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-between z-50">
        {/* Modal Container */}
        <div className="bg-white w-full h-screen max-h-[1000px] mx-auto sm:h-auto sm:max-w-lg sm:rounded-lg space-y-[167px] md:space-y-0 overflow-auto">
            <div className="flex flex-col md:items-end justify-around w-full">
              <div className="flex md:hidden my-4 mx-auto">
                  <img src="/modal-images/text_logo.svg" alt="shop desk logo" />
              </div>

              

              {/* Header */}
              <div className="flex justify-between items-center mb-4 p-6">
                <h2 className="text-xl font-medium md:hidden">Remove Stock Image</h2>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onCancel}
                  className="p-2 text-gray-500 hover:text-gray-700 border border-[#1B1B1B] rounded-lg"
                >
                  <FaTimes size={17} />
                </button>
              </div>


              <div className="flex flex-col items-center justify-around w-full p-2">
                  <div className="flex flex-col mx-auto gap-2 mb-6 items-center">
                    <img src="/icons/trash_icon.svg" alt="trash icon" className="hidden md:block h-7 w-7" />
                    <h1 className="text-2xl font-medium">Delete Image</h1>
                  </div>
                  
                  {/* Confirmation Message */}
                  <p className="text-gray-600 mb-6 sm:hidden text-center">
                    Are you sure you want to delete this image? You will not be able to
                    get this image back.
                  </p>
                  <p className="text-gray-600 mb-6 hidden sm:block text-center">
                    Are you sure you want to remove this image?
                  </p>

                  {/* Image Preview */}
                  <div className="mb-6">
                    <Image
                      src={image.src}
                      alt="Image to be deleted"
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
            </div>
            
            

              {/* Footer Buttons */}
              <div className="flex md:flex-row flex-col gap-5 w-full border-none md:border-t border-[#DEE5ED] p-6">
                <button
                  onClick={onCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 md:flex-1 "
                >
                  Cancel
                </button>
                <button
                  onClick={onDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 md:flex-2 md:w-3/4"
                >
                  Delete
                </button>
              </div>          
        </div>
      </div>
    </>
  );
}