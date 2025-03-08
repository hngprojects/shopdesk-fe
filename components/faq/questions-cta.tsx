"use client";

import Image from "next/image";

import ctamember from "@/public/icons/cta-avatar.png";

function QuestionsCTA() {
  

  return (
    <div className="flex flex-col items-center text-center max-w-7xl w-full p-8 bg-[#F9FAFB] rounded-2xl gap-8">
      <Image src={ctamember} alt="CTA Avatar" />
      <h2 className="text-xl font-medium text-[#101828]">Still have questions?</h2>
      <p className="text-[#667085] text-lg">
        Can't find the answer you're looking for? Please chat with our friendly team.
      </p>
      
     

      <button className="bg-[#009A49] h-[60px] w-[124px] font-medium text-[#FFFFFF] rounded-[9px] py-3 px-6 cursor-pointer">
        Start Chat
      </button>
     
    </div>
  );
}

export default QuestionsCTA;
