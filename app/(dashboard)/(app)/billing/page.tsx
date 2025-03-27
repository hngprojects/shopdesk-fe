"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Features } from "@/components/shared/features";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/functional/logo";
import settings from "@/public/icons/_ui-settings-01.svg";
import viewDeleted from "@/public/icons/_ui-trash-03.svg";
import { ChevronDown, Loader2, Plus, Search, X } from "lucide-react";
import logout from "@/public/icons/_ui-log-out-02.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useStore } from "@/store/useStore";
import BillingFooter from "./components/footer";
import BillingHeader from "./components/header";

const Page = () => {
  interface PriceCardContentOptions {
    plan: string;
    monthlyPrice: string;
    annualPrice: string;
    monthlyLink: string;
    annualLink: string;
    item: string[];
  }

  const [isAnnual, setIsAnnual] = useState(false);
  const [plan, setPlan ] = useState("Free Plan")

  const horizontalRuleStyles: string = "bg-[#d0d0d0] h-[1px] w-full";
  const priceCardContent: PriceCardContentOptions[] = [
    {
      plan: "Free Plan",
      monthlyPrice: "$0/Mo",
      annualPrice: "$0/Yr",
      monthlyLink: "#",
      annualLink: "#",
      item: [
        "Track up to 50 items in stock.",
        "Basic sales and profit tracking.",
        "Offline mode with local storage.",
        "Single user (admin role only)"
      ],
    },
    {
      plan: "Pro Plan",
      monthlyPrice: "$30/Mo",
      annualPrice: "$300/Yr",
      monthlyLink: "https://buy.stripe.com/4gw3gbgEw5644243cQ",
      annualLink: "https://buy.stripe.com/4gweYTewo7ec7eg6p3",
      item: [
        "Add up to 70 products.",
        "Export daily/weekly reports",
        "3 users (admin + 2 staff )",
        "Priority email support",
      ],
    },
    {
      plan: "Enterprise Plan",
      monthlyPrice: "$50/Mo",
      annualPrice: "$500/Yr",
      monthlyLink: "https://buy.stripe.com/eVa2c7cog7ecbuw00G",
      annualLink: "https://buy.stripe.com/fZe5oj5ZSbus568aFl",
      item: [
        "Unlimited users and roles.",
        "Bulk import/export for stock",
        "Compliance audits (GDPR)",
        "Dedicated account manager"
      ],
    },
  ];  

  return (
    <>      
      <BillingHeader />
      <main>
        <section className="w-full pt-[96px] flex flex-col items-center gap-[48px] px-2">
          <div className="flex flex-col gap-[24px] items-center p-2.5">
            <h2 className="font-circular-bold text-[36px]  md:text-[60px]  max-w-[30ch] text-center text-[#2a2a2a]">
              Available Subscriptions
            </h2>
            <p className="text-center font-circular-light text-[#717171] text-[18px] md:text-[20px] leading-[150%] max-w-[768px] -mt-6">
            Choose a plan that fits your retail business needs, covering inventory management, sales tracking and more. No hidden fees, cancel anytime.
            </p>
          </div>
          {/* Toggle between Monthly and Annually */}
          <div className="flex p-[10px] rounded-[16px] items-center bg-[#f1f1f1] w-[227px] h-[64px]">
            <Button
              className={`w-[102px] ${
                !isAnnual ? "text-white bg-[#2a2a2a] border-[#1b1b1b]" : "bg-transparent text-[#2a2a2a]"
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </Button>
            <Button
              className={`w-[102px] ${
                isAnnual ? "text-white bg-[#2a2a2a] border-[#1b1b1b]" : "bg-transparent text-[#2a2a2a]"
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
                    className={`flex column items-center flex-col p-[32px] gap-[35px] rounded-[16px] border-[1px] border-[#dedede] w-[min(100%,351px)] ${plan === cardContent.plan ? 'bg-[#FEF6F6]' : 'bg-white'}`}
                    key={index}
                  >
                    <div className="flex flex-col gap-6 items-center *:font-[500] *:text-[#2a2a2a]">
                      <p className="bg-[#f1f1f1] rounded-[6px] p-2 flex justify-center items-center  text-[12px] leading-[16px] uppercase">
                        {cardContent.plan}
                      </p>
                      <p className="text-4xl leading-[56px]">
                      {isAnnual ? cardContent.annualPrice : cardContent.monthlyPrice}
                      </p>
                    </div>
                    <div className={`${horizontalRuleStyles}`}></div>
                    <div className="flex flex-col  items-start gap-[16px]">
                      {cardContent.item.map((item: string, i: number) => (
                        <p
                          key={i}
                          className="text-[16px] leading-[24px] text-[#717171] flex gap-2 items-start"
                        >
                          <span className="rounded-[4px] bg-[#009A49] flex items-center justify- border-[1.4px] border-white h-[18px] 
                          w-[18px] mt-0.5">
                            <img
                              src="/pricing/tick.svg"
                              aria-hidden="true"
                              className="h-4 w-4"
                            />
                          </span>
                          <span className="flex-1 text-[16px] leading-[20px] text-[#717171] text-left">
                            {item}
                          </span>
                        </p>
                      ))}
                    </div>
                    <div className={`${horizontalRuleStyles}`}></div>
                    <div className="flex-1">

                    </div>
                    <Link className="w-full flex flex-col items-stretch" href={isAnnual? cardContent.annualLink : cardContent.monthlyLink} target="_blank">
                      <button className={plan === cardContent.plan? 'btn-primary' : 'btn-outline'}>
                      {plan === cardContent.plan ? 'Current Plan' : 'Upgrade'}
                      </button>
                    </Link>

                  </div>
                );
              }
            )}
          </section>
        </section>

      </main>
      <BillingFooter />
    </>
  );
};

export default Page;
