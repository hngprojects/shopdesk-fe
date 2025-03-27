'use client';

import { StockHeader } from './components/stock-header';
import { CurrencySelection } from './components/currency-selection';
import { PaymentOptions } from './components/payment-options';
import { AccountDetails } from './components/account-details';
import { TaxSettings } from './components/tax-settings';
import { InventoryManagement } from './components/inventory-management';

export default function StockPreferencePage() {
  return (
    <div className='flex flex-col gap-6 w-full max-w-[1307px]'>
      <StockHeader />
      <div className='flex flex-col lg:flex-row gap-[64px] w-full'>
        <div className='left-side flex flex-col gap-8 w-full max-w-[590px]'>
          <CurrencySelection />
          <PaymentOptions />
          <AccountDetails />
        </div>
        <div className='right-side flex flex-col gap-5 w-full max-w-[653px] mt-8 lg:mt-0'>
          <TaxSettings />
          <InventoryManagement />
        </div>
      </div>
    </div>
  );
}
