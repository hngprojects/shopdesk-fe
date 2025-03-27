// import type { Stock } from '@/types/stocks';
// import { createSlice } from '@reduxjs/toolkit';

// interface InitialState {
//   isLoading: boolean;
//   data: Stock | null;
//   error: string | null;
// }
// const initialState: InitialState = {
//   isLoading: false,
//   data: null,
//   error: null,
// };

// const StocksSlice = createSlice({
//   name: 'stocks',
//   initialState,
//   reducers: {
//     startStocksLoading: (state) => {
//       state.isLoading = true;
//       state.error = null;
//     },
//   },
// });

// export const { startStocksLoading } = StocksSlice.actions;

// export default StocksSlice.reducer;

import type { StockItem } from "@/types/stocks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: boolean;
  data: StockItem | null;
  error: string | null;
}

const initialState: InitialState = {
  isLoading: false,
  data: null,
  error: null,
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    startStocksLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setStocksResponse: (state, action: PayloadAction<StockItem>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    setStocksError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { startStocksLoading, setStocksResponse, setStocksError } =
  stocksSlice.actions;
export default stocksSlice.reducer;
