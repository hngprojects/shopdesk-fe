'use client';
import React, { useState } from 'react';
import SuccessEmailModal from '@/components/modal/modalV8/export-sucess';

function Page() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [emailDetails, setEmailDetails] = useState({
    email: 'Mark.M@gmail.com',
    message: 'Stock data PDF has been sent to',
  });

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  return (
    <div className='p-8'>
      <h1>STOCK DATA</h1>

      <button
        type='button'
        onClick={openSuccessModal}
        className='px-4 py-2 bg-[#009A49] text-white rounded mt-3'
      >
        Send
      </button>

      <SuccessEmailModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        email={emailDetails.email}
        message={emailDetails.message}
      />
    </div>
  );
}

export default Page;
