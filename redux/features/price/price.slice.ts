import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  price: number | null;
  discountedPrice: number | null;
}

const initialState: InitialState = {
  price: null,
  discountedPrice: null,
};

const pricesSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setDiscountedPrice: (state, action: PayloadAction<number>) => {
      state.discountedPrice = action.payload;
    },
  },
});

export const { setPrice, setDiscountedPrice } = pricesSlice.actions;

export default pricesSlice.reducer;
