"use client";
import Image from 'next/image';
import plus from '@/public/icons/plus-circle.svg';
import minus from '@/public/icons/minus-circle.svg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function FAQAccordion() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <CustomAccordion />
    </div>
  );
}

function CustomAccordion() {
  const faqContent = [
    {
      question: "Is Shopdesk right for my business?",
      answer:
        "Yes! Whether you sell clothing, electronics, or general retail items, Shopdesk makes inventory and sales tracking simple.",
    },
    {
      question: "Can I use Shopdesk on mobile?",
      answer:
        "Absolutely. Access your dashboard on your phone, tablet, or laptop anytime.",
    },
    {
      question: "Is there a free plan?",
      answer:
        "Yes. Get started with our free plan—no credit card required.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full lg:max-w-5xl">
      {faqContent.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b border-slate-200 py-4"
          data-aos="fade-up"
          data-aos-delay={`${index * 100}`}
          data-aos-once="false"
        >
          <AccordionTrigger className="flex justify-between text-lg font-medium hover:no-underline group cursor-pointer text-[#101828] text-left">
            {item.question}
            <AccordionIcon />
          </AccordionTrigger>
          <AccordionContent className="text-[#667085] text-[16px] pt-4">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AccordionIcon() {
  return (
    <div className="flex">
      <Image
        src={plus}
        alt="plus-icon"
        className="h-6 w-6 text-green-500 group-data-[state=open]:hidden"
      />
      <Image
        src={minus}
        alt="minus-icon"
        className="h-6 w-6 text-green-500 hidden group-data-[state=open]:block"
      />
    </div>
  );
}