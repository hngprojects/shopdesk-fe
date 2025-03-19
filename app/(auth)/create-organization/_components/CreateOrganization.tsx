"use client";
import closeIcon from "@/public/icons/close.svg";
import logo from "@/public/shopdesk-logo.svg";
import { createOrg } from "@/services/auth";
import { getOrganization } from "@/services/getOrganization";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const currencies = [
  {
    name: "Nigerian Naira",
    code: "NGN",
    symbol: "₦",
    flag: "/modal-images/nigeria-flag.svg",
  },
  {
    name: "Egyptian Pound",
    code: "EGP",
    symbol: "ج.م",
    flag: "/modal-images/egypt-flag.svg",
  },
  {
    name: "Ethiopian Birr",
    code: "ETB",
    symbol: "Br",
    flag: "/modal-images/ethiopia-flag.svg",
  },
  {
    name: "Ghanaian Cedi",
    code: "GHS",
    symbol: "₵",
    flag: "/modal-images/ghana-flag.svg",
  },
  {
    name: "Indian Rupee",
    code: "INR",
    symbol: "₹",
    flag: "/modal-images/india-flag.svg",
  },
  {
    name: "Kenyan Shilling",
    code: "KES",
    symbol: "KSh",
    flag: "/modal-images/kenya-flag.svg",
  },
];
export const countries = [
  {
    id: 1,
    name: "Nigeria",
  },
  {
    id: 2,
    name: "Ghana",
  },
  {
    id: 3,
    name: "Canada",
  },
  {
    id: 4,
    name: "United Kingdom",
  },
  {
    id: 5,
    name: "China",
  },
  {
    id: 6,
    name: "Australia",
  },
];

export const states = [
  {
    id: 1,
    name: "Lagos",
  },
  {
    id: 2,
    name: "FCT",
  },
  {
    id: 3,
    name: "Rivers",
  },
  {
    id: 4,
    name: "Enugu",
  },
  {
    id: 5,
    name: "Kano",
  },
  {
    id: 6,
    name: "Benue",
  },
];

const CreateOrganization = () => {
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HTMLDivElement>(null);
  const toggleCurrencyModal = () => {
    setIsCurrencyModalOpen(!isCurrencyModalOpen);
  };
  const toggleCountryModal = () => {
    setIsCountryModalOpen(!isCountryModalOpen);
  };
  const toggleStateModal = () => {
    setIsStateModalOpen(!isStateModalOpen);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  interface Currency {
    name: string;
    code: string;
    symbol: string;
    flag: string;
  }
  interface Country {
    id: number;
    name: string;
  }
  interface State {
    id: number;
    name: string;
  }

  const handleCurrencySelect = useCallback((currency: Currency) => {
    setFormData((prev) => ({
      ...prev,
      currency: currency.code, // or currency.name based on your requirement
    }));
    setSelectedCurrency(currency);
    setTouched((prev) => ({ ...prev, currency: false }));
    setIsCurrencyModalOpen(false);
    // onCurrencySelect?.(currency); // Check if function exists before calling
  }, []);
  const handleCountrySelect = useCallback((country: Country) => {
    setFormData((prev) => ({
      ...prev,
      country: country.name, // or country.id based on your requirement
    }));
    setSelectedCountry(country);
    setTouched((prev) => ({ ...prev, country: false }));
    setIsCountryModalOpen(false);
    // onCountrySelect?.(country); // Check if function exists before calling
  }, []);
  const handleStateSelect = useCallback((state: State) => {
    setFormData((prev) => ({
      ...prev,
      state: state.name, // or state.id based on your requirement
    }));
    setSelectedState(state);
    setTouched((prev) => ({ ...prev, state: false }));
    setIsStateModalOpen(false);
    // onCurrencySelect?.(currency); // Check if function exists before calling
  }, []);

  const [selectedCurrency, setSelectedCurrency] = useState<{
    name: string;
    code: string;
    symbol: string;
    flag: string;
  } | null>(null);
  const [selectedState, setSelectedState] = useState<{
    name: string;
    id: number;
  } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    id: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    orgName: "",
    businessType: "",
    currency: "",
    country: "",
    state: "",
    address: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    orgName: false,
    businessType: false,
    currency: false,
    country: false,
    state: false,
    address: false,
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

    setTouched({
      orgName: true,
      businessType: true,
      currency: true,
      country: true,
      state: true,
      address: true,
    });

    const requiredFields = [
      "currency",
      "country",
      "state",
      "orgName",
      "businessType",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData].trim()
    );

    if (emptyFields.length > 0) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const orgData = {
      name: formData.orgName,
      currency_code: formData.currency,
      business_type: formData.businessType,
      locations: [
        {
          country: formData.country,
          state: formData.state,
          full_address: `${formData.state} ${formData.country}`,
        },
      ],
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const data = await createOrg(orgData);
            const organization = await getOrganization();
            await setOrganizationId(organization?.[0].id || "");
            await setOrganizationName(organization?.[0].name || "");

            if (!data || data.error) {
              throw new Error(data?.message || "Unable to create organization.");
            }

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

  const formVariants = {
    hidden: { opacity: 1, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, delay: 0.3 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    // hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close only the modal that is open and not clicked
      if (
        isCurrencyModalOpen &&
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        setIsCurrencyModalOpen(false);
      }
      if (
        isCountryModalOpen &&
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setIsCountryModalOpen(false);
      }
      if (
        isStateModalOpen &&
        stateRef.current &&
        !stateRef.current.contains(event.target as Node)
      ) {
        setIsStateModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCurrencyModalOpen, isCountryModalOpen, isStateModalOpen]);

  return (
    <div className="flex flex-col h-dvh w-full bg-white md:bg-[url(/auth/bg-pattern.svg)] bg-contain bg-no-repeat bg-right px-4 sm:px-8 md:px-16">
      <main className="size-full flex justify-center  md:items-center mt-16">
        {/* right */}
        <motion.div
          className="max-w-[760px] w-full md:p-[24px] "
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <motion.div
            className="w-full p-[10px] flex flex-col items-center gap-10 "
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.8 }}
          >
            {" "}
            <Image src={logo} alt="logo" width={160} height={10} />
            <motion.div
              className=" justify-between text-center flex gap-4 mb-6"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-4">
                <h2 className=" md:text-2xl text-[20px] font-semibold">
                  {" "}
                  Give Your Shop a Name
                </h2>
                <p className="md:text-lg text-sm font-normal text-[#717171]">
                  This helps us keep your records intact for when you are ready
                  to sign up.
                </p>
              </div>
              <Link
                href="/"
                className="border border-[#171717] rounded-[9px] p-[9px] flex items-center justify-center w-[34px] h-[34px]"
              >
                <Image
                  src={closeIcon}
                  alt="Close"
                  width={16}
                  height={16}
                  className="  "
                />
              </Link>
            </motion.div>
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[10px] w-full"
              variants={containerVariants}
            >
              <div className="flex flex-col gap-4">
                {/* Organization Name Field */}
                <motion.div
                  className="flex flex-col gap-1"
                  variants={itemVariants}
                >
                  <label
                    htmlFor="orgName"
                    className="block text-sm font-medium text-[#717171]"
                  >
                    Name <span className="text-[#FF1925]">*</span>
                  </label>
                  <motion.input
                    type="text"
                    id="orgName"
                    className={`w-full p-4 border rounded-[9px] outline-none text-[#b8b8b8] md:text-xl text-base
                      ${
                        touched.orgName && !formData.orgName
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      ${
                        formData.orgName
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                    placeholder="Input Name"
                    value={formData.orgName}
                    onChange={handleChange}
                    onBlur={() => handleBlur("orgName")}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  {touched.orgName && !formData.orgName && (
                    <motion.p
                      className="text-red-500 text-xs"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Organization name is required.
                    </motion.p>
                  )}
                </motion.div>

                {/* Business Type Field */}
                <motion.div
                  className="flex flex-col gap-1"
                  variants={itemVariants}
                >
                  <label
                    htmlFor="businessType"
                    className="block text-sm font-medium text-[#717171]"
                  >
                    Business Type <span className="text-[#FF1925]">*</span>
                  </label>
                  <motion.input
                    type="text"
                    id="businessType"
                    className={`w-full p-4 border rounded-[9px] outline-none text-[#b8b8b8] md:text-xl text-base
                      ${
                        touched.businessType && !formData.businessType
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      ${
                        formData.businessType
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                    placeholder="E.g. Omega Furniture Shop"
                    value={formData.businessType}
                    onChange={handleChange}
                    onBlur={() => handleBlur("businessType")}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  {touched.businessType && !formData.businessType && (
                    <motion.p
                      className="text-red-500 text-xs"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Business Type is required.
                    </motion.p>
                  )}
                </motion.div>

                <div className="flex w-full gap-10">
                  {/* Currency Field */}
                  <motion.div className="flex flex-col gap-1 relative w-full">
                    <label
                      htmlFor="currency"
                      className="block text-sm font-medium text-[#717171]"
                    >
                      Currency Code <span className="text-[#FF1925]">*</span>
                    </label>

                    <motion.div
                      className={`flex items-center w-full p-4 border rounded-[9px] text-xl cursor-pointer
          ${
            touched.currency && !formData.currency
              ? "border-red-500"
              : "border-gray-300"
          }
                      ${
                        formData.currency
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                      onClick={toggleCurrencyModal}
                    >
                      <span className="w-full text-[#b8b8b8] md:text-xl text-base">
                        {selectedCurrency
                          ? `${selectedCurrency.name} (${selectedCurrency.symbol})`
                          : "Select Currency Code"}
                      </span>

                      {selectedCurrency && (
                        <Image
                          src={selectedCurrency.flag}
                          alt={`${selectedCurrency.name} Flag`}
                          className="w-5 h-5 md:w-6 md:h-6"
                          width={20}
                          height={20}
                        />
                      )}

                      <FaChevronDown className="w-[10px] h-[10px] text-[#b8b8b8] ml-2" />
                    </motion.div>

                    {touched.currency && !selectedCurrency && (
                      <motion.p
                        className="text-red-500 text-xs"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Please select your currency
                      </motion.p>
                    )}

                    {isCurrencyModalOpen && (
                      <div
                        ref={currencyRef}
                        className="absolute top-full left-0 w-[298px] bg-white rounded-lg backdrop-blur-sm border shadow-lg z-10"
                      >
                        <div className="p-4">
                          <input
                            type="text"
                            className="w-full rounded-[10px] p-2 outline-none placeholder:text-[#B8B8B8] text-[16px] border"
                            placeholder="Search Currency"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>

                        <div className="h-[200px] overflow-y-auto px-[20px] py-3">
                          {filteredCurrencies.map((currency) => (
                            <div
                              key={currency.code}
                              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleCurrencySelect(currency)}
                            >
                              <Image
                                src={currency.flag}
                                alt={`${currency.name} Flag`}
                                className="w-8 h-8 rounded-full object-cover mr-3"
                                width={32}
                                height={32}
                              />
                              <p className="text-[14px]">
                                {currency.name} ({currency.code}){" "}
                                <span>{currency.symbol}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Country Field */}
                  <motion.div className="flex flex-col gap-1 relative w-full">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-[#717171]"
                    >
                      Select Country <span className="text-[#FF1925]">*</span>
                    </label>

                    <motion.div
                      className={`flex items-center w-full p-4 border rounded-[9px] text-xl cursor-pointer
          ${
            touched.country && !formData.country
              ? "border-red-500"
              : "border-gray-300"
          }
                      ${
                        formData.country
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                      onClick={toggleCountryModal}
                    >
                      <span className="w-full text-[#b8b8b8] md:text-xl text-base">
                        {selectedCountry
                          ? `${selectedCountry.name}`
                          : "Select Country Code"}
                      </span>

                      <FaChevronDown className="w-[10px] h-[10px] text-[#b8b8b8] ml-2" />
                    </motion.div>

                    {touched.country && !selectedCountry && (
                      <motion.p
                        className="text-red-500 text-xs"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Please select your country
                      </motion.p>
                    )}

                    {isCountryModalOpen && (
                      <div
                        ref={countryRef}
                        className="absolute top-full left-0 w-[298px] bg-white rounded-lg backdrop-blur-sm border shadow-lg z-10"
                      >
                        <div className="p-4">
                          <input
                            type="text"
                            className="w-full rounded-[10px] p-2 outline-none placeholder:text-[#B8B8B8] text-[16px] border"
                            placeholder="Search country"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>

                        <div className="h-[200px] overflow-y-auto px-[20px] py-3">
                          {filteredCountries.map((country) => (
                            <div
                              key={country.id}
                              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleCountrySelect(country)}
                            >
                              <p className="text-[14px]">{country.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* State Field */}
                <motion.div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-[#717171]"
                  >
                    State / Region <span className="text-[#FF1925]">*</span>
                  </label>

                  <motion.div
                    className={`flex items-center w-full p-4 border rounded-[9px] text-xl cursor-pointer
          ${
            touched.state && !formData.state
              ? "border-red-500"
              : "border-gray-300"
          }
                      ${
                        formData.state
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                    onClick={toggleStateModal}
                  >
                    <span className="w-full text-[#b8b8b8] md:text-xl text-base">
                      {selectedState ? `${selectedState.name}` : "Select State"}
                    </span>

                    <FaChevronDown className="w-[10px] h-[10px] text-[#b8b8b8] ml-2" />
                  </motion.div>

                  {touched.state && !selectedState && (
                    <motion.p
                      className="text-red-500 text-xs"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Please select your State
                    </motion.p>
                  )}

                  {isStateModalOpen && (
                    <div
                      ref={stateRef}
                      className="absolute top-full left-0 w-[298px] bg-white rounded-lg h-auto backdrop-blur-sm border shadow-lg z-10"
                    >
                      <div className="p-4">
                        <input
                          type="text"
                          className="w-full rounded-[10px] p-2 outline-none placeholder:text-[#B8B8B8] text-[16px] border"
                          placeholder="Search State"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      <div className="h-full  px-[20px] py-3">
                        {filteredStates.map((state) => (
                          <div
                            key={state.id}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleStateSelect(state)}
                          >
                            <p className="text-[14px]">{state.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Address Field */}
                <motion.div
                  className="flex flex-col gap-1"
                  variants={itemVariants}
                >
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-[#717171]"
                  >
                    Full Address <span className="text-[#FF1925]">*</span>
                  </label>
                  <motion.input
                    type="text"
                    id="address"
                    className={`w-full p-4 border rounded-[9px] outline-none text-[#b8b8b8] md:text-xl text-base
                      ${
                        touched.address && !formData.address
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      ${
                        formData.address
                          ? "border focus:border-[#009A49] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB]"
                          : ""
                      }`}
                    placeholder="write your full address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={() => handleBlur("address")}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  {touched.address && !formData.address && (
                    <motion.p
                      className="text-red-500 text-xs"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Full address is required.
                    </motion.p>
                  )}
                </motion.div>
              </div>

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
                className={`w-full mx-auto ${
                  loading ||
                  !formData.orgName ||
                  !formData.businessType ||
                  !formData.currency ||
                  !formData.country ||
                  !formData.state ||
                  !formData.address
                    ? "bg-[#d0d0d0]"
                    : "bg-[#1b1b1b] hover:bg-[#1b1b1b] active:bg-[#1b1b1b]"
                } text-white py-3 px-6 mt-2 rounded-[12px] font-medium transition duration-200 flex justify-center items-center gap-2 text-sm cursor-pointer`}
                disabled={
                  loading ||
                  !formData.orgName ||
                  !formData.businessType ||
                  !formData.currency ||
                  !formData.country ||
                  !formData.state ||
                  !formData.address
                }
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
                  "Register"
                )}
              </motion.button>
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
};

export default CreateOrganization;
