import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  toggleSalesModal?: () => void;
};

export default function EmptySalePage({ toggleSalesModal }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-8">
      {/* Placeholder for the yellow notepad image */}
      <Image
        src="/sales-images/emptySalesIcon.svg"
        width={64}
        height={64}
        alt="No sales present"
        className="w-16 h-16 mb-4 transform rotate-12"
      />

      <h2 className="text-gray-500 text-lg mb-4">
        You have not made any sales
      </h2>

      <Button
        variant="outline"
        size="lg"
        className="text-black"
        onClick={toggleSalesModal}
      >
        <span className="mr-2">+</span>
        Record a Sale
      </Button>
    </div>
  );
}
