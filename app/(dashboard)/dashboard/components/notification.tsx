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

        {/* left side */}
        <div className="flex flex-row gap-4 mt-6">
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-row gap-2 border-b-2 border-[#e9eaeb] pt-4">
              <p>Currenccy Selection</p>
              <span className="flex flex-col flex-2 p-2 text-[#181d27] font-circular-medium leading-5 text-base">
                <select className="w-full h-[48px] border border-[#e9eaeb] rounded-lg px-4 py-2 text-base font-circular-light leading-6 text-[#535862]">
                  <option value="USD" selected>NGN</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="AUD">AUD</option>
                  <option value="CAD">CAD</option>
 <option value="CHF">CHF</option>
                  <option value="CNY">CNY</option>
                </select>
                <p className="text-[#535862] font-circular-light leading-5 text-base">Changing the store currency will update how prices are displayed but will not automatically convert existing product prices. Ensure you update your pricing accordingly.</p>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#181d27] font-circular-medium leading-5 text-base">
                <p>Payment Options</p>
                <div className="flex flex-colflex-end gap-4 mt-2">
                  <input type="checkbox" id="checkbox1" className="w-4 h-4 border border-[#e9eaeb] rounded-lg cursor-pointer" />
                  <label htmlFor="checkbox1" className="text-[#535862] font-circular-light leading-5 text-base">Bank Transfer</label>

                  <input type="checkbox" id="checkbox1" className="w-4 h-4 border border-[#e9eaeb] rounded-lg cursor-pointer" />
                  <label htmlFor="checkbox1" className="text-[#535862] font-circular-light leading-5 text-base">PayPal</label>

                  <input type="checkbox" id="checkbox1" className="w-4 h-4 border border-[#e9eaeb] rounded-lg cursor-pointer" />
                  <label htmlFor="checkbox1" className="text-[#535862] font-circular-light leading-5 text-base">Stripe</label>

                </div>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#181d27] font-circular-medium leading-5 text-base">
                <p>Account Details</p>
                <input type="text" />
              </span>
            </div>
          </div>

          {/* right side */}
          <div className="flex flex-col gap-4 mt-6 w-full">
          </div>
        </div>

      </div>
    </>
  );
}

export default Notification;
