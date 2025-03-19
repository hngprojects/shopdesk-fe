"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

interface SuccessEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  message?: string;
}

export default function SuccessEmailModal({
  isOpen,
  onClose,
  email = "Mark.M@gmail.com",
  message = "Stock data PDF has been sent to",
}: SuccessEmailModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#24242433] flex items-center justify-center p-4 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[603px] flex flex-col items-center p-6 relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg border border-[#1B1B1B] hover:bg-gray-100"
          aria-label="Close"
        >
          <FaTimes size={14} />
        </button>
        
        {/* Email icon */}
        <div className="bg-[#CCEBDB] rounded-xl p-1 mb-6">
          <div className="flex items-center justify-center">
            
            <Image
              src="/modal-images/email.svg"
              alt="Email"
              width={56}
              height={56}
              className="text-[#009A49]"
            />
        
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[24px] font-circular-medium text-center mb-2">
          Email sent Successfully
        </h2>

        {/* Message */}
        <p className="text-[16px] text-[#717171] text-center mb-6">
          {message} {email}
        </p>

        {/* OK button */}
        <button
          onClick={onClose}
          className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-[#333] transition-colors"
        >
          ok
        </button>
      </div>
    </div>
  );
}