"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import deleteRed from "@/public/icons/delete-red.svg";
import DeleteItemButton from "./components/DeleteItemButton";

interface DeleteItemProps {
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerElement?: React.ReactNode;
  onDelete: (itemId: string) => void;
  selectedItem?: { id: string };
}

const DeleteItem: React.FC<DeleteItemProps> = ({
  onCancel,
  open,
  onOpenChange,
  triggerElement,
  onDelete,
  selectedItem,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(open || false);

  const handleOpenChange = (newOpen: boolean) => {
    setDialogOpen(newOpen);
    onOpenChange?.(newOpen);

    if (!newOpen && onCancel && !open) {
      onCancel();
    }
  };

  const handleCancel = () => {
    if (!open) {
      setDialogOpen(false);
    }
    onCancel?.();
  };

  React.useEffect(() => {
    if (open !== undefined) {
      setDialogOpen(open);
    }
  }, [open]);

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {triggerElement && (
        <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      )}
      <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden border border-gray-200">
        <div className="relative">
          <div className="pt-8 pb-4 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <Image
                src={deleteRed}
                alt="delete icon"
                width={24}
                height={24}
                className="h-8 w-8"
              />
            </div>

            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-semibold">
                Delete Stock
              </DialogTitle>
            </DialogHeader>

            <div className="text-center px-8 text-gray-600 mt-2">
              Are you sure you want to delete this stock item? It will be hidden
              from the stock list but not permanently removed.
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

            <DeleteItemButton
              itemId={selectedItem?.id}
              externalFunction={onDelete}
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItem;
