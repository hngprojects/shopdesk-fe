"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/public/Avatar.svg";
import notification from "@/public/icons/_ui-bell-03.svg";
import stock from "@/public/icons/_ui-box.svg";
import business from "@/public/icons/_ui-briefcase-01.svg";
import billing from "@/public/icons/_ui-credit-card-02.svg";
import account from "@/public/icons/_ui-edit-02.svg";
import user from "@/public/icons/_ui-user-edit.svg";
import deleteIcon from "@/public/icons/_ui-trash-03-red.svg";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import Account from "./Account";
import Buisness from "./Buisness";
import StockPreference from "./stockpreference";
import Notification from "./notification";
import Billing from "./billing";
import UserPermission from "./userpermission";

function Settings() {
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="space-y-8 w-full h-full md:mt-8 mt-4">
      <div className="space-y-0 w-full ">
        <Tabs defaultValue="account" className="w-auto gap-0 ">
          <div className="gap-4 items-center hidden lg:flex ">
            <TabsList className="rounded-b-none border-[1px] border-b-0 border-[#e9eaeb] ">
              <TabsTrigger
                value="account"
                className="lg:text-[16px] text-sm px-2"
              >
                Account
              </TabsTrigger>
              <div className="h-[16px] w-[1px] bg-[#83838b] mx-1"></div>
              <TabsTrigger
                value="business"
                className="lg:text-[16px] text-sm px-2"
              >
                Business
              </TabsTrigger>
              <div className="h-[16px] w-[1px] bg-[#83838b] mx-1"></div>
              <TabsTrigger
                value="stockPreference"
                className="lg:text-[16px] text-sm px-2"
              >
                Stock Preference
              </TabsTrigger>
              <div className="h-[16px] w-[1px] bg-[#83838b] mx-1"></div>
              <TabsTrigger
                value="notification"
                className="lg:text-[16px] text-sm px-2"
              >
                Notification
              </TabsTrigger>
              <div className="h-[16px] w-[1px] bg-[#83838b] mx-1"></div>
              <TabsTrigger
                value="billingSubscription"
                className="lg:text-[16px] text-sm px-2"
              >
                Billing & Subscription
              </TabsTrigger>
              <div className="h-[16px] w-[1px] bg-[#83838b] mx-1"></div>
              <TabsTrigger
                value="userPermission"
                className="lg:text-[16px] text-sm px-2"
              >
                User Permission
              </TabsTrigger>
            </TabsList>

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

          <TabsContent
            value="account"
            className="w-full md:border-[1px] border-0  md:border-t-1 p-8 rounded-[12px] rounded-t-none flex flex-col justify-between gap-12"
          >
            <Account />
          </TabsContent>

          <TabsContent
            value="business"
            className="w-full md:border-[1px] border-0  md:border-t-1 p-8 rounded-[12px] rounded-t-none flex flex-col justify-between gap-12"
          >
            <Buisness />
          </TabsContent>

          <TabsContent
            value="stockPreference"
            className="w-full md:border-[1px] border-0  md:border-t-1 p-8 rounded-[12px] rounded-t-none flex flex-col justify-between gap-12"
          >
            <StockPreference />
          </TabsContent>

          <TabsContent
            value="notification"
            className="w-full md:border-[1px] border-0  md:border-t-1 p-8 rounded-[12px] rounded-t-none flex flex-col justify-between gap-12"
          >
            <Notification />
          </TabsContent>

          <TabsContent
            value="billingSubscription"
            className="w-full md:border-[1px] border-0  md:border-t-1 p-8 rounded-[12px] rounded-t-none flex flex-col justify-between gap-12"
          >
            <Billing />
          </TabsContent>

          <TabsContent
            value="userPermission"
            className="w-full md:border-[1px] border-0  md:border-t-1 p-8 rounded-[12px] rounded-t-none flex flex-col justify-between gap-12"
          >
            <UserPermission />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Settings;
