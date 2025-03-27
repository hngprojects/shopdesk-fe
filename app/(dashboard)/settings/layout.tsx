"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();
  const slug = pathname.split("/").at(2);
  const tabs = [
    {
      name: "Account",
      value: "account",
      link: "/settings/account",
    },
    {
      name: "Business",
      value: "business",
      link: "/settings/business",
    },
    {
      name: "Stock Preference",
      value: "stockPreference",
      link: "/settings/stockPreference",
    },
    {
      name: "Notification",
      value: "notification",
      link: "/settings/notification",
    },
    {
      name: "Billing & Subscription",
      value: "billingSubscription",
      link: "/settings/billingSubscription",
    },
    {
      name: "User Permission",
      value: "userPermission",
      link: "/settings/userPermission",
    },
  ];
  return (
    <main className="px-6 py-4 w-full max-w-7xl mx-auto flex flex-col main-h-svh ">
      <div className="space-y-8 w-full h-full">
        <DashboardHeader />
        <div className="space-y-0 w-full ">
          <Tabs
            defaultValue={slug ? slug : "account"}
            className="w-auto gap-0 "
          >
            <div className="gap-4 items-center hidden lg:flex justify-between">
              <TabsList className="rounded-b-none border-[1px] flex justify-evenly ] border-b-0 w-full border-[#e9eaeb] ">
                {tabs.map((tab) => (
                  // <div className="h-[16px] w-[1px] bg-[#83838b] mx-1" />
                  <TabsTrigger
                    value={tab.value}
                    key={tab.value}
                    className="lg:text-[16px] text-sm px-2 rounded-none cursor-pointer"
                  >
                    <Link className="cursor-pointer" href={tab.link}>
                      {tab.name}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex items-end justify-end">
                <div className="relative ml-0">
                  <input
                    type="text"
                    className="h-12 border xl:w-[315px] w-[200px] rounded-md focus:outline-2 focus:outline-[#009A49] px-10"
                    onChange={(event) => {
                      setIsSearching(true);
                      setSearchText(event.target.value);
                      if (!event.target.value) {
                        setIsSearching(false);
                      }
                    }}
                    placeholder="Search settings"
                  />
                  <Search className="text-[#667085] absolute top-3 left-3 " />
                </div>
              </div>
            </div>
            <div className="h-full p-4 border-x border-[#DEE5ED]">
              {children}
            </div>
          </Tabs>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-center mt-4">
          &copy; {new Date().getFullYear()}, Powered by Timbu Business
        </p>
      </div>
    </main>
  );
}
