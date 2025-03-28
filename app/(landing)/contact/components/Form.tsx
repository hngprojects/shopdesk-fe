"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { getCountryCallingCode } from 'libphonenumber-js';
import flags from 'react-phone-number-input/flags';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [phoneValue, setPhoneValue] = useState("");

  const formMethods = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: ""
    },
    mode: "onChange"
  });

  const onSubmit = async (values: ContactFormValues) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={formMethods.control}
            name="firstName"
            render={({ field }) => (
              <FormItem data-aos="fade-up" data-aos-delay="250">
                <FormLabel className="text-gray-600 font-medium">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    className="h-14 md:h-18 bg-gray-100 border-gray-200 text-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formMethods.control}
            name="lastName"
            render={({ field }) => (
              <FormItem data-aos="fade-up" data-aos-delay="300">
                <FormLabel className="text-gray-600 font-medium">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    className="h-14 md:h-18 bg-gray-100 border-gray-200 text-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={formMethods.control}
          name="email"
          render={({ field }) => (
            <FormItem data-aos="fade-up" data-aos-delay="350">
              <FormLabel className="text-gray-600 font-medium">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  className="h-14 md:h-18 bg-gray-100 border-gray-200 text-gray-700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number with Country Selector */}
        <FormField
          control={formMethods.control}
          name="phone"
          render={({ field }) => (
            <FormItem data-aos="fade-up" data-aos-delay="400">
              <FormLabel className="text-gray-600 font-medium">
                Phone Number
              </FormLabel>
              <FormControl>
                <div className="relative w-full bg-gray-100 border-gray-200 rounded-lg p-2 focus:outline-none">
                  
                  <PhoneInput
                    international
                    defaultCountry="NG"
                    value={phoneValue}
                    onChange={(value) => {
                      setPhoneValue(value || "");
                      field.onChange(value);
                    }}
                    flags={flags}
                    className="[&>div]:flex [&>div]:items-center [&>div]:h-14 [&>div]:rounded-lg w-full focus:outline-none focus:border-none"
                    inputClassName="w-full pl-4 focus:outline-none focus:ring-0 focus:border-none"
                    countrySelectProps={{
                      style: {
                        paddingRight: '8px'
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={formMethods.control}
          name="message"
          render={({ field }) => (
            <FormItem data-aos="fade-up" data-aos-delay="450">
              <FormLabel className="text-gray-600 font-medium">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type in message..."
                  {...field}
                  className="min-h-32 bg-gray-100 border-gray-200 text-gray-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          variant="default"
          type="submit"
          className="w-full h-14 md:h-18 hover:bg-green-800 text-white font-medium rounded-xl text-base md:text-xl"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;