"use client";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { FiPhoneCall } from "react-icons/fi";
import { BillingSupportCard, ContactInfoCard } from "./ContactInfoCard";

export const ContactInfoSection = () => (
  <div className="flex flex-col gap-6 sm:gap-8 text-[#2A2A2A] text-base sm:text-lg">
    <ContactInfoCard
      title="Chat with us"
      description="Speak with us via live chat"
      icon={
        <Image
          src="/icons/chat-circles.svg"
          alt="chat"
          width={24}
          height={24}
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      }
      linkText="start a live chat"
      href=""
      delay={350}
    />

    <ContactInfoCard
      title="Call us"
      description="Call our team on Mondays-Fridays from 8am to 5pm"
      icon={<FiPhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />}
      linkText="+234 700 880 8800"
      href="tel:+234 000 000 0000"
      delay={400}
    />

    <ContactInfoCard
      title="Visit us"
      description="You can visit us at Shopdesk HQ"
      icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6" />}
      linkText="No. 2 Laula Ibrahim Street, Akoka, Lagos."
      href="https://maps.app.goo.gl/xEJbSAbiqEGhBu539"
      delay={450}
    />

    <BillingSupportCard delay={500} />
  </div>
);
