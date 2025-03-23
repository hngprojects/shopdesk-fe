"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import Avatar1 from "./../../public/testimonial-images/avatar1.png";
import Avatar2 from "./../../public/testimonial-images/avatar2.png";
import Avatar3 from "./../../public/testimonial-images/avatar3.png";

import { AnimatePresence, motion } from "framer-motion";

import { Star } from "lucide-react";

const testimonialsData = [
  {
    id: 1,
    name: "Jerome Bell",
    title: "Google",
    review:
      "“Before ShopDesk, I lost 10 hours a week manually tracking 500+ chairs across two warehouses. Now, with real-time alerts, my team knows exactly what’s in stock. Last month, we cut stockout by 60%, and sales grew by 25%!”",
    image: Avatar1,
  },
  {
    id: 2,
    name: "Kristin Watson",
    title: "Netflix",
    review:
      "“My accountant hated me for messy sales reports. ShopDesk’s report dashboard changed everything – we spotted low-margin items and boosted profits by 35% in 3 months. Even my accountant is impressed!”",
    image: Avatar2,
  },
  {
    id: 3,
    name: "Annette Black",
    title: "Whatsapp",
    review:
      "“I no longer worry about missing sales or running out of stock. This is the best software for managing a small retail store”",
    image: Avatar3,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(window.innerWidth < 768 ? 1 : 3);
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const slideVariants = {
    hiddenRight: { x: "100%", opacity: 0 },
    hiddenLeft: { x: "-100%", opacity: 0 },
    visible: { x: "0", opacity: 1, transition: { duration: 0.5 } },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  const prevSlide = () => {
    setDirection("left");
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextSlide = () => {
    setDirection("right");
    setIndex((prev) =>
      prev < testimonialsData.length - visibleCards ? prev + 1 : prev
    );
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > index ? "right" : "left");
    setIndex(idx);
  };

  return (
    <div className="flex py-6 md:py-8 px-5 min-[600px]:px-10 flex-col items-center justify-center gap-6 mb-12 bg-[#19A45B]">
      <div className="flex items-center justify-between w-full max-w-[343px] sm:max-w-[1200px]">
        <button
          onClick={prevSlide}
          className="p-3 md:p-4 bg-white border border-[#C7D3E1] rounded-xl cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M15 9.31055H3M3 9.31055L7.5 13.8105M3 9.31055L7.5 4.81055"
              stroke="#D0D0D0"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="py-3 px-6 rounded-4xl border bg-[#19A45B] text-white font-circular-medium">
          From our beta users
        </div>
        <button
          onClick={nextSlide}
          className="p-3 md:p-4 bg-[#001A00] rounded-xl cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M3.75 9.31055H14.25M14.25 9.31055L9 4.06055M14.25 9.31055L9 14.5605"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Testimonials Container */}
      <div className="relative flex justify-center items-stretch w-full max-w-[343px] sm:max-w-[1200px] overflow-hidden md:gap-6">
        <AnimatePresence mode="wait">
          {testimonialsData
            .slice(index, index + visibleCards)
            .map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit="exit"
                variants={slideVariants}
                className="flex w-full max-w-sm md:max-w-[384px] p-6 md:p-8 flex-col gap-5 rounded-2xl shadow-2xl bg-white"
              >
                <div className="flex flex-col gap-5 h-full">
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image}
                      width={48}
                      height={48}
                      alt="avatar"
                    />
                    <div className="flex flex-col">
                      <p className="text-base font-circular-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[#42526B] font-circular-light">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-base font-circular-light text-[#061C3D]">
                    {testimonial.review}
                  </p>
                  <div className="flex-1"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} color="#FF8800" fill="#FF8800" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex gap-2.5">
        {testimonialsData.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              index === idx ? "bg-[#001A00] w-8" : "bg-[#CCEBDB]"
            }`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
