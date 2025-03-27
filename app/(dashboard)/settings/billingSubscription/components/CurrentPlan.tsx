import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CurrentPlan() {
  return (
    <div className="flex flex-col md:flex-row justify-between py-4 gap-4 border-[#E9EAEB] border-b">
      <h1 className="text-base font-[500] text-[#414651]">Current Plan</h1>
      <div className="w-full md:w-[80%] border border-[#EDEDED] rounded-[8px] p-4 flex flex-col gap-2 ">
        <h2 className="text-[#1F1F1F] text-xl font-[500]">Plan: Free</h2>
        <p className="font-circular-medium text-[#8A8A8A] font-normal text-sm">
          Take your Inventory to the next level with more features.
        </p>
        <div className="flex justify-between items-center">
          <p className="text-[#19A45B] text-2xl font-[500] font-circular-normal">
            ₦0 / month
          </p>
          <Button className="py-3 px-4 rounded-[8px] hover:bg-white bg-white border border-[#EDEDED] text-base text-[#1F1F1F]">
            <Link
              className="w-full"
              href="/settings/billingSubscription/upgrade-plan"
            >
              Upgrade Plan
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
