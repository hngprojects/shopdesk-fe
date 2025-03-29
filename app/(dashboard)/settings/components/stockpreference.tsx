'use client'
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  updateCurrency,
  setPaymentMethod,
  updateAccountDetails,
  updateTaxSettings,
  updateInventorySettings,
  resetPreferences
} from '@/redux/preferencesSlice';
import { useState } from 'react';

const StockPreference = () => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector(state => state.preferences);
  const [isSaving, setIsSaving] = useState(false);

  const CustomDropdown = ({
    options,
    value,
    onChange,
    selectWidth = '352px'
  }: {
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
    selectWidth?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedLabel = options.find(opt => opt.value === value)?.label || '';

    return (
      <div className="relative w-full sm:w-[352px]" style={{ maxWidth: selectWidth }}>
        <div
          className="w-full h-[62px] border border-[#e9eaeb] rounded-[12px] p-2 font-circular-light text-[#535862] text-base leading-5 font-[400] bg-white cursor-pointer flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedLabel}</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute right-0 w-[239px] bg-white border border-[#e9eaeb] rounded-[12px] mt-1 z-10 overflow-hidden">
            {options.map((option) => (
              <div
                key={option.value}
                className={`w-[239px] h-[52px] px-4 py-4 border-b border-[#e9eaeb] last:border-b-0 font-circular-light text-[#535862] text-base leading-5 font-[400] cursor-pointer hover:bg-[#E9EEF3] ${value === option.value ? 'bg-[#E9EEF3]' : ''
                  }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ToggleSwitch = ({
    checked,
    onChange
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#009A49] transition-colors" />
      <span className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:translate-x-5 transition-transform" />
    </label>
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log('Saving preferences:', preferences)
      await api.savePreferences(preferences);
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch(resetPreferences());
      alert('Preferences saved successfully');
    } catch (error) {
      console.error('Failed to save preferences:', error);
      alert('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      dispatch(resetPreferences());
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    const updatedMethods = {
      bankTransfer: method === 'bankTransfer',
      paypal: method === 'paypal',
      stripe: method === 'stripe'
    };
    dispatch(setPaymentMethod(updatedMethods));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1307px]">
      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 border-b border-[#e9eaeb] pb-6">
        <div className="flex flex-col gap-1 text-[#181d27]">
          <p className="text-xl font-circular-medium leading-7">Store Preference</p>
          <p className="text-[#535862] font-circular-light leading-5 text-base">
            Customize your store settings to optimize your business operations.
          </p>
        </div>
        <div className="flex flex-row gap-3 self-end md:self-auto">
          <Button
            variant="outline"
            className="px-6 py-3 text-base cursor-pointer"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            className="px-6 py-3 text-base cursor-pointer"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-[64px] w-full">
        <div className="left-side flex flex-col gap-8 w-full max-w-[590px]">
          <div className="flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full h-[249px] gap-16">
            <div className="flex flex-col justify-start w-[30%] min-w-[120px]">
              <p className="font-circular-medium text-[#414651] text-base leading-5 font-[450]">
                Currency Selection
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <CustomDropdown
                options={[
                  { value: 'NGN', label: 'NGN – Nigerian Naira (₦)' },
                  { value: 'USD', label: 'USD – US Dollar ($)' },
                  { value: 'ZAR', label: 'ZAR – South African Rand (R)' },
                ]}
                value={preferences.currency}
                onChange={(value) => dispatch(updateCurrency(value))}
                selectWidth="358px"
              />
              <p className="font-circular-light text-[#535862] text-xs leading-5 font-[300] max-w-[358px]">
                Changing the store currency will update how prices are displayed but
                will not automatically convert existing product prices. Ensure you
                update your pricing accordingly.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full max-w-[590px] h-[114px] justify-between">
            <div className="flex flex-col justify-start w-[30%] min-w-[120px]">
              <p className="font-circular-medium text-[#414651] text-base leading-5 font-[450]">
                Payment Options
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex flex-col gap-3 ml-16">
                {[
                  { id: 'checkbox1', value: 'bankTransfer', label: 'Bank Transfer' },
                  { id: 'checkbox2', value: 'paypal', label: 'PayPal' },
                  { id: 'checkbox3', value: 'stripe', label: 'Stripe' },
                ].map((option) => (
                  <div key={option.id} className="flex flex-row items-center gap-3">
                    <input
                      type="checkbox"
                      id={option.id}
                      name="paymentMethod"
                      checked={preferences.paymentMethods[option.value]}
                      onChange={() => handlePaymentMethodChange(option.value)}
                      className="w-4 h-4 border border-[#e9eaeb] rounded-full cursor-pointer accent-[#009A49]"
                    />
                    <label
                      htmlFor={option.id}
                      className="font-circular-light text-[#535862] text-base leading-5 font-[300]"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full max-w-[590px] h-[68px] justify-between pb-4">
            <div className="flex flex-col justify-start w-[30%] min-w-[120px]">
              <p className="font-circular-medium text-[#414651] text-base leading-5 font-[400]">
                Account Details
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <input
                type="text"
                value={preferences.accountDetails}
                onChange={(e) => dispatch(updateAccountDetails(e.target.value))}
                className="w-full max-w-[328px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 ml-16 font-circular-light text-[#535862] text-base leading-5 font-[400]"
              />
            </div>
          </div>
        </div>

        <div className="right-side flex flex-col gap-5 w-full max-w-[653px] mt-8 lg:mt-0">
          <div className="flex flex-col gap-5 w-full max-w-[653px] h-[249px]">
            <div className="flex flex-row items-center justify-between gap-5">
              <p className="font-circular-medium text-[#414651] text-base leading-5 font-[400]">
                Tax Settings
              </p>
              <ToggleSwitch
                checked={preferences.taxSettings.enabled}
                onChange={(checked) => dispatch(updateTaxSettings({
                  field: 'enabled',
                  value: checked
                }))}
              />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Tax Percentage (%)
                </p>
                <input
                  type="number"
                  value={preferences.taxSettings.percentage}
                  onChange={(e) => dispatch(updateTaxSettings({
                    field: 'percentage',
                    value: e.target.value
                  }))}
                  className="w-full sm:w-[352px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[400]"
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[300]">
                  Tax Type
                </p>
                <CustomDropdown
                  options={[
                    { value: 'VAT', label: 'VAT' },
                    { value: 'Sales Tax', label: 'Sales Tax' },
                  ]}
                  value={preferences.taxSettings.type}
                  onChange={(value) => dispatch(updateTaxSettings({
                    field: 'type',
                    value
                  }))}
                  selectWidth="352px"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full max-w-[651px] h-[393px]">
            <p className="font-circular-medium text-[#A0A0A0] not-last text-lg leading-6 font-[400] text-[16px]">
              Inventory Management
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center justify-between border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Low Stock Alerts
                </p>
                <ToggleSwitch
                  checked={preferences.inventorySettings.lowStockAlerts}
                  onChange={(checked) => dispatch(updateInventorySettings({
                    field: 'lowStockAlerts',
                    value: checked
                  }))}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Low Stock Threshold
                </p>
                <input
                  type="number"
                  value={preferences.inventorySettings.lowStockThreshold}
                  onChange={(e) => dispatch(updateInventorySettings({
                    field: 'lowStockThreshold',
                    value: e.target.value
                  }))}
                  className="w-full sm:w-[352px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[400]"
                  placeholder="10"
                />
              </div>
              <div className="flex flex-row items-center justify-between border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Auto-Restock
                </p>
                <ToggleSwitch
                  checked={preferences.inventorySettings.autoRestock}
                  onChange={(checked) => dispatch(updateInventorySettings({
                    field: 'autoRestock',
                    value: checked
                  }))}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Restock Frequency
                </p>
                <CustomDropdown
                  options={[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' },
                  ]}
                  value={preferences.inventorySettings.restockFrequency}
                  onChange={(value) => dispatch(updateInventorySettings({
                    field: 'restockFrequency',
                    value
                  }))}
                  selectWidth="352px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPreference;