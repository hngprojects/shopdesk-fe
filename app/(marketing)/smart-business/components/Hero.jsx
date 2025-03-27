import React from 'react';
import Image from 'next/image';
import manWithOranges from '@/public/smart-business/man-with-oranges.png';
import greenStroke from '@/public/smart-business/green-stroke.svg'; 
import mobileStroke from '@/public/smart-business/mobile-green-stroke.svg';

const Hero = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 py-8 md:py-12 lg:py-16">
        {/* Text Content - Takes full width on mobile, 50% on desktop */}
        <div 
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-delay="100"
        >
          {/* Headline with responsive line breaks */}
          <div className="w-full">
            <h1 className="font-bold leading-full text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-gray-800">
              <span className="block">Run Your Business with</span>
              <span className="text-[#19A45B]">ShopDesk!</span>
            </h1>
            
            {/* Green stroke - different versions for mobile/desktop */}
            <div className="mt-4 mb-6 md:mb-8 w-full">
              <Image
                src={greenStroke}
                alt="decorative green stroke"
                width={500}
                height={12}
                className="hidden md:block w-full max-w-xl h-auto lg:ml-8"
                data-aos="fade-right"
                data-aos-once="true"
                data-aos-delay="300"
              />
              <Image
                src={mobileStroke}
                alt="decorative green stroke"
                width={300}
                height={12}
                className="md:hidden w-full max-w-lg h-auto mx-auto"
                data-aos="fade-right"
                data-aos-once="true"
                data-aos-delay="300"
              />
            </div>
          </div>
          
          {/* Paragraph text with perfect responsive sizing */}
          <p 
            className="text-base leading-full xs:text-lg sm:text-xl sm:leading-2xl md:text-3xl text-gray-500 w-full max-w-2xl md:max-w-none"
            data-aos="fade-right"
            data-aos-once="true"
            data-aos-delay="500"
          >
            Tired of missing stock, sales mix-ups, and endless paperwork? You're
            not alone! Whether you run a retail store, online store, or furniture
            shop, managing your business shouldn't be this stressful.
          </p>
        </div>

        {/* Image Content - Takes full width on mobile, 50% on desktop */}
        <div 
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          data-aos="fade-left"
          data-aos-once="true"
          data-aos-delay="100"
        >
          <div className="w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <Image
              src={manWithOranges}
              alt="Person holding a crate of oranges"
              width={800}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;