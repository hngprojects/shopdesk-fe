"use client";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessReceiptModal({
  isOpen,
  onClose,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[651px]  border border-[#A0A0A0] flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center relative">
          <div className="w-full flex justify-center">
            <div className="bg-[#CCEBDB] p-2 rounded-[8px] flex items-center justify-center">
              <Image
                src="/modal-images/printer.svg"
                alt="Complete Sale"
                className=""
                width={32}
                height={32}
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0] absolute right-0"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl leading-9 font-circular-medium text-[#1B1B1B]">
            Receipt has been printed successfully
          </h2>
          <p className="text-[#717171] text-lg leading-7">
            Receipt for Adaobi Micheal has been printed successfully
          </p>
        </div>

        <div className="flex justify-center w-full">
          <button
            onClick={onClose}
            className="bg-black text-white cursor-pointer px-[64px] py-[12px] gap-[6px] w-full rounded-[12px] border border-{#1B1B1B] bg-[#2A2A2A] [hover:bg-[#333333] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
