import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaxSettings {
  enabled: boolean;
  percentage: string;
  type: string;
}

interface InventorySettings {
  lowStockAlerts: boolean;
  lowStockThreshold: string;
  autoRestock: boolean;
  restockFrequency: string;
}

interface PreferencesState {
  currency: string;
  paymentMethods: {
    bankTransfer: boolean;
    paypal: boolean;
    stripe: boolean;
  };
  accountDetails: string;
  taxSettings: TaxSettings;
  inventorySettings: InventorySettings;
}

const initialState: PreferencesState = {
  currency: 'NGN',
  paymentMethods: {
    bankTransfer: true, // Default to one selected option
    paypal: false,
    stripe: false,
  },
  accountDetails: '',
  taxSettings: {
    enabled: false,
    percentage: '',
    type: 'VAT',
  },
  inventorySettings: {
    lowStockAlerts: false,
    lowStockThreshold: '10',
    autoRestock: false,
    restockFrequency: 'daily',
  },
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    updateCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<{
      bankTransfer: boolean;
      paypal: boolean;
      stripe: boolean;
    }>) => {
      state.paymentMethods = action.payload;
    },
    updateAccountDetails: (state, action: PayloadAction<string>) => {
      state.accountDetails = action.payload;
    },
    updateTaxSettings: (state, action: PayloadAction<{
      field: keyof TaxSettings;
      value: boolean | string;
    }>) => {
      const { field, value } = action.payload;
      state.taxSettings[field] = value as never;
    },
    updateInventorySettings: (state, action: PayloadAction<{
      field: keyof InventorySettings;
      value: boolean | string;
    }>) => {
      const { field, value } = action.payload;
      state.inventorySettings[field] = value as never;
    },
    resetPreferences: () => initialState,
  },
});

export const { 
  updateCurrency,
  setPaymentMethod,
  updateAccountDetails,
  updateTaxSettings,
  updateInventorySettings,
  resetPreferences
} = preferencesSlice.actions;

export default preferencesSlice.reducer;