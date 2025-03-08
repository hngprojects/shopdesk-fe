import Image from "next/image";

type TestimonialProps = {
  name: string;
  company: string;
  image: string;
  text: string;
  isFirst: boolean; // Determines if it's the first card in a slide
};

const TestimonialCard: React.FC<TestimonialProps> = ({ name, company, image, text, isFirst }) => {
  return (
    <div className={`w-[380px] ${isFirst ? "h-[332px]" : "h-[306px]"} bg-[#FFFFFF] p-[32px] flex flex-col gap-[24px] rounded-[16px]`}>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-row gap-[20px]">
          <Image src={image} alt={name} className="w-[48px] h-[48px] rounded-full" />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[16px]">{name}</h1>
            <p className="text-[14px] font-extralight text-[#42526B]">{company}</p>
          </div>
        </div>
        <h1 className="text-[16px] font-light text-[#061C3D] leading-[24px]">
          {text}
        </h1>
      </div>
      {/* Star Ratings */}
      <div className="flex flex-row gap-[4px]">
        {Array(5).fill(0).map((_, i) => (
          <Image key={i} src={"/star-icon.svg"} alt="Star" className="w-[20.82px] h-[19.04px]" />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
