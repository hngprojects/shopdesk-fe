import { Button } from "@/components/ui/button";
import React from "react";
import { Download } from "lucide-react";

export default function layout({ children }: { children: React.ReactElement }) {
  return (
    <div>
      <div className="flex justify-between items-center pb-4 border-[#E9EAEB] border-b">
        <div className="space-y-2">
          <h2 className="text-[#181D27] font-[500] text-xl">
            Billing & Subscription Setting
          </h2>
          <p className="font-circular-medium text-[#535862] font-normal">
            Manage your subscription plan, payment methods, and billing history
            to keep your account active and up to date.
          </p>
        </div>
        <div className="md:flex items-center hidden gap-4">
          <Button className="py-3 px-6 rounded-[12px] hover:bg-white bg-white border border-[#1B1B1B] text-base text-[#2A2A2A]">
            Cancel
          </Button>
          <Button className="py-3 px-6 rounded-[12px] hover:bg-[#2A2A2A] bg-[#2A2A2A] border border-[#1B1B1B] text-base text-[#ffffff]">
            Save
          </Button>
        </div>
      </div>
      {children}
      <div className="space-y-4 py-4 border-[#E9EAEB] border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-[500] text-[#414651]">
            Billing History
          </h1>
          <Button className="py-3 px-6 rounded-[12px] hover:bg-white bg-white border border-[#1B1B1B] text-base text-[#2A2A2A]">
            <Download className="text-[#2A2A2A]" /> Download
          </Button>
        </div>
        <div className="rounded-[8px] border flex items-center justify-center h-[300px] border-[#E9EAEB] shadow shadow-[#0A0D12]/5">
          <p className="text-[#888888] text-xl font-[500]">
            You have no billing history
          </p>
        </div>
        <div className="md:hidden  items-center justify-center flex gap-4">
          <Button className="py-3 px-6 rounded-[12px] hover:bg-white bg-white border border-[#1B1B1B] text-base text-[#2A2A2A]">
            Cancel
          </Button>
          <Button className="py-3 px-6 rounded-[12px] hover:bg-[#2A2A2A] bg-[#2A2A2A] border border-[#1B1B1B] text-base text-[#ffffff]">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
