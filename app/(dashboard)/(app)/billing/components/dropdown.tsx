import React from 'react'
import { Features } from "@/components/shared/features";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/functional/logo";
import settings from "@/public/icons/_ui-settings-01.svg";
import viewDeleted from "@/public/icons/_ui-trash-03.svg";
import { ChevronDown, Loader2, Plus, Search, X } from "lucide-react";
import logout from "@/public/icons/_ui-log-out-02.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/store/useStore";

const Dropdown = () => {
  const { organizationId, organizationName, organizationInitial } = useStore();
  return (
    <>
      <DropdownMenu modal>
        <DropdownMenuTrigger className="btn-primary hover:cursor-pointer hidden min-[850px]:flex items-center gap-2 text-white">
          <span className="py-2 px-4 rounded-lg bg-white text-black">
            {organizationInitial}
          </span>
          {organizationName}
          <ChevronDown strokeWidth={1.5} color="white" />
        </DropdownMenuTrigger>            
      </DropdownMenu>
    </>
  )
}

export default Dropdown