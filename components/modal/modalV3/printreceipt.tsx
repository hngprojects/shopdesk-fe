import Image from "next/image";
import { FaTimes, FaMinus, FaPlus, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

interface PrintReceiptProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrintReceipt({ isOpen, onClose }: PrintReceiptProps) {
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    flag: "🇳🇬",
    name: "Nigeria",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-[#F6F8FA] shadow-lg max-w-[670px] w-full sm:w-[90%] md:w-[85%] lg:w-[670px] rounded-3xl flex flex-col gap-4 items-center p-4 h-[600px] overflow-y-auto">
        {/* Customer Receipt */}

        <div className="rounded-[10px] bg-white w-full sm:w-[630px] px-3 sm:px-6 flex flex-col h-[550px] overflow-y-auto">
          <div className="flex justify-end w-full pt-2.5 sticky top-0 bg-white z-10 pr-0">
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0] ml-auto"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Image
              src="/modal-images/organization.svg"
              width={62}
              height={49}
              alt="Organization Logo"
              className="w-auto h-auto"
            />

            <h2 className="text-lg sm:text-xl leading-7 font-circular-medium">
              Customer Receipt
            </h2>
          </div>

          <Image
            src="/modal-images/divider2.svg"
            width={587}
            height={1}
            alt="divider"
            className="mt-8 w-full h-auto"
          />

          <div className="flex flex-col gap-3 mt-8">
            {/* Receipt details will go here */}
            <div className="flex items-center w-full text-[#888888] text-sm font-circular-medium">
              <p className="w-1/3 px-2">Item Name</p>
              <p className="w-1/3 text-center px-2">Quantity</p>
              <p className="w-1/3 text-right px-2">Subtotal</p>
            </div>

            <div className="flex items-center w-full text-[#2A2A2A] text-base">
              <p className="w-1/3 px-2 capitalize truncate">
                Hair Dryer For Men
              </p>
              <span className="w-1/3 text-center px-2">1</span>
              <p className="w-1/3 text-right px-2">₦ 123,500</p>
            </div>
            <div className="flex items-center w-full text-[#2A2A2A] text-lg font-circular-medium">
              <p className="w-1/3 px-2">Total</p>
              <span className="w-1/3 text-center px-2">1</span>
              <p className="w-1/3 text-right px-2">₦ 123,500</p>
            </div>
          </div>

          <Image
            src="/modal-images/divider2.svg"
            width={587}
            height={1}
            alt="divider"
            className="mt-8 w-full h-auto"
          />

          {/* SMS */}
          <div className="flex flex-col gap-3 mt-8">
            {/* Receipt details will go here */}
            <div className="flex items-center w-full text-[#888888] text-sm font-circular-medium">
              <p className="w-1/3 px-2">SMS to</p>
              <p className="w-1/3 text-center px-2">Date</p>
              <p className="w-1/3 text-right px-2">Time</p>
            </div>

            <div className="flex items-center w-full text-[#2A2A2A] text-base">
              <p className="w-1/3 px-2 capitalize truncate">+234 8147492647</p>
              <span className="w-1/3 text-center px-2">Mon 13th Mar, 2025</span>
              <p className="w-1/3 text-right px-2">11:00am</p>
            </div>
          </div>

          {/* Email */}
          {/* <div className="flex flex-col gap-3 mt-8">
            <div className="flex items-center w-full text-[#888888] text-sm font-circular-medium">
              <p className="w-1/3 px-2">Emailed to</p>
              <p className="w-1/3 text-center px-2">Date</p>
              <p className="w-1/3 text-right px-2">Time</p>
            </div>

            <div className="flex items-center w-full text-[#2A2A2A] text-base">
              <p className="w-1/3 px-2 capitalize truncate">user@example.com</p>
              <span className="w-1/3 text-center px-2">Mon 13th Mar, 2025</span>
              <p className="w-1/3 text-right px-2">11:00am</p>
            </div>
          </div> */}
        </div>

        <div className="w-full">
          <button
            className="w-full
              bg-[#1B1B1B] 
             text-white py-3 rounded-lg flex items-center cursor-pointer justify-center gap-2 transition-colors duration-200"
          >
            <Image
              src="/modal-images/print.svg"
              alt="Print Receipt"
              width={24}
              height={24}
              className="w-auto h-auto"
            />
            Print Receipt
          </button>
        </div>

        {/* Email Input */}
        {/* <div className="w-full flex items-center gap-2">
          <input
            type="email"
            placeholder="Enter email address"
            className="w-[70%] h-[64px] px-2 sm:px-4 rounded-lg border border-[#D0D0D0] focus:outline-none focus:border-[#1B1B1B] text-sm sm:text-base placeholder:text-[#888888]"
          />

          <button
            className="w-[30%] h-[64px]
              bg-[#1B1B1B] 
             text-white rounded-lg flex items-center cursor-pointer justify-center gap-1 sm:gap-2 transition-colors duration-200 hover:bg-[#333333]"
          >
            <Image
              src="/modal-images/email.svg"
              alt="Email Receipt"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-xs sm:text-sm md:text-base hidden sm:flex">
              Send Email
            </span>
          </button>
        </div> */}

        {/* Phone Number Input */}
        {/* <div className="w-full flex items-center gap-2">
          <div className="w-[70%] h-[64px] relative flex items-center">
            <div
              className="h-full min-w-[80px] px-2 sm:px-3 flex items-center gap-1 sm:gap-2 border border-r-0 border-[#D0D0D0] rounded-l-lg cursor-pointer hover:bg-gray-50"
              onClick={() => setShowCountrySelect(!showCountrySelect)}
            >
              <span className="text-lg sm:text-xl">{selectedCountry.flag}</span>
              <span className="text-sm sm:text-base">
                {selectedCountry.code}
              </span>
              <FaChevronDown className="text-xs sm:text-sm" />
            </div>
            <input
              type="tel"
              placeholder="Enter phone number"
              pattern="[0-9+\s\-()]+"
              inputMode="tel"
              className="h-full flex-1 px-2 sm:px-4 rounded-r-lg border border-[#D0D0D0] focus:outline-none focus:border-[#1B1B1B] text-sm sm:text-base placeholder:text-[#888888]"
            />
          </div>

          <button className="w-[30%] h-[64px] bg-[#1B1B1B] text-white rounded-lg flex items-center cursor-pointer justify-center gap-1 sm:gap-2 transition-colors duration-200 hover:bg-[#333333]">
            <Image
              src="/modal-images/sms.svg"
              alt="SMS Receipt"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-xs sm:text-sm md:text-base hidden sm:flex">
              Send SMS
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
