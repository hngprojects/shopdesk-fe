"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Easy Account Setup',
      description: 'Create your Shopdeck account and add your products, pricing, and business details.'
    },
    {
      number: '02', 
      title: 'Sales and Stock Management',
      description: 'Process sales quickly while Shopdeck automatically updates your inventory in real-time.'
    },
    {
      number: '03',
      title: 'Track and Analyze Reports', 
      description: 'Monitor sales, expenses, and stock levels with smart insights and custom reports.'
    },
    {
      number: '04',
      title: 'Grow Your Business',
      description: 'Make data-driven decisions, prevent stock issues, and boost profits with an easy to use shop management software.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="relative flex flex-col lg:flex-row w-full min-h-screen py-12 px-6 md:px-8 gap-20">
      {/* Mobile Screen - Right side */}
      <div 
        className="lg:w-1/2 flex items-center justify-center mb-12 lg:mb-0 lg:pl-8 order-2 lg:order-1"
        data-aos="fade-left"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="false"
      >
        <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] aspect-[9/16] relative">
          <Image 
            src="/features-images/phone.svg" 
            alt="Mobile App Screen" 
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Steps Container - Left side */}
      <div className="lg:w-1/2 flex flex-col justify-center lg:pr-8 order-1 lg:order-2">
        <div className="flex flex-col">
          {/* Steps with Numbers - Vertical layout */}
          <div className="flex flex-col space-y-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex items-center gap-6 ${
                  activeStep === index ? 'opacity-100' : 'opacity-100'
                }`}
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-once="false"
                data-aos-delay={index * 150}
              >
                <div className="flex items-center mb-2">
                  <span className={`text-sm md:text-base font-medium ${
                    activeStep === index ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    Step
                  </span>
                </div>
                
                {/* Number Circle */}
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center ${
                  activeStep === index 
                    ? 'border-gray-900 bg-gray-900 text-white' 
                    : 'border-gray-200 text-gray-400 bg-gray-100'
                }`}>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold">{step.number}</span>
                </div>
                
                {/* Step Text */}
                <div className="flex-1">
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 ${
                    activeStep === index ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-base sm:text-lg ${
                    activeStep === index ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;