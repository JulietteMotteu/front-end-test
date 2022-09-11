import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
  },
  reducers: {
    setProductsData: (state, { payload }) => {
      state.products = payload;
    },
  },
});

export const { setProductsData } = productsSlice.actions;
export default productsSlice.reducer;
