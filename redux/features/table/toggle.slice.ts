import { createSlice } from "@reduxjs/toolkit";

interface TableState {
  isSalesExpanded: boolean;
  isProfitExpanded: boolean;
}

const initialState: TableState = {
  isSalesExpanded: false,
  isProfitExpanded: false,
};

const tableSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleSalesExpand: (state) => {
      state.isSalesExpanded = !state.isSalesExpanded;
    },
    toggleProfitExpand: (state) => {
      state.isProfitExpanded = !state.isProfitExpanded;
    },
  },
});

export const { toggleSalesExpand, toggleProfitExpand } = tableSlice.actions;
export default tableSlice.reducer;
