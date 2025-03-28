import React, { useEffect } from 'react';
import Link from 'next/link';
import { FiPhoneCall } from 'react-icons/fi';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

const ContactInfoSection = () => {

  return (
    <div 
      className="flex flex-col gap-4 md:gap-8 text-[#2A2A2A] text-base sm:text-lg md:text-xl lg:text-2xl shadow-sm"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {/* Chat with us */}
      <div  
        className="flex flex-col gap-3 sm:gap-5 p-4 sm:p-5 md:p-6  rounded-lg hover:shadow-md transition-shadow duration-300"
        data-aos="fade-up"
        data-aos-delay="150">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Chat with us</h3>
            <span className="flex flex-col gap-1">
              <p className="text-gray-400 text-base sm:text-lg">Speak with us via live chat</p>
              <Link href="" className="flex items-center gap-2">
                <Image
                  src="/icons/chat-circles.svg"
                  alt="chat"
                  className=""
                  width={24}
                  height={24}
                />
                <span className="underline text-base sm:text-lg">start a live chat</span>
              </Link>
            </span>
        </div>

      {/* Call Us Section */}
      <div 
        className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-white rounded-lg hover:shadow-md transition-shadow duration-300"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Call us</h3>
        <div className="flex flex-col gap-1">
          <p className="text-gray-400 text-base md:text-lg">
            Call our team on Mondays-Fridays from 8am to 5pm
          </p>
          <Link
            href="tel:+234 000 000 0000"
            className="flex items-center gap-2 text-base sm:text-lg md:text-xl hover:text-green-600 transition-colors duration-200"
          >
            <FiPhoneCall className="size-5 sm:size-6" />
            <span className="underline text-base sm:text-lg">+234 700 880 8800</span>
          </Link>
        </div>
      </div>

      {/* Visit Us Section */}
      <div 
        className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-white rounded-lg hover:shadow-md transition-shadow duration-300"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Visit us</h3>
        <div className="flex flex-col gap-1">
          <p className="text-gray-400 text-base md:text-lg">
            You can visit us at Shopdesk HQ
          </p>
          <Link 
            href="" 
            className="flex items-center gap-2 text-base sm:text-lg md:text-xl hover:text-green-600 transition-colors duration-200"
          >
            <MapPin className="size-5 sm:size-6" />
            <span className="underline text-base sm:text-lg">
              No. 2 Laula Ibrahim Street, Akoka, Lagos.
            </span>
          </Link>
        </div>
      </div>

      {/* Billing Support Section */}
      <div 
        className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-white rounded-lg hover:shadow-md transition-shadow duration-300"
        data-aos="fade-up"
        data-aos-delay="250"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">For billing support</h3>
        <div className="flex flex-col gap-1">
          <p className="text-gray-400 text-base md:text-lg">
            You can visit our{' '}
            <Link
              href=""
              className="underline hover:text-green-600 transition-colors duration-200"
            >
              Help Centre
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;