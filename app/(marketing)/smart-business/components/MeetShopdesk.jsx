import React from 'react';
import Image from 'next/image';
import meet from '@/public/smart-business/meet.svg'
import { Button } from '@/components/ui/button';

const ProblemSolutionSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 py-12 md:py-16">
      <div className="mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        {/* Left Column - Image */}
        <div 
          className="w-full md:w-1/2 flex justify-center"
          data-aos="fade-right"
          data-aos-once="true"
        >
          <div className="relative w-full max-w-3xl aspect-square bg-gray-100 rounded-xl">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <Image
                src={meet}
                alt="Shopdesk in action"
                width={600}
                height={600}
                className="rounded-xl"
                />
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div 
          className="w-full md:w-1/2"
          data-aos="fade-left"
          data-aos-once="true"
          data-aos-delay="200"
        >
          <h1 className="font-bold text-sm md:text-base text-[#19A45B] mb-6">
            Meet Shopdesk!
          </h1>
          
          <p className="text-2xl md:text-6xl font-bold text-gray-900 mb-8">
            Do you...
          </p>

          <ul className="space-y-4 mb-8">
            {[
              "Lose money?",
              "Lose track of customer orders?",
              "Spend hours calculating stocks instead of growing your business?"
            ].map((item, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2"
                data-aos="fade-up"
                data-aos-once="true"
                data-aos-delay={300 + (index * 100)}
              >
                <img src="smart-business/check.svg" alt="check icon" />
                <span className="text-base md:text-xl lg:text-2xl text-gray-500">{item}</span>
              </li>
            ))}
          </ul>

          <div 
            className="space-y-6"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="600"
          >
            <p className="text-base md:text-xl lg:text-2xl text-gray-500">
              Shopdesk helps business owners manage inventory, track sales and save money while at it! Imagine focusing on selling more, pleasing your customers, and growing your brand without stressing over losing money and customers or inventory report. Designed for small and medium business owners, no tech skills required! With Shopdesk, a Simpler, More Profitable Business Awaits You!
            </p>
          </div>

          <Button
            variant='default' 
            className="mt-8 px-8 py-8 rounded-lg text-lg md:text-xl font-semibold hover:bg-[#148C4D] transition-colors"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="700"
          >
            Try Shopdesk now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;