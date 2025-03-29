"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface ContactInfoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkText: string;
  href: string;
  delay: number;
}

export const ContactInfoCard = ({
  title,
  description,
  icon,
  linkText,
  href,
  delay,
}: ContactInfoCardProps) => (
  <div
    className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <h3 className="text-lg sm:text-2xl font-bold">{title}</h3>
    <div className="flex flex-col gap-1">
      <p className="text-[#717171] text-base md:text-lg">{description}</p>
      <Link href={href} className="flex items-center gap-2 mt-1">
        {icon}
        <span className="underline text-base md:text-lg">{linkText}</span>
      </Link>
    </div>
  </div>
);

export const BillingSupportCard = ({ delay }: { delay: number }) => (
  <div
    className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <h3 className="text-lg sm:text-2xl font-bold">For billing support</h3>
    <div className="flex flex-col gap-1">
      <p className="text-[#717171] text-base md:text-lg">
        You can visit our{" "}
        <Link
          href="/faq"
          className="underline hover:text-black transition duration-200"
        >
          Help Centre
        </Link>
      </p>
    </div>
  </div>
);
