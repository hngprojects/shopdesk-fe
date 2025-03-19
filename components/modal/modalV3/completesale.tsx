import Image from "next/image";
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

interface CompleteSaleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompleteSale({ isOpen, onClose }: CompleteSaleProps) {
  if (!isOpen) return null;

  const [customerInfoSelected, setCustomerInfoSelected] = useState<
    string | null
  >(null);
  const [sendMethod, setSendMethod] = useState<
    "sms" | "email" | "whatsapp" | null
  >(null);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form whenever relevant fields change
  useEffect(() => {
    // At minimum, we need an email or phone number
    const hasContactInfo =
      emailAddress.trim() !== "" || phoneNumber.trim() !== "";
    setIsFormValid(hasContactInfo);
  }, [
    emailAddress,
    phoneNumber,
    customerEmail,
    customerPhone,
    sendMethod,
    customerName,
  ]);

  const handleCustomerInfoChange = (value: string) => {
    setCustomerInfoSelected(value);
  };

  const handleSendMethodChange = (method: "sms" | "email" | "whatsapp") => {
    setSendMethod(method === sendMethod ? null : method);
  };

  //   const handlePrintReceipt = () => {
  //     // Print receipt logic would go here
  //     // For now, we'll just simulate it
  //     console.log("Printing receipt...");
  //   };

  const handleEndSale = (e: React.FormEvent) => {
    e.preventDefault();
    // Save all form data if needed
    console.log("Saving sale data...", {
      customerName,
      emailAddress,
      phoneNumber,
      customerEmail,
      customerPhone,
      sendMethod,
    });
    // Close the modal
    onClose();
  };

  const handleSaveCustomerInfo = () => {
    // Logic to save customer info would go here
    // console.log("Saving customer info...", {
    //   name: customerName,
    //   email: emailAddress,
    //   phone: phoneNumber,
    // });
  };

  return (
    <>
      {/* Informations are meant to be passed here */}

      <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4 z-50">
        <div className="bg-[#F6F8FA] shadow-lg max-w-[1228px] rounded-[20px] w-full flex h-[600px] overflow-hidden">
          {/* Customer Receipt */}
          <div className="bg-[#F6F8FA] w-1/2 p-6 ">
            <div className="rounded-[20px] bg-white p-8 h-full relative">
              {/* Receipt content goes here */}
              <h2 className="font-circular-medium text-xl mb-2 uppercase leading-7">
                Customer Receipt
              </h2>
              <div className=" flex gap-3">
                {/* Receipt details will go here */}
                <span className="text-lg text-[#888888]">Order #001</span>
                <img src="/modal-images/line.svg" alt="" className="" />
                <span className="text-lg text-[#888888]">19 Nov 2024</span>
              </div>

              <img src="/modal-images/divider.svg" alt="" className="mt-2.5" />

              <h2 className="font-circular-medium text-xl mb-2 mt-2.5 uppercase leading-7">
                ITEM
              </h2>

              <div className=" flex flex-col gap-3">
                {/* Receipt details will go here */}
                <div className="flex items-center justify-between text-[#2A2A2A]">
                  <p className="text-base capitalize">Hair Dryer</p>
                  <span className="text-base">1</span>
                  <p className="text-lg font-circular-medium">₦ 122,500</p>
                </div>
                <div className="flex items-center justify-between text-[#2A2A2A]">
                  <p className="text-base capitalize">Hair Dryer</p>
                  <span className="text-base">1</span>
                  <p className="text-lg font-circular-medium">₦ 123,500</p>
                </div>
              </div>

              <img src="/modal-images/divider.svg" alt="" className="mt-2.5" />

              <div className="flex flex-col items-center justify-center text-[#888888] mt-56 gap-1">
                <p className="text-lg leading-7 uppercase">
                  Thank you for your purchase
                </p>
                <p className="text-lg">12:00</p>
              </div>

              <img
                src="/modal-images/border.svg"
                alt=""
                className="absolute -bottom-1 left-0 w-full rounded-bl-2xl rounded-br-2xl"
              />
            </div>
          </div>

          {/* Sale Complete */}
          <div className="bg-white w-1/2 flex flex-col h-full">
            <div className="flex gap-2.5  p-6">
              <div className="flex p-2">
                <div className="bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center">
                  <Image
                    src="/modal-images/complete.svg"
                    alt="Complete Sale"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="flex-grow h-full py-2">
                <h1 className="font-circular-medium text-[24px] text-left">
                  Complete Sale
                </h1>
                <p className="text-lg text-[#717171]">
                  Generate a proof of your sale.
                </p>
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

              {/* Print Receipt Button */}
            </div>

            <div className="px-6 mb-4">
              <button
                // onClick={handlePrintReceipt}
                className="w-full bg-[#1B1B1B] text-white py-3 rounded-lg flex items-center cursor-pointer justify-center gap-2"
              >
                <img src="/modal-images/print.svg" alt="Print Receipt" />
                Print Receipt
              </button>
            </div>

            <img
              src="/modal-images/divider2.svg"
              alt=""
              className="w-full px-6"
            />

            {/* Sale completion content - Make this section scrollable */}
            <form
              onSubmit={handleEndSale}
              className="p-4 px-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
            >
              <div className="mb-5">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer Name"
                  className="w-full border text-xl placeholder:text-[#B8B8B8] border-gray-300 rounded-[9px] p-4 focus:outline-none focus:ring-1 focus:ring-[#00A651] focus:border-[#00A651]"
                />
              </div>

              <div className="mb-5">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8B8]">
                    +234
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="814 6474 8934"
                    className="w-full border text-xl pl-16 placeholder:text-[#B8B8B8] border-gray-300 rounded-[9px] p-4 focus:outline-none focus:ring-1 focus:ring-[#00A651] focus:border-[#00A651]"
                  />
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="johndoe@example.com"
                  className="w-full border text-xl placeholder:text-[#B8B8B8] border-gray-300 rounded-[9px] p-4 focus:outline-none focus:ring-1 focus:ring-[#00A651] focus:border-[#00A651]"
                />
              </div>

              <img
                src="/modal-images/divider2.svg"
                alt=""
                className="w-full mt-4"
              />

              <div className="flex flex-col gap-5 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="sendMethod"
                      value="whatsapp"
                      checked={sendMethod === "whatsapp"}
                      onChange={() => handleSendMethodChange("whatsapp")}
                      className="peer appearance-none h-5 w-5 border border-gray-300 rounded peer"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100">
                      <Image
                        src="/modal-images/checkbox.svg"
                        alt="Checked"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <span className="text-xl">Send receipt via WhatsApp</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="sendMethod"
                      value="sms"
                      checked={sendMethod === "sms"}
                      onChange={() => handleSendMethodChange("sms")}
                      className="peer appearance-none h-5 w-5 border border-gray-300 rounded"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100">
                      <Image
                        src="/modal-images/checkbox.svg"
                        alt="Checked"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <span className="text-xl">Send receipt via SMS</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="sendMethod"
                      value="email"
                      checked={sendMethod === "email"}
                      onChange={() => handleSendMethodChange("email")}
                      className="peer appearance-none h-5 w-5 border border-gray-300 rounded"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100">
                      <Image
                        src="/modal-images/checkbox.svg"
                        alt="Checked"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <span className="text-xl">Send receipt via email</span>
                </label>
              </div>

              <img
                src="/modal-images/divider2.svg"
                alt=""
                className="w-full mt-4"
              />

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full mt-6">
                <button
                  type="button"
                  onClick={handleSaveCustomerInfo}
                  className="w-full py-3 px-6 rounded-[12px] flex items-center justify-center gap-2 border border-[#1B1B1B] cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <Image
                    src="/modal-images/customer.svg"
                    alt="Save Customer"
                    width={18}
                    height={18}
                  />
                  <span className="text-base">Save Customer Info</span>
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3 px-6 rounded-[12px] flex items-center justify-center gap-2 text-white ${
                    isFormValid
                      ? "bg-[#1B1B1B] hover:bg-[#333333] cursor-pointer"
                      : "bg-[#CCCCCC] cursor-not-allowed"
                  } transition-colors`}
                >
                  <Image
                    src="/modal-images/endsale.svg"
                    alt="End Sale"
                    width={18}
                    height={18}
                  />
                  <span className="text-base">End Sale</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="mb-6">
<button
  className={`w-full ${
    sendMethod !== null ? "bg-[#1B1B1B]" : "bg-[#CCCCCC]"
  } text-white py-3 rounded-lg flex items-center cursor-pointer justify-center gap-2 transition-colors duration-200`}
  disabled={sendMethod === null}
  onClick={handleSendReceipt}
>
  <img src="/modal-images/send.svg" alt="Print Receipt" />
  Send Receipt
</button>
</div> */
}
