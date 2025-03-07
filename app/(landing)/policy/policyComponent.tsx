"use client";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import caution from "@/public/icons/caution.svg";
import file from "@/public/icons/file.svg";
import lock from "@/public/icons/lock.svg";
import shiled from "@/public/icons/shieldIcon.svg";

const policies = [
  {
    id: "terms",
    icon: file,
    title: "Terms of Service",
    content: [
      {
        title: "1. Introduction",
        body: "Welcome to ShopDesk. By accessing our platform you agree to these Terms of Service. We’ve tried to keep them clear and straight forward, but please read them carefully. ",
      },
      {
        title: "2. Service Description",
        body: "Shopdesk provides retail management tools to help businesses manage inventory, update product information, track sales, generate reports, and process transactions. We're here to simplify your retail operations.",
      },
      {
        title: "3. Account Responsibilities",
        body: "You're responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.",
      },
      {
        title: "4. Acceptable Use",
        body: "Use Shopdesk responsibly. Don't attempt to interfere with the service, access others' data, or use the platform for any illegal activities. We trust you, but we had to say it.",
      },
      {
        title: "5. Intellectual Property",
        body: "Shopdesk and its content are protected by intellectual property laws. We grant you a limited license to use our services as intended. Your data remains yours.",
      },
      {
        title: "6. Termination",
        body: "We may terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
      },
      {
        title: "7. Limitation of Liability",
        body: "Shopdesk is provided 'as is' without warranties. We're not liable for any indirect, incidental, or consequential damages. Our total liability is limited to the amount you paid us in the last 12 months.",
      },
      {
        title: "8. Changes to Terms",
        body: "We may modify these terms at any time. We'll notify you of significant changes. Your continued use of Shopdesk after changes constitutes acceptance of the new terms.",
      },
      {
        title: "9. Governing Law",
        body: "These terms are governed by the laws of the jurisdiction in which Shopdesk is headquartered, without regard to its conflict of law provisions.",
      },
    ],
  },
  {
    id: "privacy",
    icon: lock,
    title: "Privacy Policy",
    content: "This is the privacy policy content...",
  },

  {
    id: "refund",
    icon: shiled,
    title: "Data Processing",
    content: "This is the refund policy content...",
  },
  {
    id: "acceptable",
    icon: caution,
    title: "Acceptable Use",
    content: "This is the refund policy content...",
  },
];

const Policy = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(policies[0]);

  return (
    <div className="md:py-24 px-4 py-16">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-4xl font-bold">ShopDesk Legal Center</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto font-normal ">
          Everything You Need to Know About Using ShopDesk.
        </p>
      </div>

      <div className="flex md:flex-row flex-col items-center justify-center md:items-start md:mt-24 mt-8 ">
        {/* Sidebar */}
        <aside className="md:w-[218px]  py-4 px-3 ">
          <div className="space-y-2">
            {policies.map((policy) => (
              <Button
                key={policy.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  selectedPolicy.id === policy.id ? "bg-gray-100" : ""
                )}
                onClick={() => setSelectedPolicy(policy)}
              >
                <Image
                  src={policy.icon || "/default-icon.svg"}
                  alt=""
                  className="w-4 h-4 mr-2"
                  width={20}
                  height={20}
                />
                {policy.title}

                {selectedPolicy.id === policy.id ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </Button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className=" flex flex-col gap-16">
          <main className="flex-1 p-8 border-[1px] rounded-[14px] md:ml-48 flex flex-col ">
            <div className="flex items-center border-b border-b-gray-200 pb-8">
              <Image
                src={selectedPolicy.icon || "/default-icon.svg"}
                alt={selectedPolicy.title}
                className="w-6 h-6 mr-2"
                width={20}
                height={20}
              />

              <h1 className="text-xl font-medium">{selectedPolicy.title}</h1>
            </div>
            <div className="mt-4">
              {typeof selectedPolicy.content === "string" ? (
                <p className="mt-4 text-gray-700">{selectedPolicy.content}</p>
              ) : (
                selectedPolicy.content.map((section, index) => (
                  <div key={index} className="mt-4">
                    <h2 className="text-lg font-medium">{section.title}</h2>
                    <p className="text-gray-700 font-normal">{section.body}</p>
                  </div>
                ))
              )}
              <div className="mt-12 w-full flex justify-end">
                <p className="text-gray-600">Last updated: February 27, 2025</p>
              </div>
            </div>
          </main>

          <div className="flex justify-center text-gray-600">
            <p>
              If you have any questions about these policies, please{" "}
              <Link href="/contact" className=" underline ">
                contact us.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
