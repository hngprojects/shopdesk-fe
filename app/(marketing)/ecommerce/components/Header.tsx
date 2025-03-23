"use client"
import Logo from '@/components/functional/logo';
import Image from 'next/image';
import React, { useState } from 'react';
import facebook from "@/public/icons/facebook.svg";
import twitter from "@/public/icons/twitter.svg";
import instagram from "@/public/icons/instagram.svg";
import { Menu, X } from 'lucide-react'; // Import X icon for closing the dropdown

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage dropdown visibility

  const socialLinkButtonClass: string =
    "w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] bg-white border-[1px] rounded-full border-[#d0d0d0] inline-flex justify-center items-center";

  return (
    <header className="h-20 flex items-center justify-between px-[10px] w-full relative">
      {/* Logo */}
      <Logo />

      {/* Social Media Icons (Hidden on Mobile) */}
      <div className="space-x-2 sm:space-x-6 md:space-x-8 hidden md:flex">
        <button className={socialLinkButtonClass}>
          <a href="https://x.com/shopdesk_?s=21">
            <Image
              src={twitter}
              alt="our twitter page"
              height={24}
              className="h-[16px] sm:h-[24px]"
            />
          </a>
        </button>
        <button className={socialLinkButtonClass}>
          <a href="https://facebook.com/share/18weYAqtPe/">
            <Image
              src={facebook}
              alt="our facebook page"
              height={24}
              className="h-[16px] sm:h-[24px]"
            />
          </a>
        </button>
        <button className={socialLinkButtonClass}>
          <a href="https://www.instagram.com/shopdesk_?igsh-MXIybG5sNXhvazI5dg==">
            <Image
              src={instagram}
              alt="our instagram page"
              height={24}
              className="h-[16px] sm:h-[24px]"
            />
          </a>
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden block">
        {isMenuOpen ? (
          <X
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(false)} // Close the dropdown
          />
        ) : (
          <Menu
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(true)} // Open the dropdown
          />
        )}
      </div>

      {/* Dropdown Menu (Mobile Only) */}
      {isMenuOpen && (
        <div className="absolute top-20 z-1 right-0 bg-white shadow-lg w-full md:hidden">
          <div className="flex items-center space-y-4 p-4">
            <button className={socialLinkButtonClass}>
              <a href="https://x.com/shopdesk_?s=21">
                <Image
                  src={twitter}
                  alt="our twitter page"
                  height={24}
                  className="h-[16px] sm:h-[24px]"
                />
              </a>
            </button>
            <button className={socialLinkButtonClass}>
              <a href="https://facebook.com/share/18weYAqtPe/">
                <Image
                  src={facebook}
                  alt="our facebook page"
                  height={24}
                  className="h-[16px] sm:h-[24px]"
                />
              </a>
            </button>
            <button className={socialLinkButtonClass}>
              <a href="https://www.instagram.com/shopdesk_?igsh-MXIybG5sNXhvazI5dg==">
                <Image
                  src={instagram}
                  alt="our instagram page"
                  height={24}
                  className="h-[16px] sm:h-[24px]"
                />
              </a>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;