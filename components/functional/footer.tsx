"use client";
import Link from "next/link";
import Image from "next/image";
import appStore from "../../public/icons/App Store.png";
import playStore from "../../public/icons/Play Store.png";
import twitter from "../../public/icons/twitter.svg";
import facebook from "../../public/icons/facebook.svg";
import instagram from "../../public/icons/instagram.svg";
import github from "../../public/icons/github.svg";
import Logo from "./logo";
import { link } from "fs";

const Footer = () => {
  const footer = [
    {
      title: "Product",
      links: [
        {
          name: "Overview",
          route: "/overview",
        },

        {
          name: "Features",
          route: "/features",
        },
        {
          name: "Pricing",
          route: "/pricing",
        },
        {
          name: "Tutorials",
          route: "/tutorials",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          name: "About us",
          route: "/about-us",
        },

        {
          name: "Careers",
          route: "/careers",
        },
        {
          name: "Blog",
          route: "/blog",
        },
        {
          name: "Contact",
          route: "/contact",
        },
        {
          name: "Newsletter",
          route: "/newsletter",
        },
      ],
    },
    {
      title: "Help",
      links: [
        {
          name: "Customer Support",
          route: "/customer-support",
        },

        {
          name: "FAQ",
          route: "/faq",
        },
        {
          name: "Help Center",
          route: "/help-center",
        },
        {
          name: "Youtube Playist",
          route: "/youtube-playist",
        },
      ],
    },
  ];
  const links = [
    {
      name: twitter,
      link: "https://x.com/shopdeskhng",
    },
    {
      name: facebook,
      link: "https://www.facebook.com/share/18weYAqtPe/",
    },
    {
      name: instagram,
      link: "https://www.instagram.com/shopdesk_?igsh=MXIybG5sNXhvazI5dg==",
    },
    {
      name: github,
      link: "https://github.com/hngprojects/shopdesk-fe",
    },
  ];
  return (
    <footer className="px-[clamp(16px,_4vw,_120px)]">
      {/* Newsletter Section */}
      <div className="w-full bg-[#E5F5ED] rounded-2xl flex flex-col items-center justify-center p-[clamp(16px,_4vw,_48px)] text-center">
        <p className="text-[clamp(30px,_5vw,_48px)] font-circular-bold">
          Still thinking about it?
        </p>
        <p className="mt-2 text-[#717171] max-w-[400px]">
          Sign up to our newsletter and get regular updates to our product
        </p>

        <div className="w-full max-w-[800px]">
          <div className="flex gap-5 mt-[clamp(16px,_5vw,_48px)] w-full justify-center items-center max-[650px]:flex-col max-[650px]:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 max-w-[431px] p-4 text-[20px] border border-[#A0A0A0] bg-white rounded-md placeholder:text-[#D0D0D0] max-[650px]:w-full"
            />
            <button className="btn-primary min-[650px]:self-stretch max-[650px]:w-full max-[650px]:py-4">
              Subscribe Now
            </button>
          </div>

          <div className="flex justify-center gap-1 text-[14px] mt-4 text-[#717171]">
            <p>We protect your data in our</p>
            <Link
              href="/privacy"
              className="italic underline underline-offset-4"
            >
              privacy policy
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 max-[950px]:grid-cols-2 max-[650px]:grid-cols-1 max-[650px]:text-center max-[650px]:items-center">
          {/* Company Info */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-base text-[#414141]">
              The simplest way to manage your shop!
            </p>
            <p className="text-base text-[#414141] underline underline-offset-4 mt-2">
              No. 2 Laula Ibrahim Street, Akoka, Lagos.
            </p>

            {/* Social Icons - Desktop */}
            <div className="flex gap-4 mt-8 hidden md:flex">
              {links.map((icon, index) => (
                <Link
                  href={icon.link}
                  key={index}
                  className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full"
                >
                  <Image
                    width={10}
                    height={10}
                    src={icon.name}
                    alt={icon.name.toString()}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links Sections */}
          {footer.map((section, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:items-start"
            >
              <p className="uppercase text-[14px] font-circular-bold text-[#19A45B]">
                {section.title}
              </p>
              <ul className="text-[14px] text-[#52525B] flex flex-col gap-4 mt-4">
                {section.links.map((l, linkIndex) => (
                  <Link key={linkIndex} href={l?.route}>
                    {l.name}
                  </Link>
                ))}
              </ul>
            </div>
          ))}

          {/* App Downloads */}
          <div className="md:col-span-2 lg:col-span-1 flex flex-col items-center md:items-start">
            <p className="uppercase text-[14px] font-circular-bold text-[#19A45B] mb-4">
              Get the app
            </p>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <Link href="#">
                <Image
                  src={appStore}
                  alt="app store"
                  className="w-full max-w-[160px]"
                />
              </Link>
              <Link href="#">
                <Image
                  src={playStore}
                  alt="play store"
                  className="w-full max-w-[160px]"
                />
              </Link>
            </div>
          </div>
        </div>

        <hr className="border border-[#E2E8F0] my-8 md:my-12" />

        {/* Social Icons - Mobile */}
        <div className="flex justify-center gap-4 mb-8 md:hidden">
          {links.map((icon, index) => (
            <Link
              href={icon.link}
              key={index}
              className="size-7 cursor-pointer flex items-center justify-center border border-[#D4D4D8] rounded-full"
            >
              <Image
                src={icon.name}
                width={10}
                height={10}
                alt={icon.name.toString()}
              />
            </Link>
          ))}
        </div>

        {/* Copyright and Legal Links */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-[14px] text-[#71717A] mb-8 text-center md:text-left">
          <p>© Copyright 2024, Powered by Timbu Business</p>

          <ul className="flex flex-wrap justify-center gap-4">
            {[
              "Cookies",
              "Terms of service",
              "Privacy Policy",
              "Manage Policy",
            ].map((item, index) => (
              <li key={index}>
                <Link href={`/${item.toLowerCase().replace(" ", "-")}`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
