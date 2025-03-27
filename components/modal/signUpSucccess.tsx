"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import printer from "../../public/icons/Icon Container.svg"

interface SignUpSuccess {
  isOpen: boolean,
  onClose: () => void;
  email: string;
}

export default function SignUpSuccess ({
  isOpen,
  onClose,
  email,
}: SignUpSuccess) {
  if (isOpen === false) return null
  const router = useRouter()

  const handleRouting = () => {
    router.push('/stock')
    
  }
  return (
    <>
      <div className="absolute inset-0 bg-[#24242433] flex text-center">
        <div className="bg-white absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-[650px] w-full max-[850px]:w-[500px] max-[600px]:w-[400px] max-[500px]:w-[300px] py-12 border border-[#DEE5ED] rounded-xl flex flex-col items-center justify-center gap-2">

          <button 
            className="btn-outline border-[#1B1B1B] p-1.5 absolute top-6 right-6"
            onClick={handleRouting}
          >
            <X className="size-6"/>
          </button>

          <div className="size-14 bg-[#CCEBDB] flex items-center justify-center rounded-md mb-2">
            <Image 
              src={printer}
              alt="printer icon"
            />
          </div>

          <p className="font-circular-normal font-semibold text-[24px]">
           Sign Up successfully
          </p>
          <p className="font-circular-normal text-[18px] text-[#717171]">
           Email has been sent to {email}
          </p>

          <div className="max-w-[600px] mt-5 w-full px-8">
            <Button 
              className="w-full"
              onClick={handleRouting}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}