"use client";

import { useState } from "react";
import CountryPhoneInput from "@/components/functional/country-phone-input";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FiPhoneCall } from "react-icons/fi";

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState("");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // Basic phone no. validation
    if (value.length < 10) {
      setErrors("Phone number must be at least 10 digits");
    } else {
      setErrors("");
    }
  };
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center">
        <h1 className="md:text-3xl text-4xl font-bold">
          Get in <span className="text-green-500">touch</span> with us today
        </h1>
        <p className="text-gray-600 py-[2.5rem] max-w-2xl  mx-auto">
          We’re here to help! Whether you have a question, need assistance, or
          want to provide feedback, we’d love to hear from you. Reach out to us
          by filling the form below.
        </p>
      </div>

      <section className="grid lg:grid-cols-[5fr_3fr] xl:grid-cols-[7fr_3fr] gap-16 mt-8">
        <form className="flex flex-col gap-y-6 text-base md:text-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <span className="flex flex-col gap-1">
              <label
                htmlFor="firstName"
                className="text-sm text-[#717171] font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                required
                className="w-full p-4 border border-[#DEDEDE] rounded-[9px] bg-[#F6F8FA] outline-none focus:border-green-500 focus-within:bg-white transition-colors duration-150"
              />
            </span>
            <span className="flex flex-col gap-1">
              <label
                htmlFor="lastName"
                className="text-sm text-[#717171] font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                required
                className="w-full p-4 border border-[#DEDEDE] rounded-[9px] bg-[#F6F8FA] outline-none focus:border-green-500 focus-within:bg-white transition-colors duration-150"
              />
            </span>
          </div>

          <span className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm text-[#717171] font-medium"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              className="w-full p-4 border border-[#DEDEDE] rounded-[9px] bg-[#F6F8FA] outline-none focus:border-green-500 focus-within:bg-white transition-colors duration-150"
            />
          </span>

          <span className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-sm text-[#717171] font-medium"
            >
              Phone Number
            </label>
            <CountryPhoneInput
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="000 000 0000"
              className="bg-[#F6F8FA] duration-150"
              errors={errors}
            />
            {/* <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full p-4 border border-[#DEDEDE] rounded-[9px] bg-[#F6F8FA] outline-none focus:border-green-500 focus-within:bg-white transition-colors duration-150"
            /> */}
          </span>

          <span className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="text-sm text-[#717171] font-medium"
            >
              Message
            </label>
            <textarea
              name="message"
              placeholder="Type in message..."
              required
              className="w-full p-4 border border-[#DEDEDE] rounded-[9px] bg-[#F6F8FA] outline-none focus:border-green-500 focus-within:bg-white transition-colors duration-150 h-32 resize-none"
            ></textarea>
          </span>

          <div className="flex justify-center mt-3 lg:mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-6 rounded-xl font-medium btn-primary"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-6 text-[#2A2A2A] text-lg">
          {/* <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Chat with us</h3>
            <span className="flex flex-col gap-1">
              <p className="text-[#717171]">Speak with us via live chat</p>
              <Link href="" className="flex items-center gap-2">
                <Image
                  src="/icons/chat-circles.svg"
                  alt="chat"
                  className=""
                  width={24}
                  height={24}
                />
                <span className="underline">start a live chat</span>
              </Link>
            </span>
          </div> */}

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Call us</h3>
            <span className="flex flex-col gap-1">
              <p className="text-[#717171]">
                Call our team on Mondays-Fridays from 8am to 5pm
              </p>
              <Link
                href="tel:+234 000 000 0000"
                className="flex items-center gap-2"
              >
                <FiPhoneCall className="size-6" />
                <span className="underline">+234 700 880 8800</span>
              </Link>
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Visit us</h3>
            <span className="flex flex-col gap-1">
              <p className="text-[#717171]">You can visit us at Shopdesk HQ</p>
              <Link href="" className="flex items-center gap-2">
                <MapPin className="size-6" />
                <span className="underline">
                  No. 2 Laula Ibrahim Street, Akoka, Lagos.
                </span>
              </Link>
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">For billing support</h3>
            <span className="flex flex-col gap-1">
              <p className="text-[#717171]">
                You can visit our{" "}
                <Link
                  href=""
                  className="underline hover:text-black transition duration-200"
                >
                  Help Centre
                </Link>
              </p>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
