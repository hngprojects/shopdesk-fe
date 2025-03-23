import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import right from "@/public/icons/right.svg";
import { features } from '../utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  iconSrc: string;
  title: string;
  list1: string;
  list2: string;
  list3:string;
  bgColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  iconSrc,
  title,
  list1,
  list2,
  list3,
  bgColor,
}) => (
  <div
    className={`rounded-[24px] flex flex-1 min-w-[300px] max-w-[400px] flex-col justify-between gap-5 items-center p-6 ${bgColor}`}
    data-aos="fade-up"
    data-aos-delay="100"
    data-aos-once="false" 
  >
    <img src={iconSrc} alt={title} className="w-12 h-12 mb-4 mt-2.5" />
    <h3 className="text-[20px] leading-6 font-medium text-[#2A2A2A] text-center">{title}</h3>
    <ul className="text-[#717171 font-circular-light space-y-[10px]">
      <li>{list1}</li>
      <li>{list2}</li>
      <li>{list3}</li>
    </ul>
  </div>
);


const Features = () => {
  return (
    <div id="features" className="mx-auto max-w-[1198px] px-5 my-16 min-[600px]:px-10">
          <h2
      className="text-center py-4 md:py-3 font-medium leading-6 text-[#009A49] bg-[#009A490D] max-w-[111px] mx-auto rounded-3xl uppercase"
            data-aos="fade-up"
            data-aos-once="false" // Allow this element to re-animate
            >
            Features
          </h2>
        <div
          className="mx-auto max-w-[1198px] py-10 px-8"
          data-aos="fade-up"
          data-aos-once="false" // Allow this element to re-animate
          >
          <div className="flex items-stretch justify-center gap-16 flex-wrap">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
        <div className='mx-auto max-w[876px] text-center my-10 space-y-6'>
            <div className='space-y-2'>
              <h2 className='text-[24px] md:text-[36px] font-medium leading-[44px] text-[#2A2A2A]'>Stay Ahead – Manage Your Stock with Ease!
              </h2>
              <p className='text-[#717171] text-[20px] leading-[30px]'>Join Shopdesk today and take control of your inventory!
              </p>
            </div>
            <Button className='w-2/4 p-8 rounded-[12px] text-lg h-[62px]'>Join Now <ArrowRight /></Button>
        </div>
    </div>
  )
}

export default Features