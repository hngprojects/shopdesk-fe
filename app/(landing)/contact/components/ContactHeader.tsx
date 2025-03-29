"use client";

interface ContactHeaderProps {
  title: any;
  subtitle: string;
}

export const ContactHeader = ({ title, subtitle }: ContactHeaderProps) => (
  <div className="text-center" data-aos="fade-up">
    <h1 className="text-3xl md:text-6xl font-bold">
      {title}
    </h1>
    <p 
      className="text-gray-400 text-lg md:text-2xl font-light py-6 sm:py-8 md:py-10 max-w-2xl mx-auto"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {subtitle}
    </p>
  </div>
);