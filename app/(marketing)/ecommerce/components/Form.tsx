import { ArrowRight } from 'lucide-react'
import React from 'react'

export const Form = () => {
    const sharedClass: string = "flex flex-col items-center";
  return (
    <section className="bg-[#E5F5ED] flex flex-col items-center gap-16 md:py-[100px] py-12  w-full mt-8 md:mt-0 md:mb-8 border-b[#E2E8F0]">
        <div className="w-full flex justify-center items-center ">
          <p className="text-[#009A49] text-center md:text-[32px] text-base leading-[24px] font-[500]  bg-[#009A49]/10 md:py-6 py-3 px-6 md:px-[70px] rounded-[64px] md:w-[590px]">
             Start Managing Your Inventory
          </p>
        </div>
        <div className={`${sharedClass} gap-2.5 md:w-[500px] w-[338px]`}>
          <form
            action=""
            className="w-full  flex flex-col items-center gap-6  "
          >
            <input
              type="email"
              id="email"
              placeholder="Full Name"
              className="w-full  h-[62px] p-4 border-[1px] bg-white border-[#dedede] rounded-[9px] placeholder:text-[#b8b8b8] placeholder:text-[20px] placeholder:leading-[30px] placeholder:font-[450] font-[450] text-[20px] text-leading-[30px]"
            />
            <input
              type="email"
              id="email"
              placeholder="Email address"
              className="w-full  h-[62px] p-4 border-[1px] bg-white border-[#dedede] rounded-[9px] placeholder:text-[#b8b8b8] placeholder:text-[20px] placeholder:leading-[30px] placeholder:font-[450] font-[450] text-[20px] text-leading-[30px]"
            />
            <input
              type="email"
              id="email"
              placeholder="Business Type"
              className="w-full  h-[62px] p-4 border-[1px] bg-white border-[#dedede] rounded-[9px] placeholder:text-[#b8b8b8] placeholder:text-[20px] placeholder:leading-[30px] placeholder:font-[450] font-[450] text-[20px] text-leading-[30px]"
            />
            <input
              type="email"
              id="email"
              placeholder="Business Name (Optional)"
              className="w-full  h-[62px] p-4 border-[1px] bg-white border-[#dedede] rounded-[9px] placeholder:text-[#b8b8b8] placeholder:text-[20px] placeholder:leading-[30px] placeholder:font-[450] font-[450] text-[20px] text-leading-[30px]"
            />
            <div className="rounded-[9px] bg-[#1b1b1b] py-[12px] px-6 text-white text-[16px] leading-[24px] font-[500] h-[60px] w-full  flex items-center justify-center gap-[6px] cursor-pointer">
              <button className="">Sign up</button>
              <ArrowRight />
            </div>
          </form>
          <p className="text-[#A0A0A0] text-[14px] leading-[100%] text-center font-[500] hidden">
            We respect your privacy. No spam.
          </p>
        </div>
      </section>
  )
}
