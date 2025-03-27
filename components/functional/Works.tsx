import React from "react";
import phone from "@/public/home-images/phone.png";
import Image from "next/image";
export default function Works() {
  const steps = [
    {
      id: 1,
      title: "Easy Account Setup",
      content:
        "Create your Shopdesk account and add your products, pricing, and business details.",
    },
    {
      id: 2,
      title: "Sales and Stock Management",
      content:
        "Process sales quickly while Shopdesk automatically updates your inventory in real time.",
    },
    {
      id: 3,
      title: "Track and Analyze Reports",
      content:
        "Monitor sales, expenses, and stock levels with smart insights and custom reports.",
    },
    {
      id: 4,
      title: "Grow Your Business",
      content:
        "Make data-driven decisions, prevent stock issues, and boost profits with an easy to use shop management software.",
    },
  ];
  return (
    <div
      id="features"
      className="mx-auto max-w-[1198px] px-5 min-[600px]:px-10 py-12"
    >
      <h2
        className="text-center py-4 md:py-3 font-medium leading-6 text-[#009A49]"
        data-aos="fade-up"
        data-aos-once="false" // Allow this element to re-animate
      >
        How It Works
      </h2>
      <div className="flex md:flex-row flex-col-reverse items-center gap-8 ">
        <div className="w-[50%]">
          <Image
            src={phone}
            alt="phone"
            className="  mb-6"
            data-aos="zoom-in"
            data-aos-delay="300"
            data-aos-once="false" // Allow this element to re-animate
          />
        </div>
        <div className="space-y-10 w-full lg:w-[70%] ">
          {steps.map((step) => (
            <div
              key={step.id}
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-once="false"
              className="flex md:items-center items-start gap-6 md:gap-8"
              //   className="grid grid-cols-[0.4fr_1fr]  place-items-start md:place-items-center "
            >
              <div className="flex gap-4 md:gap-6 items-center">
                <p className="font-[450] text-xl text-[#888888]">Step</p>
                <div
                  className={`size-[64px] flex items-center justify-center rounded-full  ${
                    step.id === 2
                      ? "text-white bg-[#2A2A2A]"
                      : "bg-[#EDEDED] text-[#888888]"
                  }`}
                >
                  0{step.id}
                </div>
              </div>
              <div className="space-y-2 ">
                <h3
                  className={`text-2xl leading-[36px] font-[500] ${
                    step.id === 2 ? "text-[#2A2A2A]" : "text-[#888888]"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-lg leading-[28px] font-[450] ${
                    step.id === 2 ? "text-[#2A2A2A]/80" : "text-[#888888]/80"
                  }`}
                >
                  {step.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
