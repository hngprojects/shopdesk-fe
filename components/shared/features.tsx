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
      title: "Track Stock Effortlessly",
      text: "Add, edit, and search items by name. View real-time stock levels and low-stock alerts.",
      bgColor: "rgba(151,71,255,0.1)",
    },
    {
      imageSource: "/pricing/cash.svg",
      title: "Smart Sales Insights",
      text: "Record sales transactions instantly. Toggle between “show sales” and “show profits” views.",
      bgColor: "rgba(251,156,42,0.1)",
    },
    {
      imageSource: "/pricing/_ui-sale-04.svg",
      title: "Work Anywhere, Anytime",
      text: "Add stock and record sales without internet.Data syncs automatically when reconnected.",
      bgColor: "rgba(169,3,219,0.1)",
    },
    {
      imageSource: "/pricing/_ui-trend-up-01.svg",
      title: "Data-Driven Decisions",
      text: "Generate daily/weekly sales and profit reports. Export to CSV/PDF with one click",
      bgColor: "rgba(132,188,46,0.1)",
    },
    {
      imageSource: "/pricing/_ui-users-01.svg",
      title: "Collaborate Securely",
      text: "Full access to settings, reports, and tax configurations between Admin and Users",
      bgColor: "rgba(205,33,64,0.1)",
    },
    {
      imageSource: "/pricing/_ui-bell-ringing-02.svg",
      title: " Low Stock Alerts",
      text: "Get instant notifications when inventory levels drop below a set threshold, ensuring you restock on time",
      bgColor: "rgba(204,235,219,1)",
    },
  ];

  return (
    <section className="bg-[#fafafb] lg:bg-white py-[64px] flex flex-col gap-[48px] mb-[40px]">
      <div className="flex flex-col gap-[20px] px-[32px] items-center">
        <p className="py-2 px-4 rounded-[24px] md:bg-[rgba(0,154,73,0.05)] text-[#009A49] font-[500] text-[16px] leading-[24px]">
          {text}
        </p>
        <h3 className="font-[500] text-[36px] leading-[44px] text-[#2a2a2a] tracking-[-0.02em] text-center">
          Unlock Effortless Shop Management
        </h3>
        <p className="text-[#717171] text-[20px] leading-[30px] font-[450] text-center max-w-prose">
          Track inventory in real-time, monitor multi-currency sales, and
          generate actionable reports—all while working offline. ShopDesk
          simplifies your retail operations, so you can focus on growing your
          business
        </p>
      </div>
      <div className="px-4 gap-[40px] flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 md:gap-x-[32px] md:gap-y-[64px] md:px-[32px]">
        {featuresSectionContent.map(
          (content: FeaturesSectionOptions, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-[20px]"
              >
                <div
                  className="flex items-center justify-center h-[48px] w-[48px] rounded-[8px]"
                  style={{ backgroundColor: content.bgColor }}
                >
                  <img
                    src={content.imageSource}
                    alt="icon"
                    className="h-[24px] w-[24px]"
                  />
                </div>

                <p className="text-[#2a2a2a] text-[20px] leading-[30px] font-[500] text-center">
                  {content.title}
                </p>

                <p className="text-[#717171] text-[16px] leading-[24px] font-[450] text-center max-w-[40ch]">
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
