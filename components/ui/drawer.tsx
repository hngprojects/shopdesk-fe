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
      className={`fixed inset-0 z-50 bg-black/50 flex justify-center items-end ${isOpen ? 'block' : 'hidden'}`}
    >
      <div
        className={`w-full max-w-md bg-white p-6 rounded-t-2xl transition-all transform ${drawerState} relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;