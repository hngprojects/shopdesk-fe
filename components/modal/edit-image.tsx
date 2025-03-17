"use client";

import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import DeleteImage from "./delete-image";

interface EditImageProps {
  existingImages: { id: string; src: string }[];
  onSave: (images: { id: string; src: string }[]) => void;
  itemName: string;
  onDeleteImage: (imageId: string) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function EditImage({
  itemName,
  existingImages,
  onDeleteImage,
  onSave,
  onCancel,
  isOpen,
}: EditImageProps) {
  const [images, setImages] = useState(existingImages);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<{ id: string; src: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const validFormats = ["image/jpeg", "image/png"];
    const files = Array.from(event.target.files);

    const invalidFiles = files.filter((file) => !validFormats.includes(file.type));

    if (invalidFiles.length) {
      setError("Invalid file format. Please upload a valid image file.");
      return;
    }

    setError(null);

    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      src: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 3));
  };

  const handleDeleteClick = (image: { id: string; src: string }) => {
    setImageToDelete(image);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (imageToDelete) {
      const updatedImages = images.filter((image) => image.id !== imageToDelete.id);
      setImages(updatedImages);
      onSave(updatedImages);
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Modal Container */}
        <div className="bg-white w-full h-screen max-h-[900px] mx-auto sm:h-auto md:max-w-xl lg:max-w-3xl sm:rounded-lg overflow-auto flex flex-col justify-between">
          <div className="flex flex-col  justify-around w-full p-6 md:space-y-5 space-y-7 flex-2">
              <div className="flex md:hidden my-4 mx-auto">
                  <img src="/modal-images/text_logo.svg" alt="shop desk logo" />
              </div>
            
            
            {/* Header */}
            <div className="flex justify-between items-center border-b-[1px] border-[#DEE5ED] md:border-b-0">
              <div className="flex gap-2 items-center ">
                <Image
                  src="/modal-images/image-icon.svg"
                  alt="image icon"
                  width={48}
                  height={48}
                  className="w-12 h-12 hidden md:inline-flex"
                />
                <h2 className="text-xl font-medium hidden md:inline">Edit Stock Images</h2>
                <h2 className="text-xl font-medium md:hidden">Upload Image</h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onCancel}
                className="p-2 text-gray-500 hover:text-gray-700 bg-[#E9EEF3] rounded-lg"
              >
                <FaTimes size={15} />
              </button>
            </div>

            {/* Item Name */}
            <div>
              <p className="md:text-gray-600 space-y-4 md:text-lg text-base">Item Name</p>
              <h3 className="md:text-2xl text-sm font-medium">{itemName}</h3>
            </div>

            {/* Image Upload Section */}
            <div className="w-full">
              <p className="md:hidden mb-2">Image <span className="text-[#FF1925]">*</span></p>
              {images.length === 0 ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-56 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  <div className="mb-2">
                    <Image
                      src="/icons/plus_icon.svg"
                      alt="Upload image"
                      width={48}
                      height={48}
                    />
                  </div>
                  <p className="text-gray-500 mb-1">
                    Upload 1 - 3 images for this product
                  </p>
                  <p className="text-sm text-gray-400">
                    Supported formats: .jpg & .png
                  </p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </div>
              ) : (
                <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Display existing images */}
                    {images.map((image, index) => (
                      <div
                        key={image.id}
                        className="relative border border-dashed border-gray-300 rounded-lg p-1 aspect-square"
                      >
                        <Image
                          src={image.src}
                          alt={`Product image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                        <button
                          onClick={() => handleDeleteClick(image)}
                          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-red-500 rounded-full border border-red-500 hover:bg-[#FFCCCF] w-6 h-6 flex items-center justify-center shadow-md"
                        >
                          <FaTimes size={14} />
                        </button>
                      </div>
                    ))}

                    {/* Add more images button (if less than 3) */}
                    {images.length < 3 && (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 aspect-square"
                      >
                        <span className="text-gray-400 text-4xl">
                          <FaTimes size={12} />
                        </span>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          multiple
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                  {/* Error Message */}
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
              )}
            </div>      
          </div>
           {/* Footer Buttons */}
          <div className="flex flex-col justify-end md:flex-row gap-5 border-t border-[#DEE5ED] p-6 flex-1">
              <button
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(images)}
                className="px-6 py-2 bg-[#1B1B1B] text-white rounded-md hover:bg-[#2A2A2A]"
              >
                Save
              </button>
            </div>
        </div>
      </div>

      {/* Delete Image Modal */}
      {imageToDelete && (
        <DeleteImage
          image={imageToDelete}
          isOpen={isDeleteModalOpen}
          onDelete={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
}