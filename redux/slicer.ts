import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalesState {
  activeItem: number | null;
  searchText: string;
  selectedItems: { id: number; quantity: number }[];
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
    setSelectedItems: (state, action: PayloadAction<{ id: number; quantity: number }[]>) => {
      state.selectedItems = action.payload;
    },
    updateCurrentTime: (state) => {
      state.currentTime = new Date().toLocaleTimeString();
    },
  },
});

export const { setActiveItem, setSearchText, setSelectedItems, updateCurrentTime } = salesSlice.actions;
export default salesSlice.reducer;
