import React from "react";
import Image from "next/image";

const Page = () => {
  const reasons = [
    {
      icon: "/icons/activity-heart.svg",
      title: "Health Insurance",
      text: "We offer one of the best HMO that covers 60% of you medicals.",
    },
    {
      icon: "/icons/hardware.svg",
      title: "Hardware",
      text: "We will equp you with a M1 mac  and anything else you needs.",
    },
    {
      icon: "/icons/ui-face-sad.svg",
      title: "Sick Leave",
      text: "Take the time you need to recharge and get better.",
    },
    {
      icon: "/icons/bus.svg",
      title: "Flexible PTO",
      text: "We offer a -20 days off vacation per year.",
    },
  ];

  return (
    <div className="pt-14 pb-44 px-[clamp(16px,_4vw,_120px)] space-y-8 w-full">
      <div className="w-full space-y-6">
        <h1 className="text-[#19A45B] text-4xl text-center font-medium">
          Careers
        </h1>
        <div className="space-y-6 w-full">
          <h2 className="text-black text-lg font-semibold">Join Our Team</h2>
          <small className="text-[#717171]">
            At ShopDesk, we foster a culture of innovation, collaboration, and
            excellence. We believe in empowering our employees, embracing
            diversity, and maintaining a customer-first mindset. Our core values
            are integrity, teamwork, continuous learning, and adaptability drive
            everything we do. We strive to create a supportive, inclusive
            workplace where creativity thrives, and every team member
            contributes to our success.
          </small>
        </div>
        <Image
          src="/careers-images/careers-image.png"
          alt=""
          className="hidden lg:block w-auto"
          width={1280}
          height={400}
        />
        <Image
          src="/careers-images/careers-image-web.png"
          alt=""
          className="lg:hidden w-auto"
          width={342}
          height={400}
        />
        <div className="space-y-4 w-full">
          <h2 className="text-lg text-black font-semibold">Why Work with us</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 w-full">
            {reasons.map((reasons, i) => {
              const { icon, title, text } = reasons;
              return (
                <article
                  key={i}
                  className="bg-[#E5F5ED] rounded-lg p-4 space-y-2"
                >
                  <Image
                    src={icon}
                    alt=""
                    className="w-8 h-8"
                    width={32}
                    height={32}
                  />
                  <h3 className="text-lg text-black font-semibold">{title}</h3>
                  <small className="text-[#717171]">{text}</small>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button className="btn-primary w-56 hover:cursor-pointer">
          See all Openings
        </button>
      </div>
    </div>
  );
};

export default Page;
