import FAQAccordion from "@/app/(landing)/faq/_components/faq-accordion";
import QuestionsCTA from "@/app/(landing)/faq/_components/questions-cta";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Find answers to frequently asked questions about ShopDesk's business inventory management solution, features, pricing, and support options.",
};

const FAQPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 lg:gap-8 px-4 py-12 md:max-w-[768px] xl:max-w-[1280px] mx-auto">
      <div className="text-center grid gap-5 max-w-[768px]">
        <h2 className="text-[#1B1B1B] text-4xl md:text-[60px] font-bold">
          Frequently Asked <span className="text-[#19A45B]">Questions</span>
        </h2>
        <p className="text-[#717171] text-xl">
          Find answers to common questions about ShopDesk. Use the search bar or
          browse by category
        </p>
      </div>
      <div className="max-w-[580px] w-full h-[48px] flex gap-4 relative">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#B8B8B8] h-5 w-5 " />
          <input
            type="text"
            name="search"
            className="rounded-[9px] h-full pl-10 border border-[#c2bcbc] placeholder:text-[#B8B8B8] text-xl w-full"
            placeholder="Search"
          />
        </div>
        <Button className="rounded-[9px] h-full max-w-[129px] w-full cursor-pointer">
          Search
        </Button>
      </div>
      <FAQAccordion />
      <QuestionsCTA />
    </div>
  );
};

export default FAQPage;
