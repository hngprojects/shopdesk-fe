import Link from "next/link";
import Image from "next/image";
import appStore from "../../public/icons/App Store.png";
import playStore from "../../public/icons/Play Store.png";
import twitter from "../../public/icons/twitter.svg";
import facebook from "../../public/icons/facebook.svg";
import instagram from "../../public/icons/instagram.svg";
import github from "../../public/icons/github.svg";
import { FaTiktok } from "react-icons/fa6";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="px-[clamp(16px,_4vw,_120px)]">
      <div className="w-full bg-[#E5F5ED] rounded-2xl flex flex-col items-center justify-center p-[clamp(16px,_4vw,_48px)]" hidden>
        <p className="text-center text-[clamp(30px,_5vw,_48px)] font-circular-bold">
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

            <div className="flex gap-0.5 text-[14px] mt-1 min-[650px]:hidden">
              <p className="max-[650px]:text-[#717171]">
                We protect your data in our
              </p>
              <Link
                href="/privacy"
                className="italic underline underline-offset-4 max-[650px]:text-[#717171]"
              >
                privacy policy
              </Link>
            </div>

            <button className="btn-primary min-[650px]:self-stretch max-[650px]:h-15 max-[650px]:my-3">
              Subscribe Now
            </button>
          </div>

          <div className="flex justify-center gap-1 text-[14px] mt-4 text-[#717171]">
            <p>We protect your data in our</p>
            <Link
              href="/policy"
              className="italic underline underline-offset-4"
            >
              privacy policy
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mt-20">
        <div hidden className="add-this-back-flex hidden justify-between max-[950px]:grid max-[950px]:grid-cols-4 max-[650px]:grid-cols-3 max-[500px]:flex max-[500px]:flex-col max-[500px]:items-center max-[500px]:text-center max-[950px]:gap-y-12 gap-x-4">
          <div className="w-[248px] max-[950px]:col-span-2 ">
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-base text-[#414141]">
              The simplest way to manage your shop!
            </p>
            <p className="text-base text-[#414141] underline underline-offset-4 mt-2">
              No. 2 Laula Ibrahim Street, Akoka, Lagos.
            </p>

            <div className="flex gap-4 mt-[70px] max-[500px]:hidden">
              <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
                <Image src={twitter} alt="twitter" />
              </div>
              <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
                <Image src={facebook} alt="facebook" />
              </div>
              <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
                <Image src={instagram} alt="instagram" />
              </div>
              <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
                <Image src={github} alt="github" />
              </div>
            </div>
          </div>

          <div>
            <p className="uppercase text-[14px] font-circular-bold text-[#19A45B]">
              Product
            </p>

            <ul className="text-[14px] text-[#52525B] flex flex-col gap-6 mt-8">
              <li>Overview</li>
              <li>Fetaures</li>
              <li>Pricing</li>
              <li>Tutorials</li>
            </ul>
          </div>

          <div>
            <p className="uppercase text-[14px] font-circular-bold text-[#19A45B]">
              Company
            </p>

            <ul className="text-[14px] text-[#52525B] flex flex-col gap-6 mt-8">
              <li>About us</li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Newsletter</li>
            </ul>
          </div>

          <div>
            <p className="uppercase text-[14px] font-circular-bold text-[#19A45B]">
              Help
            </p>

            <ul className="text-[14px] text-[#52525B] flex flex-col gap-6 mt-8">
              <li>Customer Support</li>
              <li>FAQ</li>
              <li>Help center</li>
              <li>Youtube Playlist</li>
            </ul>
          </div>

          <div>
            <p className="uppercase text-[14px] font-circular-bold text-[#19A45B] mb-8">
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

        <hr className="border border-[#E2E8F0]  mb-6 md:my-12" />

        <div hidden className="w-full hidden mb-12 add-this-back-flex justify-center gap-4 mt-[70px] min-[500px]:hidden">
          <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
            <Image src={twitter} alt="twitter" />
          </div>
          <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
            <Image src={facebook} alt="facebook" />
          </div>
          <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
            <Image src={instagram} alt="instagram" />
          </div>
          <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
            <Image src={github} alt="github" />
          </div>
        </div>

        <div className="w-full flex items-center gap-4 text-[14px] text-[#71717A] mb-8 justify-center">
          <p>© Copyright 2024, Powered by Timbu Business</p>

          <ul className="add-this-back-flex gap-5 hidden max-[900px]:hidden">
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Terms of service</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/manage-policy">Manage Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
