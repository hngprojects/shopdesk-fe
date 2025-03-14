'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaTimes, FaMinus, FaPlus } from 'react-icons/fa'
import { editName } from '@/services/stock'
import { StockItem } from '@/app/(dashboard)/dashboard/page'

interface EditStockNameProps {
  isOpen: boolean
  onClose: () => void
  item: StockItem | null
  onSave: (updatedItem: StockItem) => void
  openSuccessModal: () => void
}

export default function EditStockName({
  isOpen,
  onClose,
  item,
  onSave,
  openSuccessModal,
}: EditStockNameProps) {
  if (!isOpen || !item) return null // Don't render if modal is closed or item is null

  const [productName, setProductName] = useState(item.name)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!productName.trim()) newErrors.productName = 'Product Name is required.'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const isFormValid = () => {
    return productName
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    if (validateForm()) {
      try {
        await editName(item.id, {
          name: productName,
        })
        onSave({
          ...item,
          name: productName,
        })

        onClose()
        setTimeout(() => {
          openSuccessModal()
        }, 1000)
      } catch (error) {
        console.error('Failed to update stock:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full border border-[#A0A0A0] max-w-[564px] flex flex-col gap-[28px]">
        <div className="p-6 gap-5 flex flex-col">
          <div className="flex gap-2.5">
            <div className="flex p-2 ">
              <div className="bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center">
                <Image
                  src="/modal-images/bank.svg"
                  alt="Edit Name"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="flex-grow h-full py-2">
              <h1 className="font-circular-medium text-[24px] text-left">
                Edit Your Stock Name
              </h1>
            </div>
            <div className="flex-shrink-0">
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
              {/*}  <label
                htmlFor="item-name"
                className="block text-left font-circular-normal font-medium text-[#717171] text-[14px]"
              >
                Product Name
              </label>*/}
              <input
                type="text"
                name="item-name"
                className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal bg-white"
                placeholder="Item Name"
                value={productName ?? ''}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
              {errors.productName && (
                <p className="text-[#FF1925] text-sm font-circular-normal">
                  {errors.productName}
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
                      ? 'bg-black text-white border-black'
                      : 'bg-[#D0D0D0] text-[#F1F1F1] border-[#B8B8B8]'
                  }`}
                  disabled={!isFormValid()}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
