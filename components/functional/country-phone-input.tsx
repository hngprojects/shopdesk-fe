import { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

type Country = {
  name: string;
  code: string;
  dialCode: string;
  symbol: string;
  flag: string;
};

type CountryPhoneInputProps = {
  type: "tel" | "number" | "text";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errors?: string;
  className?: string;
};

// List of countries
export const countries: Country[] = [
  {
    name: "Nigeria",
    code: "NG",
    dialCode: "+234",
    symbol: "₦",
    flag: "/modal-images/nigeria-flag.svg",
  },
  {
    name: "Egypt",
    code: "EG",
    dialCode: "+20",
    symbol: "ج.م",
    flag: "/modal-images/egypt-flag.svg",
  },
  {
    name: "Ethiopia",
    code: "ET",
    dialCode: "+251",
    symbol: "Br",
    flag: "/modal-images/ethiopia-flag.svg",
  },
  {
    name: "Ghana",
    code: "GH",
    dialCode: "+233",
    symbol: "₵",
    flag: "/modal-images/ghana-flag.svg",
  },
  {
    name: "India",
    code: "IN",
    dialCode: "+91",
    symbol: "₹",
    flag: "/modal-images/india-flag.svg",
  },
  {
    name: "Kenya",
    code: "KE",
    dialCode: "+254",
    symbol: "KSh",
    flag: "/modal-images/kenya-flag.svg",
  },
];

const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  errors,
  className = "",
}) => {
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

  const toggleCountryModal = () => {
    setIsCountryModalOpen(!isCountryModalOpen);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryModalOpen(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1">
      <div
        className={`flex p-4 text-[#B8B8B8] border border-[#DEDEDE] rounded-[9px] relative text-base md:text-lg focus-within:border-green-500 focus-within:bg-white transition-colors ${className}`}
      >
        <div
          className="flex gap-[8px] items-center cursor-pointer"
          onClick={toggleCountryModal}
        >
          <Image
            src={selectedCountry.flag}
            alt={`${selectedCountry.name} Flag`}
            className=""
            width={20}
            height={18}
          />
          <span className="text-center text-[#B8B8B8]">
            {selectedCountry.dialCode}
          </span>
          <FiChevronDown className="size-5" />
        </div>
        <div className="h-6 border border-gray self-center mx-2" />

        <div className="flex-1">
          <input
            type={type}
            name="phone-number"
            className="w-full rounded-r-[9px] outline-none text-black placeholder:text-[#B8B8B8]"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>

        {isCountryModalOpen && (
          <div className="absolute top-full left-0 mt-2 w-[300px] bg-white rounded-lg backdrop-blur-sm border z-50">
            <div className="relative w-full p-4">
              <input
                type="text"
                name="search"
                className="w-full rounded-[10px] p-2 pl-[48px] outline-none placeholder:text-[#B8B8B8] text-[16px] border bg-white"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <FaSearch className="absolute left-[32px] top-1/2 transform -translate-y-1/2 text-[#B8B8B8] w-[20px] h-[20px]" />
            </div>

            <div className="h-[200px] overflow-y-auto px-4 bg-[#FFFFFF]">
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center p-2 hover:bg-gray-200 cursor-pointer border-b-1 px-2"
                  onClick={() => handleCountrySelect(country)}
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} Flag`}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="text-[14px] font-circular-normal text-black">
                      {country.name} ({country.dialCode})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Error message for Phone Number */}
      {errors && (
        <p className="text-[#FF1925] text-[14px] font-circular-normal text-left mt-1">
          {errors}
        </p>
      )}
    </div>
  );
};

export default CountryPhoneInput;
