import React from 'react';
import Image from 'next/image';
import twitter from '@/public/icons/twitter.svg';
import facebook from '@/public/icons/facebook.svg'; 
import instagram from '@/public/icons/instagram.svg'; 
import Logo from '@/components/functional/logo';

const Navbar = () => {
  return (
      <nav className="flex items-center justify-between py-10 px-6 md:px-12 lg:px-16 w-full">
        <div 
          className="flex items-center md:flex-1 max-md:absolute max-md:left-1/2 max-md:transform max-md:-translate-x-1/2"
          data-aos="fade-right"
          data-aos-once="true"
        >
          <Logo />
        </div>

        <div 
          className="flex space-x-4 max-md:hidden"
          data-aos="fade-left"
          data-aos-once="true"
        >
          <a
            href="https://x.com/shopdesk_?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="size-[50px] border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Image src={twitter} alt="Twitter logo" className="size-6" />
          </a>
          <a
            href="https://www.facebook.com/share/18weYAqtPe/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-[50px] border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Image src={facebook} alt="Facebook logo" className="size-6" />
          </a>
          <a
            href="https://www.instagram.com/shopdesk_?igsh=MXIybG5sNXhvazI5dg=="
            target="_blank"
            rel="noopener noreferrer"
            className="size-[50px] border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Image src={instagram} alt="Instagram logo" className="size-6" />
          </a>
        </div>
      </nav>
  );
};

export default Navbar;