"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Features } from "@/components/shared/features";
import Link from "next/link";
import {priceCardContent, PriceCardContentOptions} from './PriceCardOption'

const Pricing = () => {

  const [isAnnual, setIsAnnual] = useState(false);

  

  return (
    <main>
      <section className="w-full bg-[#fafafb] pt-8 md:pt-[96px] flex flex-col items-center gap-10 px-2">
        <div 
          className="flex flex-col gap-6 items-center p-2.5"
          data-aos="fade-up"
        >
          <h2 className="font-medium text-4xl leading-full md:text-6xl lg:text-8xl md:leading-[120%] max-w-[30ch] text-center text-[#2a2a2a]">
            Available <span className="text-[#10B981] md:text-[#2a2a2a]">Subscriptions</span>
          </h2>
          <p 
            className="text-center font-medium text-gray-500 text-xl md:text-2xl leading-full max-w-4xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Choose a plan that fits your retail business needs, covering inventory management, sales tracking and more. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Toggle between Monthly and Annually */}
        <div 
          className="flex gap-2 p-4 rounded-2xl items-center w-[227px] h-16 bg-[#F1F1F1]"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <Button
            className={`w-[102px] text-gray-900 px-4 py-6 transition-colors ${
              !isAnnual
                ? "text-white bg-gray-900 border-[#1b1b1b]"
                : "bg-transparent hover:text-white"
            }`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </Button>
          <Button
            type="button"
            className={`w-[102px] text-gray-900 px-4 py-6 transition-colors ${
              isAnnual
                ? "text-white bg-gray-900 border-gray-900"
                : "bg-transparent hover:text-white"
            }`}
            onClick={() => setIsAnnual(true)}
          >
            Annually
          </Button>
        </div>

        <section className="w-full px-[10px] pt-[4px] pb-[64px] lg:px-4 lg:pb-[64px] lg:gap-[29px] flex flex-wrap justify-center gap-4 bg-white lg:bg-transparent">
          {priceCardContent.map((cardContent: PriceCardContentOptions, index: number) => (
            <div
              className="flex flex-col p-6 gap-8 bg-white rounded-lg border border-[#E5E7EB] w-full max-w-[384px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-[#FEF6F6]"
              key={index}
              data-aos="fade-up"
              data-aos-delay={200 + (index * 100)}
            >
              {/* Plan Type and Price */}
              <div className="flex flex-col items-center gap-2 ">
                <span className="text-sm font-medium text-[#111827] uppercase bg-[#F1F1F1] p-2 rounded-xl">
                  {cardContent.plan}
                </span>
                <p className="text-3xl font-semibold text-[#111827] mt-1">
                  {isAnnual ? cardContent.annualPrice : `${cardContent.monthlyPrice}/mo`}
                </p>
              </div>
            
              {/* Divider */}
              <div className="border-t border-[#E5E7EB]"></div>
            
              {/* Features List */}
              <div className="flex flex-col gap-4 px-4">
                {cardContent.item.map((item: string, i: number) => (
                  <div key={i} className="flex items-start text-left gap-3">
                    <div className="flex-shrink-0 text-[#10B981] md:ml-18">
                      {item.startsWith("[x]") ? (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      ) : (
                        <img 
                          src="/pricing/checkbox.svg" 
                          alt="checkbox" 
                          className="h-5 w-5"
                        />
                      )}
                    </div>
                    <p className="text-[#4B5563] text-sm leading-5">
                      {item.replace(/^\[[x ]\]\s*/, '')}
                    </p>
                  </div>
                ))}
              </div>
            
              {/* Divider */}
              <div className="border-t border-[#E5E7EB]"></div>
            
              {/* Button */}
              <Link href={isAnnual ? cardContent.annualLink : cardContent.monthlyLink} className="w-full mt-auto">
                <Button className={`w-full py-6 rounded-xl text-lg font-medium ${
                  cardContent.plan === "Free Plan"
                    ? "bg-gray-900 text-white hover:bg-[#1F2937]"
                    : "bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-50"
                }`}>
                  {cardContent.plan === "Free Plan" ? "Current Plan" : "Upgrade"}
                </Button>
              </Link>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
};

export default Pricing;