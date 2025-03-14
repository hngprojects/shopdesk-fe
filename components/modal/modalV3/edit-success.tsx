'use client'
import Image from 'next/image'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EditSuccessModal({
  isOpen,
  onClose,
}: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[350px]  border border-[#A0A0A0] flex flex-col gap-4 p-6">
        <div className="flex justify-center">
          <Image
            src="/modal-images/ui-check.svg"
            alt="Success"
            width={64}
            height={64}
            className="w-16 h-16"
          />
        </div>

        <h2 className="text-center text-[20px] font-circular-medium text-[#1B1B1B]">
          Stock details updated successfully.
        </h2>

        <hr className="border-t border-[#DEE5ED" />

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-black text-white px-[64px] py-[12px] gap-[6px] rounded-[12px] border border-{#1B1B1B] bg-[#2A2A2A] [hover:bg-[#333333] transition-all"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}
