import React from 'react'

export const Footer = () => {
  return (
    <div className="h-[61px] w-full flex flex-col md:flex-row md:justify-between md:items-end">
          <p className="text-[#71717a] text-[14px] leading-[22px] font-[400] text-center">
            © Copyright 2024, Powered by Timbu Business
          </p>
          <div className="md:flex gap-[10px] flex-col md:flex-row md:gap-[54px] items-center *:text-[#71717a] *:text-[14px] *:leading-[22px] *:font-[400] *:text-center pl-3 hidden ">
            <p>Cookies</p>
            <p>Terms of Sevice</p>
            <p>Privacy Policy</p>
            <p>Manage privacy</p>
          </div>
        </div>
  )
}
