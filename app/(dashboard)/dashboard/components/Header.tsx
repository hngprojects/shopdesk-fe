"use client";
import Logo from "@/components/functional/logo";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ArrowLeftRight, ChevronDown, Plus } from "lucide-react";
import LogoutConfirmModal from "@/components/modal/logoutConfirmationModal";
import { useRouter } from "next/navigation";
import { getOrganization } from "@/services/getOrganization";
import logout from "@/public/icons/_ui-log-out-02.svg";
import settings from "@/public/icons/_ui-settings-01.svg";
import LoadingAnimation from "@/components/functional/loading";

function Header({ onSettingsClick }: { onSettingsClick?: () => void }) {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [organizations, setOrganizations] = useState<{id: string, name: string}[]>([]);
  const [showOrgList, setShowOrgList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { organizationName, organizationInitial, setOrganizationId, setOrganizationName } = useStore();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgs = await getOrganization();
        setOrganizations(orgs || []);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      }
    };
    fetchOrganizations();
  }, []);
console.log(organizationInitial);
  

  const handleSelection = async (org: { id: string; name: string }) => {
    setIsLoading(true);
    await setOrganizationId(org.id);
    await setOrganizationName(org.name);
    setShowOrgList(false);
    setTimeout(() => {
      window.location.reload();
    })
  };

  const handleAddNewOrganization = () => {
    setShowOrgList(false);
    router.push("/create-organization");
  };

  const toggleOrgList = (e: Event) => {
    e.preventDefault();
    setShowOrgList(!showOrgList);
  };

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
        
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-[#2A2A2A] rounded-[12px] py-3 px-2 hover:cursor-pointer hidden lg:flex items-center gap-2 text-white">
            <span className="py-3 px-4 rounded-[7px] bg-white text-black">
              {organizationInitial}
            </span>
            <span className="text-white text-base">{organizationName}</span>
            <ChevronDown strokeWidth={1.5} color="white" />
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-64" onInteractOutside={() => setShowOrgList(false)}>
            <DropdownMenuItem 
              className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              onSelect={toggleOrgList}
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span>Switch Organization</span>
              <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${showOrgList ? 'rotate-180' : ''}`} />
            </DropdownMenuItem>
           
            {showOrgList && (
              <>
                <DropdownMenuSeparator />
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                 
                     {isLoading?<div><LoadingAnimation/></div>:
                     <>
                      {organizations.map((org) => (
                      <DropdownMenuItem
                      key={org.id}
                      onSelect={async (e) => {
                        e.preventDefault();
                        await handleSelection(org);
                      }}
                      className="p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    >
                      <div className="flex items-center w-full">
                        <span className="py-1 px-2 mr-2 rounded bg-gray-200 text-xs">
                          {org.name.substring(0, 2).toUpperCase()}
                        </span>
                        <span className="flex-1">{org.name}</span>
                        {organizationName === org.name && (
                          <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>
                        )}
                      </div>
                    </DropdownMenuItem>
                     
                    
                  ))}
                  </>
                  }
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handleAddNewOrganization();
                  }}
                  className="p-3 text-primary hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add new organization
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            
            <DropdownMenuItem
              className="p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              onSelect={(e) => {
                e.preventDefault();
                if (onSettingsClick) onSettingsClick();
              }}
            >
              <div className="flex items-center gap-2">
                <Image src={settings} alt="" width={20} height={20} />
                Settings
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="p-3 text-[#ff1925] hover:bg-red-50 cursor-pointer transition-colors duration-200"
              onSelect={(e) => {
                e.preventDefault();
                setIsLogoutModalOpen(true);
              }}
            >
              <div className="flex items-center gap-2">
                <Image src={logout} alt="" width={20} height={20} />
                Log out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;