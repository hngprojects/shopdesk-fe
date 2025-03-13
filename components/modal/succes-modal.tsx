interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[347px] flex flex-col gap-[28px] p-6">
        <div className="flex flex-col items-center text-center gap-4">
          <img
            src="/modal-images/check.svg"
            alt="Success Check"
            className="w-8 h-8"
            width={48}
            height={48}
          />

          <h1 className="font-medium leading-9 text-2xl text-[#1B1B1B] mt-1.5">
            Discount Added <br /> Successfully.
          </h1>

          <hr className="w-full text-[#DEE5ED]" />

          <button
            onClick={onClose}
            className="mt-4 py-3 px-16 w-36 bg-[#2A2A2A] text-white rounded-lg font-medium cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
