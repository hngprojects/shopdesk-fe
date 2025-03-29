"use client";
import { submitContactForm } from "@/actions/contactUs";
import CountryPhoneInput from "@/components/functional/country-phone-input";
import { Icons } from "@/components/ui/icons";
import { useActionState, useRef, useState } from "react";
import { toast } from "sonner";

export const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  if (state?.success) {
    toast.success(state.success);
    formRef.current?.reset();
    setPhoneNumber("");
  }

  if (state?.error) {
    toast.error(state.error);
  }

  return (
    <form
      className="flex flex-col  gap-y-4 sm:gap-y-6 text-base md:text-lg relative"
      action={formAction}
      ref={formRef}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormInput
          name="firstName"
          label="First Name"
          placeholder="John"
          type="text"
          delay={350}
        />
        <FormInput
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          type="text"
          delay={450}
        />
      </div>

      <FormInput
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        type="email"
        delay={500}
      />

      <div
        className="flex flex-col gap-1 relative z-50"
        data-aos="fade-up"
        data-aos-delay="550"
      >
        <label htmlFor="phone" className="text-sm text-[#717171] font-medium">
          Phone Number
        </label>
        <CountryPhoneInput
          type="tel"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          placeholder="000 000 0000"
          className="bg-[#F6F8FA] duration-150"
        />
      </div>

      <FormTextarea
        name="message"
        label="Message"
        placeholder="Type in message..."
        delay={600}
      />

      <SubmitButton delay={700} isPending={isPending} />
    </form>
  );
};

const FormInput = ({
  name,
  label,
  placeholder,
  type,
  delay,
}: {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  delay: number;
}) => (
  <div
    className="flex flex-col gap-1"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <label htmlFor={name} className="text-sm text-[#717171] font-medium">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      required
      className="w-full p-3 sm:p-4 border border-[#DEDEDE] rounded-[9px] bg-[#F6F8FA] outline-none focus:border-green-500 focus:bg-white transition-colors duration-150"
    />
  </div>
);

const FormTextarea = ({
  name,
  label,
  placeholder,
  delay,
}: {
  name: string;
  label: string;
  placeholder: string;
  delay: number;
}) => (
  <div
    className="flex flex-col gap-1"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <label htmlFor={name} className="text-sm text-[#717171] font-medium">
      {label}
    </label>
    <textarea
      name={name}
      placeholder={placeholder}
      required
      className="w-full p-3 sm:p-4 border border-[#DEDEDE] rounded-[9px] bg-[#F6F8FA] outline-none focus:border-green-500 focus:bg-white transition-colors duration-150 min-h-[120px] sm:min-h-[150px] resize-none"
    ></textarea>
  </div>
);

const SubmitButton = ({
  delay,
  isPending,
}: {
  delay: number;
  isPending: boolean;
}) => (
  <div
    className="flex justify-center mt-4 sm:mt-6"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <button
      type="submit"
      className="w-full bg-black text-white flex gap-2 justify-center items-center py-4 md:py-6 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
      disabled={isPending}
    >
      {isPending && <Icons.LoadingIcon />}
      <span>{isPending ? "Submitting..." : "Submit"}</span>
    </button>
  </div>
);
