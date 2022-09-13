import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "productsStore",
  initialState: {
    products: null,
    displayedProducts: null,
  },
  reducers: {
    setProductsData: (state, { payload }) => {
      state.products = payload;
    },
    setDisplayedProducts: (state, { payload }) => {
      state.displayedProducts = payload.products.slice(
        payload.value * 5 - 5,
        payload.value * 5
      );
    },
  },
});

export const { setProductsData, setDisplayedProducts } = productsSlice.actions;
export default productsSlice.reducer;
