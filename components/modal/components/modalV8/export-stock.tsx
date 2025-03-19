'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface ExportSalesModal {
  isOpen: boolean
  onClose: () => void
}

export default function ExportSalesModal({
  isOpen,
  onClose,
}: ExportSalesModal) {
  const [email, setEmail] = useState('')
  const [fileType, setFileType] = useState<string>('No file')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!email.trim()) newErrors.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid = () => {
    return email && fileType !== 'No file'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center md:justify-center md:p-4 ">
      <div className="bg-white rounded-lg shadow-lg w-full border border-[#A0A0A0] max-w-[651px] flex flex-col gap-3 h-[80vh] md:h-auto md:max-h-[auto] overflow-y-auto">
        <div className="p-6 relative">
          <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-2">
            <div className="flex flex-row md:flex-col items-center gap-2">
              <div className="bg-[#CCEBDB] p-[8px] rounded-[8px] flex items-center justify-center w-[48px] h-[48px] md:w-[56px] md:h-[56px]">
                <Image
                  src="/modal-images/export.svg"
                  alt="Export Stock Data"
                  className="sm:w-[24px] sm:h-[24px]"
                  width={30}
                  height={30}
                />
              </div>

              <div className="ml-2 md:ml-0">
                <h1 className="font-circular-medium text-[20px] md:text-[24px] text-[#1B1B1B] text-left md:text-center">
                  Export Stock Data
                </h1>
                <p className="text-[14px] text-left text-[#717171] font-circular-normal md:text-[18px] md:text-center">
                  Fill in your email details to download your Stock Data.
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0] md:absolute md:top-10 md:right-6"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="md:hidden sm:inline w-full h-[2px] bg-[#E9EEF3]"></div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:gap-[20px] gap-[16px] px-6 w-full flex-grow mt-3 md:mt-0"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="md:hidden text-left font-circular-normal font-medium text-[#717171] text-[16px]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border ${
                errors.email ? 'border-[#FF1925]' : 'border-[#DEDEDE]'
              } focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] md:text-[18px] font-circular-normal bg-white`}
              placeholder="Mark.M@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className="text-[#FF1925] text-sm font-circular-normal">
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <DropdownMenu modal>
              <label
                htmlFor="file-type"
                className="md:hidden text-left font-circular-normal font-medium text-[#717171] text-[16px]"
              >
                File format
              </label>
              <DropdownMenuTrigger className="w-full flex items-center justify-between h-[48px] md:h-[62px] rounded-[9px] p-[12px] border border-[#DEDEDE] hover:ring-2 hover:ring-[#CCEBDB] focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] transition-all text-[#B8B8B8] text-[16px] font-circular-normal bg-white">
                <span
                  className={`py-2 rounded-lg bg-white text-[16px] md:text-[18px] ${
                    fileType !== 'No file' ? 'text-black' : 'text-[#B8B8B8]'
                  }`}
                >
                  {fileType === 'No file' ? 'Select file format' : fileType}
                </span>
                <ChevronDown className="h-6 w-6" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-white shadow-lg mt-1 dropdown-content-width-full w-full rounded-lg overflow-hidden"
              >
                <DropdownMenuItem
                  onClick={() => setFileType('JPG')}
                  className="hover:bg-[#E9EEF3] cursor-pointer border-b border-[#DEDEDE] py-3 px-4 rounded-none"
                >
                  JPG
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFileType('PNG')}
                  className="hover:bg-[#E9EEF3] cursor-pointer border-b border-[#DEDEDE] py-3 px-4 rounded-none"
                >
                  PNG
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFileType('PDF')}
                  className="hover:bg-[#e9eef3] cursor-pointer py-3 px-4 rounded-b-lg"
                >
                  PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-auto w-full pb-[16px] md:pt-[16px] md:pb-[40px]">
            <button
              type="submit"
              className={`w-full px-[24px] py-[12px] rounded-[12px] border flex items-center justify-center gap-2 ${
                isFormValid()
                  ? 'bg-black text-white border-black'
                  : 'bg-[#D0D0D0] text-[#F1F1F1] border-[#B8B8B8]'
              }`}
              disabled={!isFormValid() || isLoading}
            >
              <Image
                src="/icons/download.svg"
                alt=""
                width={17}
                height={17}
                className=" text-[#F1F1F1]"
              />
              <span className="font-circular-normal text-[14px] md:font-circular-medium md:text-[16px]">
                {isLoading ? 'Downloading...' : 'Download Stock Report'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
