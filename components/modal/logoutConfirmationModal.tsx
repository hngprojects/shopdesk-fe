"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import LogoutButton from "@/app/(auth)/sign-in/_components/logout"

interface LogoutModalProps {
  onCancel?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerElement?: React.ReactNode
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  onCancel,
  open,
  onOpenChange,
  triggerElement,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(open || false)

  const handleOpenChange = (newOpen: boolean) => {
    setDialogOpen(newOpen)
    onOpenChange?.(newOpen)

    if (!newOpen && onCancel && !open) {
      onCancel()
    }
  }

  const handleCancel = () => {
    if (!open) {
      setDialogOpen(false)
    }
    onCancel?.()
  }

  React.useEffect(() => {
    if (open !== undefined) {
      setDialogOpen(open)
    }
  }, [open])

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {triggerElement && <DialogTrigger asChild>{triggerElement}</DialogTrigger>}
      <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden border border-gray-200">
        <div className="relative">
          {/* <button 
            onClick={handleCancel}
            className="absolute right-4 top-4 rounded-full h-8 w-8 flex items-center justify-center border border-gray-200"
          >
            <span className="sr-only">Close</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button> */}

          <div className="pt-8 pb-4 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <LogOut className="h-8 w-8 text-red-500" />
            </div>

            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-semibold">Logout</DialogTitle>
            </DialogHeader>

            <div className="text-center px-8 text-gray-600 mt-2">
              Are you sure you want to log out of your account? You will need to sign in again to access your data.
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <DialogFooter className="flex p-4 gap-4">
  <Button
    variant="outline"
    onClick={handleCancel}
    className="flex-1 py-6 rounded-md border-gray-200 hover:bg-gray-50 hover:text-gray-900"
  >
    Cancel
  </Button>
  <LogoutButton  />
</DialogFooter>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutModal
