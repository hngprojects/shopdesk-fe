"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    text: "As someone who isn't tech-savvy, I was worried about switching systems. But ShopDesk is incredibly user-friendly, and the onboarding was a breeze!",
    name: "Mark M",
    role: "Small Business Owner",
    avatar: "/smart-business/Container.svg",
  },
  {
    text: "ShopDesk made inventory management effortless. Now I focus more on my customers rather than worrying about stock levels!",
    name: "Jane D",
    role: "Retail Store Owner",
    avatar: "/smart-business/Container.svg",
  },
  {
    text: "The reports and analytics from ShopDesk give me clear insights into my business. It's been a game changer!",
    name: "David O",
    role: "Entrepreneur",
    avatar: "/smart-business/Container.svg",
  },
];

export default function TestimonialCarousel() {
  const [activeButton, setActiveButton] = useState<"prev" | "next" | null>(null);

  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  
  const handlePrevClick = () => {
    setActiveButton('prev');
    setTimeout(() => setActiveButton(null), 300);
  };
  
  const handleNextClick = () => {
    setActiveButton('next');
    setTimeout(() => setActiveButton(null), 300);
  };

  return (
    <div className="bg-[#E6F4EC] rounded-[24px] p-6 md:p-10 max-w-6xl mx-auto relative my-9" data-aos="fade-up">
      <div className="flex justify-between mb-8">
        <button 
          className={`prev-btn w-10 h-10 ${activeButton === 'prev' ? 'bg-[#001E0B]' : 'bg-white'} rounded-md flex items-center justify-center shadow-sm transition-colors duration-300`}
          onClick={handlePrevClick}
        >
          {activeButton === 'prev' ? (
            <ArrowRight className="h-5 w-5 text-white" />
          ) : (
            <ArrowLeft className="h-5 w-5" />
          )}
        </button>
        
        <h3 className="text-[#2CB67D] text-xl font-medium" data-aos="fade-down" data-aos-delay="200">
          Reviews from Beta Users
        </h3>
        
        <button 
          className={`next-btn w-10 h-10 ${activeButton === 'next' ? 'bg-[#001E0B]' : 'bg-white'} rounded-md flex items-center justify-center shadow-sm transition-colors duration-300`}
          onClick={handleNextClick}
        >
          {activeButton === 'next' || !activeButton ? (
            <ArrowRight className={`h-5 w-5 ${activeButton === 'next' ? 'text-white' : ''}`} />
          ) : (
            <ArrowLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center" data-aos="fade-in" data-aos-delay="300">
              <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mb-6">
                {testimonial.text}
              </p>
              
              <p className="font-medium text-lg mb-5">
                — {testimonial.name}, {testimonial.role}
              </p>
              
              <div className="w-16 h-16 rounded-full overflow-hidden" data-aos="zoom-in" data-aos-delay="400">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}