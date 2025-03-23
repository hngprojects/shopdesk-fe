import Link from "next/link";

interface FeaturesProps {
  text: string;
}

const Features = ({ text }: FeaturesProps) => {
  interface FeaturesSectionOptions {
    imageSource: string;
    title: string;
    text: string;
    bgColor: string;
  }

  const featuresSectionContent: FeaturesSectionOptions[] = [
    {
      imageSource: "/pricing/_ui-package.svg",
      title: "Real-time inventory tracking",
      text: "Monitor stock levels and avoid shortages.",
      bgColor: "rgba(151,71,255,0.1)",
    },
    {
      imageSource: "/pricing/_ui-speedometer-03.svg",
      title: "Fast and effortless sales recording",
      text: "Quickly log sales and keep accurate records.",
      bgColor: "rgba(251,156,42,0.1)",
    },
    {
      imageSource: "/pricing/_ui-receipt-check.svg",
      title: "Instant receipt generation",
      text: " Print, email, or send receipts via SMS.",
      bgColor: "rgba(169,3,219,0.1)",
    },
    {
      imageSource: "/pricing/_ui-trend-up-01.svg",
      title: "Detailed sales reports",
      text: "View daily, weekly, or monthly performance.",
      bgColor: "rgba(132,188,46,0.1)",
    },
    {
      imageSource: "/pricing/_ui-laptop-01.svg",
      title: "Multi-device access",
      text: "Manage your business from your phone, tablet, or desktop.",
      bgColor: "rgba(205,33,64,0.1)",
    },
    {
      imageSource: "/pricing/_ui-upload-cloud-01.svg",
      title: "Secure cloud storage",
      text: "Automatic backups keep your data safe.",
      bgColor: "rgba(204,235,219,1)",
    },
  ];

  return (
    <section className="bg-[#fafafb] lg:bg-white py-[64px] flex flex-col gap-[48px] mb-[40px]">
      <div className="flex flex-col gap-[1px] px-[32px] items-center">
        <p className="px-4 rounded-[24px] md:bg-[rgba(0,154,73,0.05)] text-[#009A49] font-[500] text-[16px] leading-[24px]">
          Get Early Access
        </p>
      </div>
      <div className="flex flex-col gap-[2px] px-[14rem] py-2 items-center">
        <h1 className="font-semibold text-[36px] leading-[44px] text-center px-[4rem]">
          Sign up now to secure your spot and get an exclusive discount when we
          launch.
        </h1>

        <Link
          href="/contact"
          className="mt-6 mb-4 bg-black text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-gray-900"
        >
          Join the WaitList Now
        </Link>
      </div>
      <div
        className="flex flex-col gap-[20px] px-[32px] items-center"
        data-aos="fade-up"
      >
        <p className="py-2 px-4 rounded-[24px] md:bg-[rgba(0,154,73,0.05)] text-[#009A49] font-[500] text-[16px] leading-[24px]">
          {text}
        </p>
      </div>
      <div className="px-4 gap-[40px] flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 md:gap-x-[32px] md:gap-y-[64px] md:px-[32px]">
        {featuresSectionContent.map(
          (content: FeaturesSectionOptions, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-[20px]"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
                data-aos-once="false"
              >
                <div
                  className="flex items-center justify-center h-[48px] w-[48px] rounded-[8px]"
                  style={{ backgroundColor: content.bgColor }}
                  data-aos="zoom-in"
                  data-aos-delay={`${index * 100 + 100}`}
                  data-aos-once="false"
                >
                  <img
                    src={content.imageSource}
                    alt="icon"
                    className="h-[24px] w-[24px]"
                  />
                </div>

                <p
                  className="text-[#2a2a2a] text-[20px] leading-[30px] font-[500] text-center"
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100 + 200}`}
                  data-aos-once="false"
                >
                  {content.title}
                </p>

                <p
                  className="text-[#717171] text-[16px] leading-[24px] font-[450] text-center max-w-[40ch]"
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100 + 300}`}
                  data-aos-once="false"
                >
                  {content.text}
                </p>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export { Features };
