'use client';

import React, { useEffect, useState } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, children }) => {
  const [drawerState, setDrawerState] = useState<string>('');


  useEffect(() => {
    if (isOpen) {
      setDrawerState('slide-up');
    }
  }, [isOpen]);




  return (
    <div
      className={`fixed inset-0 z-50 bg-transparent flex flex-col justify-end items-end ${isOpen ? 'block' : 'hidden'}`}
    >
      <div
        className={`w-full max-w-md bg-white p-6 rounded-t-2xl transition-all transform ${drawerState} relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      <div className='flex flex-col mt-10'>
        <p className='text-center'>
          &copy; {new Date().getFullYear()}, Powered by Timbu Business
        </p>
      </div>
      </div>
    </div>
    
  );
};

export default Drawer;