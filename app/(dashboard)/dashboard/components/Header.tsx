import Logo from "@/components/functional/logo";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import logout from "@/public/icons/_ui-log-out-02.svg";
import settings from "@/public/icons/_ui-settings-01.svg";
import viewDeleted from "@/public/icons/_ui-trash-03.svg";
import LogoutConfirmModal from "@/components/modal/logoutConfirmationModal";

interface HeaderProps {
  onSettingsClick?: () => void;
}

function Header({ onSettingsClick }: HeaderProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { organizationName, organizationInitial } = useStore();

  return (
    <div className="lg:border px-4 py-2 lg:shadow-md rounded-lg lg:flex items-center justify-between mx-auto mb-4">
      <LogoutConfirmModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
      <div className="flex items-center gap-6">
        <div className="flex justify-center lg:justify-start w-full lg:w-auto">
          <Logo />
        </div>
        <small className="text-black text-left hidden lg:block">
          The simplest way to manage your shop!
        </small>
      </div>

      <div className="flex items-center gap-4">
        <div className="border border-[#D0D0D0] rounded-[12px] hidden md:flex p-3">
          <Image
            src="/modal-images/notification.svg"
            alt=""
            width={20}
            height={20}
          />
        </div>
        <DropdownMenu modal>
          <DropdownMenuTrigger className="bg-[#2A2A2A] rounded-[12px] py-3 px-2 hover:cursor-pointer hidden lg:flex items-center gap-2 text-white">
            <span className="py-3 px-4 rounded-[7px] bg-white text-black">
              {organizationInitial}
            </span>

            <span className="text-white text-base">{organizationName}</span>
            <ChevronDown strokeWidth={1.5} color="white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className=" p-4  w-[200px] flex"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <Image src={viewDeleted} alt="" width={20} height={20} />
              View Deleted
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" p-4  w-[200px] "
              onClick={onSettingsClick}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={settings}
                  className=""
                  alt=""
                  width={20}
                  height={20}
                />
                Settings
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" p-4  w-[200px] text-[#ff1925] "
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <Image src={logout} alt="" width={20} height={20} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
