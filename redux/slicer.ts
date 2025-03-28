import { StockItem, StockItemResponse } from '@/types/stocks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalesState {
  activeItem: number | null;
  searchText: string;
  selectedItems: StockItemResponse[];
  currentTime: string;
}

const initialState: SalesState = {
  activeItem: null,
  searchText: '',
  selectedItems: [],
  currentTime: new Date().toLocaleTimeString(),
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<number | null>) => {
      state.activeItem = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<StockItemResponse[]>) => {
      state.selectedItems = action.payload;
    },
    updateCurrentTime: (state) => {
      state.currentTime = new Date().toLocaleTimeString();
    },
  },
});

export const {
  setActiveItem,
  setSearchText,
  setSelectedItems,
  updateCurrentTime,
} = salesSlice.actions;
export default salesSlice.reducer;
export const selectActiveItem = (state: { sales: SalesState }) =>
  state.sales.activeItem;
export const selectSearchText = (state: { sales: SalesState }) =>
  state.sales.searchText;
