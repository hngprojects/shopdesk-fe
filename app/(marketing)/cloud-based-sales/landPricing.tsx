"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Features } from "@/components/shared/features";
import Link from "next/link";

const Pricing = () => {
  interface PriceCardContentOptions {
    plan: string;
    monthlyPrice: string;
    annualPrice: string;
    monthlyLink: string;
    annualLink: string;
    item: string[];
  }

  const [isAnnual, setIsAnnual] = useState(false);

  const horizontalRuleStyles: string = "bg-[#d0d0d0] h-[1px] w-full";
  const priceCardContent: PriceCardContentOptions[] = [
    {
      plan: "Free Plan",
      monthlyPrice: "$0/Month",
      annualPrice: "$0/year",
      monthlyLink: "#",
      annualLink: "#",
      item: [
        "Manage up to 10 products (add, edit, view, and delete).",
        "Record up to 3 sales transactions per day.",
      ],
    },
    {
      plan: "Basic Plan",
      monthlyPrice: "$30/Month",
      annualPrice: "$300/Year",
      monthlyLink: "https://buy.stripe.com/4gw3gbgEw5644243cQ",
      annualLink: "https://buy.stripe.com/4gweYTewo7ec7eg6p3",
      item: [
        "Add up to 70 products.",
        "Support for up to 5 users per organization.",
        "Record up to 20 sales transactions per day.",
        "Generate receipts for printing.",
        "Stock export is available in view-only mode.",
      ],
    },
    {
      plan: "Premium Plan",
      monthlyPrice: "$50/Month",
      annualPrice: "$500/Year",
      monthlyLink: "https://buy.stripe.com/eVa2c7cog7ecbuw00G",
      annualLink: "https://buy.stripe.com/fZe5oj5ZSbus568aFl",
      item: [
        "Unlimited product management.",
        "Record an unlimited number of sales transactions daily.",
        "Apply discounts to sales transactions.",
        "Generate receipts for printing, email, and SMS delivery.",
        "Export data in CSV and PDF formats with full access to view and analyze.",
        "Unlimited users per organization.",
      ],
    },
  ];

  return (
    <main>
      <section className="w-full bg-[#fafafb] pt-[96px] flex flex-col items-center gap-[48px] px-2">
        <div className="flex flex-col gap-[24px] items-center p-2.5">
          {/* <h2 className="font-medium text-[36px] leading-[42px] md:text-[60px] md:leading-[120%] max-w-[30ch] text-center text-[#2a2a2a]">
            Simple, Transparent Pricing for Every Business
          </h2>
          <p className="text-center font-[400] text-[#717171] text-[18px] md:text-[20px] leading-[150%]">
            Choose a plan that fits your business needs. No hidden fees, cancel
            anytime.
          </p> */}
           <p className="py-2 px-4 rounded-[24px] md:bg-[rgba(0,154,73,0.05)] text-[#009A49] font-[500] text-[16px] leading-[24px]">
           Choose a Plan That Fits Your Business
          </p>
        </div>
        {/* Toggle between Monthly and Annually */}
        <div className="flex gap-2 p-2.5 rounded-2xl items-center bg-[#f1f1f1] w-[227px] h-16">
          <Button
            className={`w-[102px] text-[#2a2a2a] transition-colors ${
              !isAnnual
                ? "text-white bg-[#2a2a2a] border-[#1b1b1b]"
                : "bg-transparent  hover:text-white"
            }`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </Button>
          <Button
            type="button"
            className={`w-[102px] text-[#2a2a2a] transition-colors ${
              isAnnual
                ? "text-white bg-[#2a2a2a] border-[#1b1b1b]"
                : "bg-transparent  hover:text-white"
            }`}
            onClick={() => setIsAnnual(true)}
          >
            Annually
          </Button>
        </div>

        <section className="w-full px-[10px] pt-[4px] pb-[64px] lg:px-4 lg:pb-[64px] lg:gap-[29px] flex flex-wrap justify-center gap-4 bg-white lg:bg-transparent">
          {priceCardContent.map(
            (cardContent: PriceCardContentOptions, index: number) => {
              return (
                <div
                  className="flex column items-center flex-col p-[32px] gap-[35px] bg-whit rounded-[16px] border-[1px] border-[#dedede] w-[min(100%,351px)]"
                  key={index}
                >
                  <div className="flex flex-col gap-6 items-center *:font-medium *:text-[#2a2a2a]">
                    <p className="bg-[#f1f1f1] rounded-[6px] p-2 flex justify-center items-center  text-[12px] leading-[16px] uppercase">
                      {cardContent.plan}
                    </p>
                    <p className="text-4xl leading-[56px]">
                      {isAnnual
                        ? cardContent.annualPrice
                        : cardContent.monthlyPrice}
                    </p>
                  </div>
                  <div className={`${horizontalRuleStyles}`} />
                  <div className="flex flex-col  items-start gap-4">
                    {cardContent.item.map((item: string, i: number) => (
                      <p
                        key={i}
                        className="text-base leading-[24px] text-[#717171] flex gap-2 items-start"
                      >
                        <span
                          className="rounded-[4px] bg-[#009A49] flex items-center justify- border-[1.4px] border-white h-[18px] 
                        w-[18px] mt-0.5"
                        >
                          <img
                            src="/pricing/tick.svg"
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                        </span>
                        <span className="flex-1 text-base leading-[20px] text-[#717171] text-left">
                          {item}
                        </span>
                      </p>
                    ))}
                  </div>
                  <div className={`${horizontalRuleStyles}`}></div>
                  <div className="flex-1"></div>
                  <Link href="/sign-up">
                    <Button className="w-full py-[10px] px-[18px] rounded-[8px] border-[1px] border-[#1b1b1b] bg-[#2a2a2a] mt-auto">
                      Get Started
                    </Button>
                  </Link>
                </div>
              );
            }
          )}
        </section>
      </section>

      {/* <Features text="Features" /> */}
    </main>
  );
};

export default Pricing;

