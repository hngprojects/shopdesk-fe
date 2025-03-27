import React from 'react';
import Link from 'next/link';
import twitter from '@/public/icons/twitter.svg';
import facebook from '@/public/icons/facebook.svg'; 
import instagram from '@/public/icons/instagram.svg'; 
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Desktop Layout - Only copyright and links */}
        <div className="hidden md:flex flex-row justify-between items-center">
          <p className="text-gray-500">
            © Copyright 2025, Powered by Timbu Business
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
              Cookies
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
              Manage privacy
            </Link>
          </div>
        </div>

        {/* Mobile Layout - Only social icons and copyright */}
        <div className="md:hidden flex flex-col items-center space-y-6">
          {/* Social Icons - Only on mobile */}
          <div className="flex space-x-4">
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

          <p className="text-gray-500 text-sm text-center">
            © Copyright 2024, Powered by Timbu Business
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;