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
      <div className="w-full bg-[#E5F5ED] rounded-2xl flex flex-col items-center justify-center p-[clamp(16px,_4vw,_48px)]">
        <p className="text-center text-[clamp(30px,_5vw,_48px)] font-circular-bold">
          Still thinking about it?
        </p>
        <p className="text-center mt-2 max-[650px]:max-w-[300px] max-[650px]:text-[#717171]">
          Sign up to our newsletter and get regular updates to our product
        </p>

        <div className="w-full">
          <div className="flex gap-5 mt-[clamp(16px,_5vw,_48px)] w-full justify-center items-center max-[650px]:flex-col max-[650px]:gap-2">
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
                href="/policy"
                className="italic underline underline-offset-4 max-[650px]:text-[#717171]"
              >
                privacy policy
              </Link>
            </div>

            <button className="btn-primary min-[650px]:self-stretch max-[650px]:h-15 max-[650px]:my-3">
              Subscribe Now
            </button>
          </div>

          <div className="flex gap-0.5 justify-self-center w-full max-w-[600px] text-[14px] mt-1 max-[650px]:hidden">
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

      <div className="mt-20">
        <div className="flex justify-between max-[950px]:grid max-[950px]:grid-cols-4 max-[650px]:grid-cols-3 max-[500px]:flex max-[500px]:flex-col max-[500px]:items-center max-[500px]:text-center max-[950px]:gap-y-12 gap-x-4">
          <div className="w-[248px] max-[950px]:col-span-2 ">
            <div className="mb-8 flex justify-center min-[500px]:justify-start">
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
                <Link
                  aria-label="Twitter"
                  href="https://x.com/shopdesk_?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={twitter} alt="twitter" />
                </Link>
              </div>
              <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
                <Link
                  aria-label="Facebook"
                  href="https://www.facebook.com/share/18weYAqtPe/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={facebook} alt="facebook" />
                </Link>
              </div>
              <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
                <Link
                  aria-label="Instagram"
                  href="https://www.instagram.com/shopdesk_?igsh=MXIybG5sNXhvazI5dg=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={instagram} alt="instagram" />
                </Link>
              </div>
              <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
                <Link
                  aria-label="Tiktok"
                  href="https://www.tiktok.com/@shopdesk_?_t=ZM-8urzNXSQ1PL&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <Image src={tiktok} alt="tiktok" /> */}
                  <FaTiktok />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <p className="uppercase text-[14px] font-circular-bold text-[#19A45B]">
              Product
            </p>

            <ul className="text-[14px] text-[#52525B] flex flex-col gap-6 mt-8">
              <li className="hover:text-black transition duration-200 cursor-pointer">
                {/* <Link
                  href="/overview"
                  className="hover:text-black transition duration-200"
                >
                </Link> */}
                Overview
              </li>
              <li>
                <Link
                  href="/#features"
                  className="hover:text-black transition duration-200"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-black transition duration-200"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  hidden
                  href="/tutorials"
                  className="hover:text-black transition duration-200"
                >
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="uppercase text-[14px] font-circular-bold text-[#19A45B]">
              Company
            </p>

            <ul className="text-[14px] text-[#52525B] flex flex-col gap-6 mt-8">
              <li hidden>
                <Link
                  href=""
                  className="hover:text-black transition duration-200"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-black transition duration-200"
                >
                  Careers
                </Link>
              </li>
              <li hidden>
                <Link
                  href="/blog"
                  className="hover:text-black transition duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-black transition duration-200"
                >
                  Contact
                </Link>
              </li>
              <li hidden>
                <Link
                  href="/newsletter"
                  className="hover:text-black transition duration-200"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="uppercase text-[14px] font-circular-bold text-[#19A45B]">
              Help
            </p>

            <ul className="text-[14px] text-[#52525B] flex flex-col gap-6 mt-8">
              <li className="hover:text-black transition duration-200 cursor-pointer">
                {/* <Link
                  href="/support"
                  className="hover:text-black transition duration-200"
                >
                </Link> */}
                Customer Support
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-black transition duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li className="hover:text-black transition duration-200 cursor-pointer">
                {/* <Link
                  href="/help"
                  className="hover:text-black transition duration-200"
                >
                </Link> */}
                Help center
              </li>
              <li hidden>
                <Link
                  href="/tutorials"
                  className="hover:text-black transition duration-200"
                >
                  Youtube Playlist
                </Link>
              </li>
            </ul>
          </div>

          <div hidden>
            <p className="uppercase text-[14px] font-circular-bold text-[#19A45B] mb-8">
              Get the app
            </p>

            <div className="flex min-[500px]:flex-col gap-4">
              <Image src={appStore} alt="app store" />
              <Image src={playStore} alt="play store" />
            </div>
          </div>
        </div>

        <hr className="border border-[#E2E8F0] my-6 md:my-12" />

        <div className="w-full mb-12 flex justify-center gap-4 min-[500px]:hidden">
          <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
            <Link
              href="https://x.com/shopdesk_?s=21"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={twitter} alt="twitter" />
            </Link>
          </div>
          <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
            <Link
              href="https://www.facebook.com/share/18weYAqtPe/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={facebook} alt="facebook" />
            </Link>
          </div>
          <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
            <Link
              href="https://www.instagram.com/shopdesk_?igsh=MXIybG5sNXhvazI5dg=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={instagram} alt="instagram" />
            </Link>
          </div>
          <div className="size-7 flex items-center justify-center border border-[#D4D4D8] rounded-full">
            <Link
              href="https://www.tiktok.com/@shopdesk_?_t=ZM-8urzNXSQ1PL&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <Image src={tiktok} alt="tiktok" /> */}
              <FaTiktok />
            </Link>
          </div>
        </div>

        <div className="w-full flex items-center gap-4 text-[14px] text-[#71717A] mb-8 justify-center lg:justify-between">
          <p>
            © Copyright {new Date().getFullYear()}, Powered by Timbu Business
          </p>

          <ul className="flex gap-5 max-[900px]:hidden">
            <li>
              <Link
                href="/cookies"
                className="hover:text-black transition duration-200"
              >
                Cookies
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="hover:text-black transition duration-200"
              >
                Terms of service
              </Link>
            </li>
            <li>
              <Link
                href="/policy"
                className="hover:text-black transition duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li hidden>
              <Link
                href=""
                className="hover:text-black transition duration-200"
              >
                Manage Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
