import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "productsStore",
  initialState: {
    products: null,
    displayedProducts: null,
  },
  reducers: {
    // Reducer for setting the state of products store
    setProductsData: (state, { payload }) => {
      state.products = payload;
    },
    // Reducer for setting the products to be displayed on pagination change
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
