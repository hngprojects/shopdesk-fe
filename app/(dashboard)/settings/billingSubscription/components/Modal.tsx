import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import React from "react";

import { BsPatchCheck } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";

export function Modal({
  children,
  select,
  text,
  price,
  link,
}: {
  select: string;
  text: string;
  link: string;
  price: string;
  children: React.ReactElement;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="p-0">
        <AlertDialogHeader className="flex items-center justify-center relative pt-6">
          <AlertDialogCancel className="absolute left-[90%] bottom-[70%] w-fit rounded-[9px] border border-[#1B1B1B] text-[#2A2A2A]  !p-[9px] ">
            <FaXmark />
          </AlertDialogCancel>
          <AlertDialogTitle className="flex flex-col items-center gap-1">
            <div className="bg-[#E5F5ED] rounded-[8px] p-2 w-fit">
              <BsPatchCheck className="text-[#00802F]" />
            </div>
            <p className="text-2xl font-[500] text-[#1B1B1B]">{select}</p>
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-1 text-center">
            <p className="text-[#717171] text-lg font-[300]">{text}</p>
            <p className="text-[#1B1B1B] font-[500] text-4xl">{price}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full flex items-center justify-center py-6 border border-[#DEE5ED] bg-[#F6F8FA]">
          <AlertDialogFooter className=" w-[95%] flex items-center  justify-center">
            <AlertDialogCancel className="w-[50%] border border-[#1B1B1B] text-[#2A2A2A] rounded-[12px] py-3 px-6">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="w-[50%] rounded-[12px] py-3 px-6">
              <Link className="w-full" href={link}>
                Pay with Stripe
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
