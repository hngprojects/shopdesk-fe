import { WeeklySalesData } from "@/types/sale";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SalesState {
  isLoading: boolean;
  data: WeeklySalesData | null;
  error: string | null;
}

const initialState: SalesState = {
  isLoading: false,
  data: null,
  error: null,
};

const weeklySalesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    startWeeklySalesLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setWeeklySalesData: (state, action: PayloadAction<WeeklySalesData>) => {
      console.log(action);
      state.isLoading = false;
      state.data = action.payload;
    },
    setWeeklySalesError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetWeeklySalesData: (state) => {
      state.isLoading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const {
  startWeeklySalesLoading,
  setWeeklySalesData,
  setWeeklySalesError,
  resetWeeklySalesData,
} = weeklySalesSlice.actions;

export default weeklySalesSlice.reducer;
