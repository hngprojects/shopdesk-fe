"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Illustration from "@/public/auth/illustration.svg";
import Cube from "@/public/auth/cube.svg";
import Logo from "@/components/functional/logo";
import { useStore } from "@/store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phoneNumber: false,
  });
  const { setOrganizationId, setOrganizationName } = useStore();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log(formData);

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      phoneNumber: true,
    });

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "phoneNumber",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData].trim()
    );

    if (emptyFields.length > 0) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Replace with actual signup API call

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Set organization data here...
      setOrganizationId("new-org-id");
      setOrganizationName("New Organization");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, delay: 0.2 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, delay: 0.3 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-white md:bg-[url(/auth/bg-pattern.svg)] bg-contain bg-no-repeat bg-right px-8 md:px-16">
      <motion.div
        className="border-b border-[#F2F4F7] flex lg:hidden justify-center h-20"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Logo />
      </motion.div>

      <main className="size-full flex justify-center lg:justify-between items-center">
        {/* left */}
        <motion.div
          className="hidden lg:flex flex-col gap-8 justify-center items-center max-w-[278px]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-2">
              <motion.div variants={logoVariants} whileHover={{ rotate: 10 }}>
                <Image src={Cube} alt="cube" width={56} height={56} />
              </motion.div>
              <motion.h1
                className="md:text-4xl lg:text-5xl font-bold"
                variants={itemVariants}
              >
                ShopDesk
              </motion.h1>
            </div>

            <motion.p
              className="text-[#1B1B1B] mt-2 text-2xl font-bold"
              variants={itemVariants}
            >
              Run your Business with{" "}
              <motion.span
                className="text-[#009A49] font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ease
              </motion.span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Image
              src={Illustration}
              alt="Illustration"
              width={278}
              height={321}
              quality={90}
              priority
            />
          </motion.div>
        </motion.div>

        {/* right */}
        <motion.div
          className="max-w-[588px] w-full"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <motion.div
            className="w-full max-h-[600px] bg-gradient-to-r from-[#FFFFFF66] to-[#FFFFFF00] p-6 rounded-[24px] shadow-sm backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
            }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-semibold text-center mb-4"
              variants={itemVariants}
            >
              Sign Up
            </motion.h2>

            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              variants={containerVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name Field */}
                <motion.div
                  className="flex flex-col gap-1"
                  variants={itemVariants}
                >
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    First Name <span className="text-[#FF1925]">*</span>
                  </label>
                  <motion.input
                    type="text"
                    id="firstName"
                    className={`w-full p-2.5 border rounded-lg outline-none text-[#2A2A2A] text-sm
                      ${
                        touched.firstName && !formData.firstName
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      ${
                        formData.firstName
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={() => handleBlur("firstName")}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  {touched.firstName && !formData.firstName && (
                    <motion.p
                      className="text-red-500 text-xs"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      First name is required.
                    </motion.p>
                  )}
                </motion.div>

                {/* Last Name Field */}
                <motion.div
                  className="flex flex-col gap-1"
                  variants={itemVariants}
                >
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium"
                  >
                    Last Name <span className="text-[#FF1925]">*</span>
                  </label>
                  <motion.input
                    type="text"
                    id="lastName"
                    className={`w-full p-2.5 border rounded-lg outline-none text-[#2A2A2A] text-sm
                      ${
                        touched.lastName && !formData.lastName
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      ${
                        formData.lastName
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={() => handleBlur("lastName")}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  {touched.lastName && !formData.lastName && (
                    <motion.p
                      className="text-red-500 text-xs"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Last name is required.
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Email Field */}
              <motion.div
                className="flex flex-col gap-1"
                variants={itemVariants}
              >
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address <span className="text-[#FF1925]">*</span>
                </label>
                <motion.input
                  type="email"
                  id="email"
                  className={`w-full p-2.5 border rounded-lg outline-none text-[#2A2A2A] text-sm
                    ${
                      touched.email && !formData.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }
                    ${
                      formData.email
                        ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                        : ""
                    }`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                {touched.email && !formData.email && (
                  <motion.p
                    className="text-red-500 text-xs"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Email is required.
                  </motion.p>
                )}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password Field */}
                <motion.div
                  className="flex flex-col gap-1"
                  variants={itemVariants}
                >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password <span className="text-[#FF1925]">*</span>
                  </label>
                  <motion.input
                    type="password"
                    id="password"
                    className={`w-full p-2.5 border rounded-lg outline-none text-[#2A2A2A] text-sm
                      ${
                        touched.password && !formData.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      ${
                        formData.password
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                    placeholder="*************"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  {touched.password && !formData.password && (
                    <motion.p
                      className="text-red-500 text-xs"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Password is required.
                    </motion.p>
                  )}
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  className="flex flex-col gap-1"
                  variants={itemVariants}
                >
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium"
                  >
                    Confirm Password <span className="text-[#FF1925]">*</span>
                  </label>
                  <motion.input
                    type="password"
                    id="confirmPassword"
                    className={`w-full p-2.5 border rounded-lg outline-none text-[#2A2A2A] text-sm
                      ${
                        touched.confirmPassword && !formData.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      ${
                        formData.confirmPassword
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                    placeholder="*************"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  {touched.confirmPassword && !formData.confirmPassword && (
                    <motion.p
                      className="text-red-500 text-xs"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Confirming password is required.
                    </motion.p>
                  )}
                  {touched.confirmPassword &&
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <motion.p
                        className="text-red-500 text-xs"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Passwords don't match.
                      </motion.p>
                    )}
                </motion.div>
              </div>

              {/* Phone Number field*/}
              <motion.div
                className="flex flex-col gap-1"
                variants={itemVariants}
              >
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium"
                >
                  Phone Number <span className="text-[#FF1925]">*</span>
                </label>
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  {/* Country code dropdown */}
                  <div className="flex items-center px-3 py-2 bg-white border-r border-gray-300">
                    {/* Nigeria flag */}
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-4 bg-white flex items-center justify-center">
                        <div className="w-5 h-3 bg-white flex items-center relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                          <img src="/modal-images/nigeria-flag.svg" alt="Nigeria" className="h-6 w-6" />
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-700 text-sm">+234</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-4 w-4 text-gray-500">
                        
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {/* Add your dropdown items here */}
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                              <img
                                src="/modal-images/egypt-flag.svg"
                                alt="Egypt"
                                className="h-4 w-6"
                              />
                              <span>+20 </span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                              <img
                                src="/modal-images/ethiopia-flag.svg"
                                alt="Ethiopia"
                                className="h-4 w-6"
                              />
                              <span>+251 </span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                              <img
                                src="/modal-images/ghana-flag.svg"
                                alt="Ghana"
                                className="h-4 w-6"
                              />
                              <span>+233 </span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                              <img
                                src="/modal-images/india-flag.svg"
                                alt="India"
                                className="h-4 w-6"
                              />
                              <span>+91</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                              <img
                                src="/modal-images/kenya-flag.svg"
                                alt="Kenya"
                                className="h-4 w-6"
                              />
                              <span>+254</span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {/* Phone input */}
                  <motion.input
                    type="tel"
                    id="phoneNumber"
                    className="w-full p-2.5 outline-none text-[#2A2A2A] text-sm border-0"
                    placeholder="8131234567"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phoneNumber")}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                </div>
                {touched.phoneNumber && !formData.phoneNumber && (
                  <motion.p
                    className="text-red-500 text-xs"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Phone number is required.
                  </motion.p>
                )}
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.p
                  className="text-red-600 text-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}

              {/* Sign Up Button*/}
              <motion.button
                type="submit"
                className="w-1/2 mx-auto bg-[#2A2A2A] hover:bg-[#B8B8B8] active:bg-[#B8B8B8] text-white p-2.5 rounded-lg font-medium transition duration-200 flex justify-center items-center gap-2 text-sm cursor-pointer"
                disabled={loading}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {loading ? (
                  <motion.span
                    className="size-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  ></motion.span>
                ) : (
                  "Sign up"
                )}
              </motion.button>

              <motion.p
                className="text-center text-xs text-gray-600"
                variants={itemVariants}
              >
                Already have an account?{" "}
                <a href="/sign-in" className="text-[#009A49] hover:underline">
                  Sign in
                </a>
              </motion.p>
            </motion.form>
          </motion.div>
        </motion.div>
      </main>

      <motion.div
        className="py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="text-center text-xs text-gray-500">
          © Copyright 2025, Powered by Timbu Business
        </p>
      </motion.div>
    </div>
  );
}