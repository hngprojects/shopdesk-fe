import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";

const EmptyStock = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center max-w-sm mx-auto min-h-96 p-10">
      <Image
        src={"/dashboard/empty-stock.svg"}
        width={40}
        height={40}
        alt="Empty Stock Image"
      />
      <p>You have 0 items in stock</p>
      <Button
        size={"lg"}
        variant={"outline"}
        className="text-black shadow"
        onClick={onClick}
      >
        <Plus className="size-4" />
        Add New Stock
      </Button>
    </div>
  );
};

export default EmptyStock;
