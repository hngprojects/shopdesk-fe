import { Button } from "@/components/ui/button";

function Notification() {
  return (
    <>
      <div>
        <div className="flex flex-row w-full justify-between items-center gap-4  md:border-b border-[#e9eaeb] pb-6">
          <div className="w-full flex flex-col gap-1 text-[#181d27]">
            <p className="text-xl font-circular-medium leading-7">
              Notification Settings
            </p>
            <p className="text-[#535862]  font-circular-light leading-5 text-base">
              Choose how you receive alerts to manage your store efficiently.
            </p>
          </div>
          <div className="flex flex-row gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="px-6 py-3 text-base curpor-pointer"
            >
              Cancel
            </Button>
            <Button className=" px-6 py-3 text-base cursor-pointer">
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
