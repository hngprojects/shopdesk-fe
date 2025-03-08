"use client";

import * as React from "react";
import prevarrow from "../public/icons/arrowprev.png";
import nextarrow from "../public/icons/arrownext.png";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Image from "next/image";

type CarouselWrapperProps = {
  items: React.ReactNode[];
  className?: string;
};


const groupItems = (items: React.ReactNode[], groupSize: number) => {
  const grouped = [];
  for (let i = 0; i < items.length; i += groupSize) {
    grouped.push(items.slice(i, i + groupSize));
  }
  return grouped;
};

const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ items, className }) => {
  const groupedItems = groupItems(items, 3); // Groups items in sets of 3
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % groupedItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + groupedItems.length) % groupedItems.length);
  };

  return (
    <div className={`flex items-center justify-center bg-[#009A49] lg:bg-[#19A45B] w-[1,075px] lg:w-full mt-5 h-[504px] ${className}`}>
      <div className=" lg:w-[1200px]">
        {/* Navigation Arrows at the Top */}
        <div className="w-[344px] flex justify-between lg:w-full lg:mb-4">
          <button onClick={handlePrev} className="bg-[#FFFFFF] text-white p-2 w-[48px] h-[48px] flex justify-center items-center rounded-[12px]">
          <Image src={prevarrow} alt="Next Arrow" className="h-4 w-4"/>
          </button>
          <button className=" text-[#FFFFFF] rounded-full border-[1px] pb-[12px] pl-[24px] pr-[24px] pt-[12px] border-[#00802F]">Testimonials</button>
          <button onClick={handleNext} className="bg-[#001A00] text-white  flex justify-center items-center p-2 w-[48px] h-[48px] rounded-[12px]">
           <Image src={nextarrow} alt="Next Arrow" className="h-4 w-4"/>
          </button>
        </div>

        {/* Carousel */}
        <Carousel>
          <CarouselContent className="flex">
            {groupedItems.map((group, index) => (
              <CarouselItem
                key={index}
                className={`flex justify-between transition-transform transform ${
                  index === activeIndex ? "translate-x-0" : "hidden"
                }`}
              >
                {group.map((item, subIndex) => (
                  <div key={subIndex} className="">{item}</div>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination Dots at the Bottom */}
        <div className="flex justify-center mt-4 space-x-2">
          {groupedItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-1 rounded-full ${
                activeIndex === index ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselWrapper;
