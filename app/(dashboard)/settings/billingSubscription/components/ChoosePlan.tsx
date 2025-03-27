"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Modal } from "./Modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";

export default function ChoosePlan() {
  const buttons = [
    {
      text: "Monthly",
      id: "monthly",
    },
    {
      text: "Annually",
      id: "annually",
    },
  ];
  const [value, setValue] = useState("monthly");
  const [planSelect, setPlanSelect] = useState("free");
  const plans =
    value === "monthly"
      ? [
          {
            title: "Free",
            price: "0",
            id: "free",
            link: "",
          },
          {
            title: "Basic",
            price: "15,000",
            id: "basic",
            link: "https://buy.stripe.com/4gw3gbgEw5644243cQ",
          },
          {
            title: "Premium",
            price: "55,000",
            id: "premium",
            link: "https://buy.stripe.com/eVa2c7cog7ecbuw00G",
          },
        ]
      : [
          {
            title: "Free",
            price: "0",
            id: "free",
            link: "",
          },
          {
            title: "Basic",
            price: "180,000",
            id: "basic",
            link: "https://buy.stripe.com/4gweYTewo7ec7eg6p3",
          },
          {
            title: "Premium",
            price: "650,000",
            id: "premium",
            link: "https://buy.stripe.com/fZe5oj5ZSbus568aFl",
          },
        ];

  const active = "free";
  return (
    <div className="flex flex-col md:flex-row justify-between py-4 gap-4 border-[#E9EAEB] border-b">
      <h1 className="text-base font-[500] text-[#414651]">Upgrade Plan</h1>
      <div className="w-full md:w-[80%] border border-[#EDEDED] rounded-[8px] p-4 flex flex-col gap-2 ">
        <div className="flex items-center">
          <div className="space-y-2 w-full md:w-[60%]">
            <h2 className="text-[#1F1F1F] text-xl font-[500]">
              Select New Plan
            </h2>
            <p className="font-circular-medium text-[#8A8A8A] font-normal text-sm">
              Choose a plan that fits your retail business needs, covering
              inventory management, sales tracking and more. No hidden fees,
              cancel anytime.
            </p>
          </div>
          <div className="flex justify-end items-end w-[40%]">
            <div className="bg-[#F1F1F1] flex p-2.5 rounded-[16px] w-fit">
              {buttons.map((button) => (
                <Button
                  key={button.id}
                  onClick={() => setValue(button.id)}
                  className={`
        py-4 px-6  rounded-[6px]  text-sm font-[500]
        ${
          value === button.id
            ? "bg-[#2A2A2A] text-[#ffffff]"
            : "hover:bg-transparent text-[#1B1B1B] bg-transparent shadow-none "
        }
        `}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <RadioGroup defaultValue={active}>
          {plans.map((plan) => (
            <div
              className={`
                 ${
                   active === plan.id &&
                   "bg-[#F1F1F1] border cursor-pointer border-[#D7DEEA]"
                 }
            flex items-center space-x-2 gap-2 py-5 px-6 rounded-[16px] border-[#DEDEDE] border`}
            >
              <RadioGroupItem
                onClick={() => setPlanSelect(plan.id)}
                value={plan.id}
                id={plan.id}
              />
              <Label
                htmlFor={plan.id}
                className={` flex justify-between items-center w-full gap-1.5 cursor-pointer`}
              >
                <div className="space-y-1">
                  <h4 className="font-[500] text-black text-xl">
                    {plan.title} Plan
                  </h4>
                  <div className="text-base font-[500] text-[#707F8F] flex items-center gap-0.5">
                    <p>₦{plan.price} /</p>
                    <p>{value === "monthly" ? "Month" : "Year"}</p>
                    {active === plan.id && <p>/ Current Plan</p>}
                  </div>
                </div>
                {active !== plan.id && (
                  <Modal
                    link={plan.link}
                    select={`
                                
                            ${plan.title} Plan Selected
                            `}
                    text={`You've chosen to pay for ${
                      value === "monthly" ? "a monthly" : "an annual"
                    } ${plan.title} Plan `}
                    price={`₦${plan.price}/${
                      value === "monthly" ? "Month" : "Yr"
                    }`}
                  >
                    <Button
                      disabled={planSelect !== plan.id}
                      className={`
                        text-sm font-[500] w-fit text-[#2A2A2A] border border-[#1B1B1B] rounded-[8px] ${
                          planSelect !== plan.id
                            ? "bg-white hover:bg-transparent"
                            : "bg-[#2A2A2A] text-white"
                        } py-1.5 px-3 disabled:!text-[#2A2A2A]`}
                    >
                      Upgrade
                    </Button>
                  </Modal>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
