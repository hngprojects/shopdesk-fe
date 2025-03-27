'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import menu from '@/public/icons/menu.svg';
import Logo from '@/components/functional/logo';
import { useRouter } from 'next/navigation';
import Dropdown from './dropdown';

const BillingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        menuBtnRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target) &&
        !menuBtnRef.current.contains(event.target) // Prevent closing if clicking the button
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className='bg-white px-[clamp(16px,_4vw,_120px)]'>
      <div className='py-4 flex items-center justify-between max-w-screen-xl'>
        <Logo />

        <div className='flex items-center gap-2 min-[900px]:hidden'>
          <button
            hidden
            type='button'
            onClick={() => router.push('/stock')}
            className='btn-primary min-[900px]:hidden max-[500]:hidden max-[600px]:text-[14px]'
          >
            Get Started
          </button>

          <button
            type='button'
            aria-label='Menu'
            className='min-[850px]:hidden'
            onClick={() => setIsOpen(!isOpen)}
            ref={menuBtnRef}
          >
            <Image src={menu} alt='menu' width={28} height={28} />
          </button>
        </div>
        <Dropdown />
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className='absolute z-50 top-16 left-0 w-screen bg-white shadow-lg flex flex-col items-left py-6 overflow-hidden px-4 min-[850px]:hidden'
        >
          <Link
            href='/features'
            className='hover:text-green-500 transition py-5'
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            href='/pricing'
            className='hover:text-green-500 transition py-5'
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href='/blog'
            className='hover:text-green-500 transition py-5'
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            href='/faq'
            className='hover:text-green-500 transition py-5'
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href='/contact'
            className='hover:text-green-500 transition py-5'
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>

          <hr className='my-4 bg-[#A0A0A0]' />

          <button
            className='btn-outline mb-2 hover:bg-gray-100 transition w-full'
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </button>
          <button
            className='btn-primary hover:bg-gray-800 transition w-full'
            onClick={() => setIsOpen(false)}
          >
            Start for free
          </button>
        </div>
      )}
    </header>
  );
};

export default BillingHeader;
