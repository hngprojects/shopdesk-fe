"use client";
import Image from 'next/image';
import plus from '@/public/icons/plus-circle.svg'
import minus from '@/public/icons/minus-circle.svg'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FAQAccordion() {
  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="general" className="w-full bg-white">
        <TabsList className="flex gap-5 mb-8 justify-start md:justify-center bg-white overflow-x-auto whitespace-nowrap w-full scrollbar-hide">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white bg-white py-3 px-6 font-medium text-[#2A2A2A] rounded-2xl md:rounded-full border border-[#1b1b1b] cursor-pointer"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="pricing"
            className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white bg-white py-3 px-6 font-medium text-[#2A2A2A] rounded-2xl md:rounded-full border border-[#1b1b1b] cursor-pointer"
          >
            Pricing
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white bg-white py-3 px-6 font-medium text-[#2A2A2A] rounded-2xl md:rounded-full border border-[#1b1b1b] cursor-pointer"
          >
            Inventory
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white bg-white py-3 px-6 font-medium text-[#2A2A2A] rounded-2xl md:rounded-full border border-[#1b1b1b] cursor-pointer"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger
            value="support"
            className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white bg-white py-3 px-6 font-medium text-[#2A2A2A] rounded-2xl md:rounded-full border border-[#1b1b1b] cursor-pointer"
          >
            Technical support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="max-w-3xl mx-auto">
          <CustomAccordion />
        </TabsContent>

        <TabsContent value="pricing" className="max-w-3xl mx-auto">
          <CustomAccordion type="pricing" />
        </TabsContent>

        <TabsContent value="inventory" className="max-w-3xl mx-auto">
          <CustomAccordion type="inventory" />
        </TabsContent>

        <TabsContent value="sales" className="max-w-3xl mx-auto">
          <CustomAccordion type="sales" />
        </TabsContent>

        <TabsContent value="support" className="max-w-3xl mx-auto">
          <CustomAccordion type="support" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CustomAccordion({ type = "general" }: { type?: string }) {
  // Different FAQ content based on the tab
  const faqContent = {
    general: [
      {
        question: "What is ShopDesk?",
        answer:
          "ShopDesk is a retail management platform that helps small and medium businesses manage inventory, process sales, track reports, and accept payments in one place.",
      },
      {
        question: "Who can use ShopDesk?",
        answer:
          "ShopDesk is designed for small and medium-sized retail businesses, including boutiques, specialty stores, and local shops looking for an all-in-one management solution.",
      },
      {
        question: "Can I access ShopDesk on mobile?",
        answer:
          "Yes, ShopDesk is fully responsive and can be accessed on mobile devices. We also offer dedicated mobile apps for iOS and Android for on-the-go management.",
      },
      {
        question: "Does ShopDesk require an internet connection?",
        answer:
          "ShopDesk primarily operates as a cloud-based solution requiring internet connectivity. However, we do offer offline mode for basic POS operations that will sync once connection is restored.",
      },
    ],
    pricing: [
      {
        question: "How much does ShopDesk cost?",
        answer:
          "ShopDesk offers flexible pricing plans starting at $29/month for small businesses. We also offer custom enterprise plans for larger operations.",
      },
      {
        question: "Is there a free trial available?",
        answer:
          "Yes, we offer a 14-day free trial with full access to all features so you can test if ShopDesk is right for your business.",
      },
      {
        question: "Are there any setup fees?",
        answer:
          "No, ShopDesk does not charge any setup fees. You only pay for your subscription plan.",
      },
    ],
    inventory: [
      {
        question: "How does inventory management work?",
        answer:
          "ShopDesk provides real-time inventory tracking across all your locations, automatic stock alerts, and easy product categorization.",
      },
      {
        question: "Can I import my existing inventory?",
        answer:
          "Yes, ShopDesk supports CSV imports and integrations with popular platforms to make migrating your inventory data simple.",
      },
    ],
    sales: [
      {
        question: "What payment methods are supported?",
        answer:
          "ShopDesk supports all major credit cards, mobile payments like Apple Pay and Google Pay, and can integrate with popular payment processors.",
      },
      {
        question: "Can I customize receipts?",
        answer:
          "Yes, ShopDesk allows full customization of digital and printed receipts with your logo, custom messages, and promotional offers.",
      },
    ],
    support: [
      {
        question: "How can I get help with ShopDesk?",
        answer:
          "We offer 24/7 customer support via chat, email, and phone. Our knowledge base also contains detailed guides and tutorials.",
      },
      {
        question: "Is training available for my staff?",
        answer:
          "Yes, we provide free onboarding sessions and training materials. Premium plans include dedicated training sessions for your team.",
      },
    ],
  };

  const items =
    faqContent[type as keyof typeof faqContent] || faqContent.general;

  return (
    <Accordion type="single" collapsible className="w-full lg:min-w-[768px]">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b border-slate-200 py-4"
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
    <>
      <div className="flex">
        <Image src={plus} alt='plus-icon' className="h-6 w-6 text-green-500 group-data-[state=open]:hidden" />
        <Image src={minus} alt='minus-icon' className="h-6 w-6 text-green-500 hidden group-data-[state=open]:block" />
      </div>
    </>
  );
}
