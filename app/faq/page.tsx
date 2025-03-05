import FAQAccordion from "@/components/faq/faq-accordion";
import QuestionsCTA from "@/components/faq/questions-cta";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 lg:gap-8 px-4 py-12">
      <div className="text-center grid gap-5 max-w-[768px]">
        <h2 className="text-[#101828] text-4xl font-bold">
          Frequently asked questions
        </h2>
        <p className="text-[#717171] text-xl">
          Find answers to common questions about ShopDesk. Use the search bar or
          browse by category
        </p>
      </div>
      <div className="max-w-[606px] w-full flex gap-4">
        <input
          type="text"
          name="search"
          className="rounded-[9px] p-4 border border-[#c2bcbc] placeholder:text-[#D0D0D0] text-xl w-full"
          placeholder="Search"
        />
        <button className="bg-[#009A49] text-xl w-[196px] font-medium text-[#FFFFFF] rounded-[9px]">
          Search
        </button>
      </div>
      <FAQAccordion />
      <QuestionsCTA />
    </div>
  );
};

export default Page;
